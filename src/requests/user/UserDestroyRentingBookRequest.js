const { RentingBook } = require("../../models");
const ApiError = require("../../utils/ApiError");
const {
  NoPermissionAccessException,
} = require("../../utils/exceptions/handler");

const UserDestroyRentingBookRequest = async (req, res, next) => {
  try {
    let { _id: renting_book_id } = req.params;
    let { _id: user_id } = req.user;
    let rentingBook = await RentingBook.findById(renting_book_id);

    if (rentingBook?.status !== "spending") {
      throw new ApiError(400, "Can not delete when status different spending");
    }

    if (!rentingBook.user.equals(user_id)) {
      throw NoPermissionAccessException;
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = UserDestroyRentingBookRequest;
