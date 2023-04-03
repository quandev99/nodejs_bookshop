const Category = require("../models/Category");
const Product = require("../models/Product");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class categoryProductController {
  async show(req, res, next) {
    try {
      const id = req.params.id;
      const categories = await Category.find();
      const products = await Product.find().limit(12);
      const lproducts = await Product.find({ categoryId: id });
      if (products) {
        res.render("category-product", {
          products: mutipleMongooseToObject(products),
          categories: mutipleMongooseToObject(categories),
        });
      } else {
        res.render("category-product", {
          lproducts: mutipleMongooseToObject(products),
          categories: mutipleMongooseToObject(categories),
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Hien thi bi lỗi rồi" });
    }
  }
  async listProduct(req, res, next) {
    const id = req.params.id;
    const categories = await Category.find().lean();
    const products = await Product.find({ categoryId: id }).lean();
    try {
      res.render("category-product", {
        lproducts: products,
        categories: categories,
      });
    } catch (err) {
      res.status(500).json({ message: "Hien thi bi lỗi rồi" + err });
    }
  }
}
module.exports = new categoryProductController();
