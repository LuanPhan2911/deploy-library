const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author_name: {
      type: String,
      required: true,
    },
    total_quantity: {
      type: Number,
      required: true,
    },
    remain_quantity: {
      type: Number,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    year_publish: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
bookSchema.plugin(mongoosePaginate);
module.exports = model("Book", bookSchema);
