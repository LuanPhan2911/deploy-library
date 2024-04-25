const { isValidObjectId } = require("mongoose");
const Publisher = require("../models/Publisher");

class PublisherService {
  static async exist({ _id }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await Publisher.findById(_id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = PublisherService;
