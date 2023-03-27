const Product = require("../models/Product");
const Category = require("../models/Category");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class SiteController {
  //Get /
  // index(req, res, next) {
  //   Product.find({})
  //     .then((products) => {
  //       res.render("index", {
  //         data: products,
  //         products: mutipleMongooseToObject(products),
  //       });
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // }
  async index(req, res, next) {
    try {
      const products = await Product.find({});
      const categories = await Category.find({});
      res.render("index", {
        products: mutipleMongooseToObject(products),
        categories: mutipleMongooseToObject(categories),
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Hien thi bi lỗi rồi" });
    }
  }

  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
