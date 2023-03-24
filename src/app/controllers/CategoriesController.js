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
    // const FormData = req.body;
    const { nameCategory } = req.body;
    if (!nameCategory) {
      return res.status(404).json({
        message: "Vui long nhap ten danh muc",
      });
    }

    // category
    //   .save()
    //   .then(() => res.redirect("/admin/me/stored/categories"))
    //   .catch((err) => console.log(err));
    Category.findOne({ nameCategory: nameCategory })
      .then((data) => {
        if (data && data._id != req.params.id) {
          return res
            .status(401)
            .json({ message: "Tên danh mục đã được sử dụng" });
        }
        const category = new Category({ nameCategory });
        return category.save();
      })
      .then((data) => {
        return res.status(200).json({
          data,
          message: "Them danh muc thanh cong!",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
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
    const { nameCategory } = req.body;
    Category.findOne({ nameCategory: nameCategory })
      .then((category) => {
        if (category && category._id != req.params.id) {
          return res
            .status(400)
            .json({ message: "Tên danh mục đã được sử dụng" });
        }
        Category.findByIdAndUpdate(
          { _id: req.params.id },
          { nameCategory: req.body.nameCategory },
          { new: true }
        )
          .then((updatedCategory) => {
            // Cập nhật thành công slug khi tên danh mục thay đổi
            updatedCategory.slug = slugify(updatedCategory.nameCategory, {
              lower: true,
            });
            return updatedCategory.save();
          })
          .then(() => {
            res.redirect("/admin/me/stored/categories");
          })
          .catch((err) => {
            return next(err);
          });
      })
      .catch((err) => {
        return next(err);
      });
  }

  // update(req, res, next) {
  //   const { nameCategory } = req.body;
  //   Category.findOne({ nameCategory: nameCategory })
  //     .then((Categories) => {
  //       if (Categories) {
  //         return res
  //           .status(400)
  //           .json({ message: "NameCategories đã được sử dụng" });
  //       }
  //       next();
  //     })
  //     .catch(function (err) {
  //       return next(err);
  //     });
  //   Category.findByIdAndUpdate(
  //     { _id: req.params.id },
  //     { nameCategory: req.body.nameCategory },
  //     { new: true }
  //   )
  //     .then((updateCategories) => {
  //       //Cập nhật thành công slug khi tên danh muc thay đổi
  //       updateCategories.slug = slugify(updateCategories.nameCategory, {
  //         lower: true,
  //       });
  //       updateCategories.save(); // Cập nhật thành công
  //       res.redirect("/admin/me/stored/categories");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
// Add plugins
mongoose.plugin(slug);
module.exports = new CategoriesController();
