const Product = require("../models/Product");
const Category = require("../models/Category");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class MeController {
  //Get /me/stored/products
  storedProducts(req, res, next) {
    let productQuery = Product.find({});
    // if (req.query.hasOwnProperty("_sort")) {
    //   productQuery = productQuery.sort({
    //     // [req.query.column]: req.query.type,
    //     name: "asc",
    //   });
    //   return;
    // }
    Promise.all([productQuery, Product.countDocumentsDeleted()])
      .then(([products, deletedProduct]) => {
        res.render("admin/me/stored-products", {
          layout: "admin",
          deletedProduct: deletedProduct,
          products: mutipleMongooseToObject(products),
        });
      })
      .catch(next);
  }

  //Get /me/trash/products
  trashProducts(req, res, next) {
    Product.findDeleted({})
      .then((products) => {
        res.render("admin/me/trash-products", {
          layout: "admin",
          products: mutipleMongooseToObject(products),
        });
      })
      .catch(next);
  }

  // Controller Categories
  categoriesCategories(req, res, next) {
    Category.find({}).then((categories) => {
      // res.json({ Category: category });
      res.render("admin/me/stored-categories", {
        layout: "admin",
        categories: mutipleMongooseToObject(categories),
      });
    });
  }
}
module.exports = new MeController();
