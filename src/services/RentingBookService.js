const RentingBook = require("../models/RentingBook");

class RentingBookService {
  static async create({ book, user, expire_at, quantity, status }) {
    let rentingBook = await RentingBook.create({
      book,
      user,
      expire_at,
      quantity,
      status,
    });
    return rentingBook;
  }
  static async delete({ _id }) {
    let rentingBook = await RentingBook.findById(_id);
    if (rentingBook.status !== "renting") {
      await rentingBook.deleteOne();
    }
    return rentingBook;
  }
}
module.exports = RentingBookService;
