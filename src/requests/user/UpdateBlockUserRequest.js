const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");

const UpdateBlockUserRequest = (req, res, next) => {
  try {
    const rules = {
      status: "required|string|in:lock,unlock",
    };

    let validation = new Validator(req.body, rules);

    if (validation.passes()) {
      let validKeys = Object.keys(rules);
      req.validated = filterObjectKeys(req.body, validKeys);
      next();
    } else {
      next(FailValidateException(validation.errors.all()));
    }
  } catch (error) {
    next(error);
  }
};
module.exports = UpdateBlockUserRequest;
