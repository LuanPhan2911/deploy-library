const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");
const { PublisherService, GenreService } = require("../../services");

const StoreBookRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "publisher_exist",
      async function (_id, attribute, req, passes) {
        return (await PublisherService.exist({ _id }))
          ? passes()
          : passes(false, "The publisher id field is not valid");
      }
    );
    Validator.registerAsync(
      "genre_exist",
      async function (_id, attribute, req, passes) {
        return (await GenreService.exist({ _id }))
          ? passes()
          : passes(false, "The genre field id is not valid");
      }
    );

    const rules = {
      name: "required|string",
      description: "required|string",
      author_name: "required|string",
      total_quantity: "required|integer",
      remain_quantity: "required|integer",
      publisher: {
        _id: "required|publisher_exist",
      },
      year_publish: "required|string",
      genres: "required|array",
      "genres.*": {
        _id: "required|genre_exist",
      },
    };

    let validation = new Validator(req.body, rules);

    validation.checkAsync(
      () => {
        let validKeys = Object.keys(rules);
        req.validated = filterObjectKeys(req.body, validKeys);
        next();
      },
      () => next(FailValidateException(validation.errors.all()))
    );
  } catch (error) {
    next(error);
  }
};
module.exports = StoreBookRequest;
