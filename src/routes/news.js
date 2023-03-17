const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController.js");
// newsController.index
router.get("/quan", newsController.show);
router.get("/", newsController.index);
module.exports = router;
