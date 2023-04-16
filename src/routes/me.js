const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth");
const meController = require("../app/controllers/MeController.js");
router.get("/stored/listUser", meController.listUser);
router.get("/stored/products", meController.storedProducts);
router.get("/stored/categories", meController.categoriesCategories);
router.get("/stored/listComments", meController.listComments);
router.get("/trash/products", meController.trashProducts);
module.exports = router;
