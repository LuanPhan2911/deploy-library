const { RentingBook } = require("../../models");
const ApiError = require("../../utils/ApiError");

const DestroyBookRequest = async (req, res, next) => {
  try {
    let { _id } = req.params;
    let rentBook = await RentingBook.findOne({
      book: _id,
    });
    if (rentBook) {
      throw new ApiError(400, "This book has been rented");
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = DestroyBookRequest;
