const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController.js");
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth.js");

router.get("/", verifyToken, adminController.admin);
module.exports = router;
