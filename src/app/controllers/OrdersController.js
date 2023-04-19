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
      const {
        userId,
        userName,
        avatar,
        email,
        address,
        phone,
        totalQuantity,
        totalAmount,
        products,
      } = req.body;
      if (!userName || !email || !address || !phone)
        return res
          .status(403)
          .json({ success: false, message: "Vui lòng nhập thông tin đầy đủ" });
      const order = new Order({
        userId,
        avatar,
        userName,
        email,
        address,
        phone,
        totalQuantity,
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
        res.clearCookie("order");
      }
      res.status(201).json({
        success: true,
        message: "Thêm sản phẩm vào giỏ hàng thành công",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  //Get /order/:id/viewOrderDetail
  getOrderDetail = async (req, res, next) => {
    try {
      const id = req.params.id;
      const viewOrderDetail = await OrderDetail.find({
        order: id,
      }).lean();
      res.status(200).render("admin/order/viewOrderDetail", {
        OrderDetail: viewOrderDetail,
        layout: "admin",
      });
    } catch {
      res
        .status(500)
        .json({ message: "Lỗi hiển thị danh sách Order chi tiết!" });
    }
  };
  //Delete /order/:id/deleteOrder
  deleteOrder = async (req, res, next) => {
    try {
      const id = req.params.id;
      const orderId = await Order.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ success: true, message: "Đã xóa thành công đơn hàng này!" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
module.exports = new OrdersController();
