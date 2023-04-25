const express = require("express");
const router = express.Router();

const ordersController = require("../app/controllers/OrdersController.js");
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth.js");
router.post("/addCart", ordersController.addCart);
router.get("/checkout", ordersController.checkout);
router.get("/:id/getOrderDetail", ordersController.getOrderDetail);
router.delete("/:id/deleteOrder", ordersController.deleteOrder);
router.get("/", ordersController.Cart);
module.exports = router;
