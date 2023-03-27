const express = require("express");
const router = express.Router();

const categoriesController = require("../app/controllers/CategoriesController");

router.get("/create", categoriesController.create);
router.post("/stored", categoriesController.store);
router.delete("/:id/delete", categoriesController.delete);
router.get("/:id/edit", categoriesController.edit);
router.put("/:id/update", categoriesController.update);

module.exports = router;
