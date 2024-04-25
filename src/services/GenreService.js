const { isValidObjectId } = require("mongoose");
const Genre = require("../models/Genre");

class GenreService {
  static async exist({ _id }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await Genre.findById(_id);

      return data;
    } catch (error) {}
  }
}
module.exports = GenreService;
