const { FileNotFoundException } = require("../utils/exceptions/handler");

const HasSingleFileMiddleware = (req, res, next) => {
  try {
    if (!req.file) {
      throw FileNotFoundException;
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = HasSingleFileMiddleware;
