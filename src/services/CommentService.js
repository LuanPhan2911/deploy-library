const { isValidObjectId, default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");

class CommentService {
  static async exist({ _id }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await Comment.findById(_id);
      return data;
    } catch (error) {}
  }
  static async validCommentableId({ _id, _type }) {
    try {
      if (!isValidObjectId(_id)) {
        return null;
      }
      let data = await mongoose.model(_type).findById(_id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteAll({ _id, _type }) {
    try {
      await Comment.deleteMany({
        commentable_id: _id,
        commentable_type: _type,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = CommentService;
