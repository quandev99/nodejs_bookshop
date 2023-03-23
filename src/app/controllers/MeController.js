const Product = require("../models/Product");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class MeController {
  //Get /me/stored/products
  storedProducts(req, res, next) {
    let productQuery = Product.find({});
    if (req.query.hasOwnProperty("_sort")) {
      productQuery = productQuery.sort({
        // [req.query.column]: req.query.type,
        name: "asc",
      });
      return;
    }
    Promise.all([productQuery, Product.countDocumentsDeleted()])
      .then(([products, deletedProduct]) => {
        res.render("admin/me/stored-products", {
          deletedProduct: deletedProduct,
          products: mutipleMongooseToObject(products),
        });
      })
      .catch(next);
  }

  //Get /me/trash/products
  trashProducts(rep, res, next) {
    Product.findDeleted({})
      .then((products) => {
        res.render("admin/me/trash-products", {
          products: mutipleMongooseToObject(products),
        });
      })
      .catch(next);
  }
}
module.exports = new MeController();
