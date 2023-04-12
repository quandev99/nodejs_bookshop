const Product = require("../models/Product");
const unidecode = require("unidecode");
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
    await Product.find({}).then((data) => {
      const nameCtr = req.query.search;
      const matchedBook = mutipleMongooseToObject(data).filter((item) => {
        return item.name.toLowerCase().startsWith(nameCtr.toLowerCase());
      });
      res.render("category-product", {
        products: matchedBook,
      });
    });
    /////
    // const tim = req.query.search; // Giá trị tìm kiếm từ client
    // const timChuoi = unidecode(tim.toLowerCase()); // Chuẩn hóa chuỗi về chữ thường
    // const bookSearch = await Product.find({
    //   name: { $regex: timChuoi, $options: "i" },
    // }).lean();
    // const categories = await Category.find({}).lean();
    // res.render("category-product", {
    //   products: bookSearch,
    // });
  }

  // search(req, res) {
  //   res.render("search");
  // }
}
module.exports = new SiteController();
