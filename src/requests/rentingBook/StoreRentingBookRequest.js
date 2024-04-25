const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");
const { BookService } = require("../../services");

const StoreRentingBookRequest = (req, res, next) => {
  try {
    Validator.registerAsync(
      "book_id_valid",
      async function (_id, attribute, key, passes) {
        let book = await BookService.exist({
          _id,
        });
        if (!book) {
          return passes(false, `No find book with _id ${_id}`);
        }

        passes();
      }
    );
    Validator.registerAsync(
      "quantity_valid",
      async function (quantity, attribute, key, passes) {
        let { _id } = req.body?.book;
        let book = await BookService.exist({
          _id,
        });
        if (!book) {
          return passes(false, `No find book with _id ${_id}`);
        }
        if (book.remain_quantity < Number(quantity)) {
          return passes(
            false,
            `The book remain ${book.remain_quantity} while renting ${quantity}`
          );
        }
        return passes();
      }
    );
    const rules = {
      user: {
        name: "required|string",
        address: "required|string",
        name: "required|string",
        phone_number: "required|string",
      },
      days_after_expire: "required|integer|min:1",
      renting_quantity: "required|integer|min:1|quantity_valid",
      book: {
        _id: "required|string|book_id_valid",
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
module.exports = StoreRentingBookRequest;
