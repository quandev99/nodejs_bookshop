const Product = require("../models/Product");
const slugify = require("slugify");
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class ProductController {
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        res.render("detaill", {
          product: mutipleToObject(product),
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  //[Get] /products/create
  create(req, res, next) {
    res.render("admin/products/create");
  }
  //[Post] /product/store
  store(req, res, next) {
    // res.json(req.body);
    const FormData = req.body;
    const product = new Product(FormData);
    product
      .save()
      .then(() => res.redirect("/admin/me/stored/products"))
      .catch((err) => {
        res.render("error", err);
      });
  }

  //[Get] /products/:id/edit
  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) =>
        res.render("admin/products/edit", {
          product: mutipleToObject(product),
        })
      )
      .catch(next);
  }

  //[Get] /products/:id/
  update(req, res, next) {
    const { name, description, image, price } = req.body;
    if (!name || !description || !image || !price) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    Product.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true }
    )
      .then((updatedProduct) => {
        //Cập nhật thành công slug khi tên sản phẩm thay đổi
        updatedProduct.slug = slugify(updatedProduct.name, { lower: true });
        updatedProduct.save(); // Cập nhật thành công
        res.redirect("/admin/me/stored/products");
        // res.json({ data: updatedProduct, message: "Cập nhật thành công" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //[Delete] /products/:id/
  delete(req, res, next) {
    Product.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[Delete] /products/:id/force
  forceDelete(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[Restore] /products/:id/restore
  restore(req, res, next) {
    Product.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[Post] /products/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Product.delete({ _id: { $in: req.body.productIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.json({ messenger: "Action is invalid!" });
        break;
    }
  }
}

// Add plugins
mongoose.plugin(slug);

module.exports = new ProductController();
