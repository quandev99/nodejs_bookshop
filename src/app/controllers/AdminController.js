const Category = require("../models/Category.js");
const Product = require("../models/Product.js");
const Comment = require("../models/Comment.js");
const User = require("../models/Auth.js");
class AdminController {
  admin = async (req, res, next) => {
    // count product
    const countProduct = await Product.countDocuments({});
    const countCategory = await Category.countDocuments({});
    const countComment = await Comment.countDocuments({});
    const countUser = await User.countDocuments({});
    try {
      return res
        .status(200)
        .render("admin", {
          layout: "admin",
          countCategory,
          countComment,
          countUser,
          countProduct,
        });
    } catch (error) {
      console.log("Lỗi hiện thị trang Admin!" + error);
    }
  };
}
module.exports = new AdminController();
