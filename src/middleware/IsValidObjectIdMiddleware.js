const { isValidObjectId } = require("mongoose");
const { InvalidObjectIdException } = require("../utils/exceptions/handler");

const isValidObjectIdMiddleWare = (req, res, next) => {
  try {
    let _id = req.params._id;

    if (_id && !isValidObjectId(_id)) {
      throw InvalidObjectIdException;
    }
    _id = req.body._id;
    if (_id && !isValidObjectId(_id)) {
      throw InvalidObjectIdException;
    }
    _id = req.query._id;
    if (_id && !isValidObjectId(_id)) {
      throw InvalidObjectIdException;
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isValidObjectIdMiddleWare;
