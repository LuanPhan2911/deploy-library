const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");

const StoreManyGenreRequest = (req, res, next) => {
  try {
    const rules = {
      genres: "required|array",
      "genres.*.name": "required|string",
    };

    let validation = new Validator(req.body, rules);

    if (validation.passes()) {
      next();
    } else {
      next(FailValidateException(validation.errors.all()));
    }
  } catch (error) {
    next(error);
  }
};
module.exports = StoreManyGenreRequest;
