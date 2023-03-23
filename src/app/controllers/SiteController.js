const Product = require("../models/Product");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class SiteController {
  //Get /
  index(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render("index", {
          products: mutipleMongooseToObject(products),
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
