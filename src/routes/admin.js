const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth.js");
const adminController = require("../app/controllers/AdminController.js");

router.get("/", verifyTokenAndAdminAuth, adminController.admin);
module.exports = router;
