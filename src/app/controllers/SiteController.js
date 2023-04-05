const Product = require("../models/Product");
const Category = require("../models/Category");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class SiteController {
  async index(req, res, next) {
    try {
      const products = await Product.find().limit(8);
      // const categories = await Category.find();
      res.render("index", {
        products: mutipleMongooseToObject(products),
        // categories: mutipleMongooseToObject(categories),
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Hien thi bi lỗi rồi" });
    }
  }
  async searchProducts(req, res, next) {
    try {
      const productSearch = await Product.find().lean();
      return res.render("index", {
        data: productSearch,
      });
    } catch (err) {
      res.status(500).json({ message: "Hien thi bi lỗi rồi" });
    }
  }

  // search(req, res) {
  //   res.render("search");
  // }
}
module.exports = new SiteController();
