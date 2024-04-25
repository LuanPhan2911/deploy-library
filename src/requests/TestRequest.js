const Validator = require("validatorjs");

const TestRequest = (req, res, next) => {
  try {
    const rules = {};

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
module.exports = TestRequest;
