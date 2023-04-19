const express = require("express");
const router = express.Router();

const ordersController = require("../app/controllers/OrdersController.js");
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth.js");
router.post("/addCart", verifyToken, ordersController.addCart);
router.get("/checkout", verifyToken, ordersController.checkout);
router.get("/:id/getOrderDetail", verifyToken, ordersController.getOrderDetail);
router.delete("/:id/deleteOrder", verifyToken, ordersController.deleteOrder);
router.get("/", verifyToken, ordersController.Cart);
module.exports = router;
