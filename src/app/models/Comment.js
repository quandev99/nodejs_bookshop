const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    userName: { type: String, require: true },
    userImage: { type: String, require: true },
    review: { type: String, require: true },
    rating: { type: Number, require: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", Comment);
