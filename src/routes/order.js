const express = require("express");
const router = express.Router();

const ordersController = require("../app/controllers/OrdersController.js");

router.post("/addCart", ordersController.addCart);
router.get("/checkout", ordersController.checkout);
router.get("/", ordersController.Cart);
module.exports = router;
