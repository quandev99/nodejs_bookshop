const Product = require("../models/Product");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const Auth = require("../models/Auth");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class MeController {
  async listUser(req, res, next) {
    const listUsers = await Auth.find({}).lean();
    try {
      res.status(200).render("admin/me/list-users", {
        layout: "admin",
        users: listUsers,
        message: "Hiển thị được toàn bộ tài khoản người dùng",
      });
    } catch {
      res.status(500).json({ message: "Lỗi hiển thị danh sách Users" });
    }
  }

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

  // [GET] admin/me/stored/comments
  listComments = async (req, res, next) => {
    const getComments = await Comment.find({}).lean();
    res.status(200).render("admin/me/list-comments", {
      layout: "admin",
      comments: getComments,
    });
  };
}
module.exports = new MeController();
