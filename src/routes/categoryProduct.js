const express = require("express");
const router = express.Router();

const categoryProductController = require("../app/controllers/CategoryProductController");

router.get("/listProduct/:id", categoryProductController.listProduct);
router.get("/", categoryProductController.show);
module.exports = router;
