const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const Category = new Schema(
  {
    nameCategory: { type: String, require: true },
    slug: { type: String, require: true, slug: "nameCategory" },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model("Category", Category);
