const Validator = require("validatorjs");
const { FailValidateException } = require("../../utils/exceptions/handler");
const { filterObjectKeys } = require("../../utils/helper");

const UpdateUserRequest = (req, res, next) => {
  try {
    const rules = {
      name: "required|string",
      birthday: `date|min:1900|max:${new Date().getFullYear()}`,
      gender: "required|integer|in:0,1,2",
      phone_number: "required|string",
      address: "required|string",
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
module.exports = UpdateUserRequest;
