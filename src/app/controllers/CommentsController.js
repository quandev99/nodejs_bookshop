const Product = require("../models/Product");
const Comment = require("../models/Comment");
const Auth = require("../models/Auth");

class CommentsController {
  submitComment(req, res, next) {
    const productId = req.params.id;
    const { userId, userName, userImage, rating, review } = req.body;
    // get the user information from the local storage
    // const userId = localStorage.getItem("userId");
    // const userName = localStorage.getItem("userName");
    // const userImage = localStorage.getItem("avatar");
    const comment = new Comment({
      userId,
      userName,
      userImage,
      productId,
      rating,
      review,
    });
    comment
      .save()
      .then((data) => {
        return res.status(200).json({
          success: true,
          data,
          message: "Bình luận thành công!",
        });
      })
      .catch((err) => {
        res.render("Bình luận không thành công", err);
      });
  }
}
module.exports = new CommentsController();
