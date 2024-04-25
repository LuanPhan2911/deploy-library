const { isValidObjectId } = require("mongoose");
const Book = require("../models/Book");

class BookService {
  static async exist({ _id }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await Book.findById(_id);

      return data;
    } catch (error) {}
  }
}
module.exports = BookService;
