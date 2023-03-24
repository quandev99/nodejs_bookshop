const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/meController.js");
// productController.index
router.get("/stored/products", meController.storedProducts);
router.get("/stored/categories", meController.categoriesCategories);
router.get("/trash/products", meController.trashProducts);
module.exports = router;
