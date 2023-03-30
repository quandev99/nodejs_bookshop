const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Product = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    slug: { type: String, require: true, slug: "name" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
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
