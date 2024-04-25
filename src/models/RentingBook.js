const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const rentingBook = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expire_at: {
      type: Date,
      required: true,
      min: Date.now(),
    },
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["spending", "renting", "completed", "expired"],
      default: "spending",
    },
  },
  {
    timestamps: true,
  }
);
rentingBook.plugin(mongoosePaginate);
module.exports = model("RentingBook", rentingBook);
