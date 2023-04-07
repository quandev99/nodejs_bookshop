const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth");
const meController = require("../app/controllers/meController.js");
// productController.index
router.get("/stored/listUser", verifyTokenAndAdminAuth, meController.listUser);
router.get("/stored/products", meController.storedProducts);
router.get("/stored/categories", meController.categoriesCategories);
router.get("/trash/products", meController.trashProducts);
module.exports = router;
