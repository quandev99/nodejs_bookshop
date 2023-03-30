const Category = require("../models/Category");
const slugify = require("slugify");
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");

class CategoriesController {
  create(req, res, next) {
    res.render("admin/categories/create");
  }
  store(req, res, next) {
    const id = req.params.id;
    const { nameCategory } = req.body;
    if (!nameCategory) {
      return res.status(404).json({
        data: nameCategory,
        message: "Vui long nhap ten danh muc",
      });
    }
    Category.findOne({ nameCategory: nameCategory })
      .then((data) => {
        if (data && data._id != id) {
          return res
            .status(401)
            .json({ success: false, message: "Tên danh mục đã được sử dụng" });
        }
        const category = new Category({ nameCategory });
        return category.save();
      })
      .then((data) => {
        return res.status(200).json({
          success: true,
          message: "Thêm danh mục thành công!",
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: err,
        });
      });
  }
  //[Delete] /categories/:id/delete
  delete(req, res, next) {
    Category.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  edit(req, res, next) {
    Category.findById(req.params.id)
      .then((categories) =>
        res.render("admin/categories/edit", {
          categories: mutipleToObject(categories),
        })
      )
      .catch((err) => console.error(err));
  }
  update(req, res, next) {
    const { id } = req.params;
    const { nameCategory } = req.body;
    if (!nameCategory) {
      return res.json({
        success: false,
        message: "Bạn không được bỏ trống danh mục!",
      });
    }
    Category.findById(id)
      .then((categories) => {
        if (!categories) {
          res.json("Danh mục không tồn tại!");
        }
        if (categories && categories._id != id) {
          res.status(400).json({
            success: false,
            message: "Tên danh mục đã được sử dụng",
          });
        }
        // Update the category object with the new data
        categories.nameCategory = nameCategory;
        // Update the slug field based on the new categoryName value
        categories.slug = slugify(nameCategory, { lower: true });
        return categories.save();
      })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Cập nhật danh mục thành công!",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err.message || "Thất bại!",
        });
      });
  }
}
// Add plugins
mongoose.plugin(slug);
module.exports = new CategoriesController();
