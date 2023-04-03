const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Product = new Schema(
  {
    name: { type: String, require: true },
    author: { type: String, require: true },
    year: { type: Number, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    slug: { type: String, require: true, slug: "name" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    review_count: { type: Number, require: true, default: 0 },
    average_score: { type: Number, require: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
module.exports = mongoose.model("Product", Product);
