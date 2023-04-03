const Product = require("../models/Product");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const Auth = require("../models/Auth");
const mongoose = require("mongoose");
const slugify = require("slugify");
const slug = require("mongoose-slug-generator");

const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class ProductController {
  async show(req, res, next) {
    const product = await Product.findOne({ slug: req.params.slug }).lean();
    const productRelated = await Product.find({
      categoryId: product?.categoryId,
    }).lean();
    const comments = await Comment.find({
      productId: product._id,
    }).lean();
    const productRelatedWithoutCurrent = productRelated.filter(
      (p) => p.slug !== product.slug
    );
    try {
      res.render("detaill", {
        product: product,
        productRelated: productRelatedWithoutCurrent,
        comments: comments,
      });
    } catch (err) {
      res.status(400).json({ message: "Ko xem duoc" });
    }
  }

  //[Get] /products/create
  create(req, res, next) {
    Category.find({}).then((categories) => {
      res.render("admin/products/create", {
        categories: mutipleMongooseToObject(categories),
      });
    });
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
        res.render("Thêm sản phẩm không thành công", err);
      });
  }

  //[Get] /products/:id/edit
  async edit(req, res, next) {
    const listCategories = await Category.find({}).lean();
    const product = await Product.findById(req.params.id).lean();

    res.status(200).render("admin/products/edit", {
      categories: listCategories,
      product: product,
    });
  }

  //[Get] /products/:id/
  async update(req, res, next) {
    const { name, categoryId, author, year, description, image, price } =
      req.body;
    if (
      !name ||
      !categoryId ||
      !author ||
      !year ||
      !description ||
      !image ||
      !price
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin" });
    }

    try {
      const newSlug = slugify(req.body.name, { lower: true });
      const data = {
        ...req.body,
        slug: newSlug,
      };
      Product.updateOne(
        {
          _id: req.params.id,
        },
        data
      ).then((data) => {
        res.status(200).json({
          data: data,
          success: true,
          message: "Cập nhật sản phẩm thành công",
        });
      });
      //Cập nhật thành công slug khi tên sản phẩm thay đổi
      // updatedProduct.slug = slugify(updatedProduct.name, { lower: true });
      // updatedProduct.save(req.body); // Cập nhật thành công
      // res.redirect("/admin/me/stored/products");
    } catch {
      res.status(500).json({
        success: false,
        message: "Cập nhật sản phẩm thất bại!",
      });
    }
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
