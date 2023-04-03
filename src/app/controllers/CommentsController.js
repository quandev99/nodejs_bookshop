// const Product = require("../models/Product");
// const Comment = require("../models/Comment");

// class CommentsController {
//   submitComment(req, res, next) {
//     const productId = req.params.id;
//     const { userId, userName, userImage, rating, review } = req.body;

//     const comment = new Comment({
//       userId,
//       userName,
//       userImage,
//       productId,
//       rating,
//       review,
//     });
//     comment
//       .save()
//       .then((comment) => {
//         return res.status(200).json({
//           success: true,
//           comment,
//           message: "Bình luận thành công!",
//         });
//       })
//       .catch((err) => {
//         res.render("Bình luận không thành công", err);
//       });
//   }
// }
// module.exports = new CommentsController();

const Product = require("../models/Product");
const Comment = require("../models/Comment");

class CommentsController {
  async submitComment(req, res, next) {
    const productId = req.params.id;
    const { userId, userName, userImage, rating, review } = req.body;
    try {
      // Check if the user has already submitted a comment for this product
      const existingComment = await Comment.findOne({ userName, productId });
      if (existingComment) {
        return res
          .status(400)
          .json({ message: "Bạn đã bình luận cho sản phẩm này trước đó" });
      }

      // Create new comment
      const comment = new Comment({
        userId,
        userName,
        userImage,
        productId,
        rating,
        review,
      });
      await comment.save();

      // Update product rating
      const product = await Product.findById(productId);
      product.totalRating += rating;
      product.numReviews += 1;
      product.rating = product.totalRating / product.numReviews;
      await product.save();

      return res
        .status(200)
        .json({ message: "Bình luận của bạn đã được gửi thành công" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CommentsController();

// const Product = require("../models/Product");
// const Comment = require("../models/Comment");

// class CommentsController {
//   async submitComment(req, res, next) {
//     const productId = req.params.id;
//     const { userId, userName, userImage, rating, review } = req.body;

//     try {
//       const existingComment = await Comment.findOne({ userId, productId });

//       if (existingComment) {
//         return res.status(400).json({
//           success: false,
//           message: "Bạn đã bình luận về sản phẩm này trước đó!",
//         });
//       }

//       const comment = new Comment({
//         userId,
//         userName,
//         userImage,
//         productId,
//         rating,
//         review,
//       });

//       const savedComment = await comment.save();

//       return res.status(200).json({
//         success: true,
//         comment: savedComment,
//         message: "Bình luận thành công!",
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Đã có lỗi xảy ra khi lưu bình luận của bạn",
//       });
//     }
//   }
// }

// module.exports = new CommentsController();
