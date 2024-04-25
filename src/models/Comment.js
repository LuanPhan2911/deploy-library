const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    commentable_id: {
      type: Schema.Types.ObjectId,
      refPath: "commentable_type",
      required: true,
    },
    commentable_type: {
      type: String,
      required: true,
      enum: ["Book"],
    },
    message: {
      type: String,
      required: true,
    },
    replies_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.plugin(mongoosePaginate);
module.exports = model("Comment", commentSchema);
