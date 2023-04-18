const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");

class OrdersController {
  //Get Cart
  Cart(req, res, next) {
    return res.render("add-cart");
  }
  //Get checkout
  checkout(req, res, next) {
    return res.render("checkout-cart");
  }

  //post addCart
  addCart = async (req, res, next) => {
    try {
      const { userId, userName, email, address, phone, totalAmount, products } =
        req.body;
      console.log(products);
      const order = new Order({
        userId,
        userName,
        email,
        address,
        phone,
        totalAmount,
      });
      await order.save();
      // Lưu chi tiết đơn hàng

      for (let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i].id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        const orderDetail = new OrderDetail({
          order: order._id,
          productId: product._id,
          title: product.name,
          image: product.image,
          quantity: products[i].quantity,
          price: products[i].price,
        });
        await orderDetail.save();
      }
      res.status(201).json({
        success: true,
        message: "Thêm sản phẩm vào giỏ hàng thành công",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = new OrdersController();
