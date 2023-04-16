const express = require("express");
const router = express.Router();

const commentController = require("../app/controllers/CommentsController");
router.delete("/:id/deleteComment", commentController.deleteComment);
router.post("/:id", commentController.submitComment);
module.exports = router;
