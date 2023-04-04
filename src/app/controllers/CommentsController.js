const Product = require("../models/Product");
const Comment = require("../models/Comment");
class CommentsController {
  async submitComment(req, res, next) {
    // const productId = req.params.id;
    const { productId, userName, userImage, rating, review } = req.body;
    try {
      // Check if the user has already submitted a comment for this product
      const existingComment = await Comment.findOne({ userName, productId });
      if (!userName) {
        return res.status(400).json({
          success: false,
          message: "Bạn phải đăng nhập mới được đánh giá sản phẩm!",
        });
      }
      if (!rating || !review === "") {
        return res.status(500).json({
          success: false,
          message: "Bạn phải nhập các đánh giá!",
        });
      }
      if (existingComment) {
        return res.status(400).json({
          success: false,
          message: "Bạn đã bình luận cho sản phẩm này trước đó",
        });
      }

      // Create new comment
      const comment = new Comment({
        productId,
        userName,
        userImage,
        rating,
        review,
      });
      await comment.save();

      const comments = await Comment.find({ productId });

      const totalScore = comments.reduce((a, b) => a + b.rating, 0);
      const reviewCount = comments.length;
      const averageScore = totalScore / reviewCount;
      // Cập nhật điểm đánh giá trung bình và số lần đánh giá cho sản phẩm
      const product = await Product.findById(productId);
      product.average_score = Math.round(averageScore);
      product.review_count = reviewCount;
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Bình luận của bạn đã được gửi thành công",
      });
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
//     const { productId, userName, userImage, rating, review } = req.body;

//     try {
//       if (!userName) {
//         return res.status(500).json({
//           success: false,
//           message: "Bạn phải đăng nhập mới được bình luận sản phẩm này",
//         });
//       }

//       // Kiểm tra xem người dùng đã bình luận cho sản phẩm này chưa
//       const existingComment = await Comment.findOne({ userName, productId });
//       if (existingComment) {
//         return res.status(400).json({
//           success: false,
//           message: "Bạn đã bình luận cho sản phẩm này trước đó",
//         });
//       }

//       // Tạo mới bình luận
//       const comment = new Comment({
//         productId,
//         userName,
//         userImage,
//         rating,
//         review,
//       });
//       await comment.save();

//       // Cập nhật điểm đánh giá trung bình và số lần đánh giá cho sản phẩm
//       const product = await Product.findById(productId);
//       product.average_score =
//         (product.average_score * product.review_count + rating) /
//         (product.review_count + 1);
//       product.review_count += 1;
//       await product.save();

//       return res.status(200).json({
//         success: true,
//         message: "Bình luận của bạn đã được gửi thành công",
//       });
//     } catch (error) {
//       return next(error);
//     }
//   }
// }

// module.exports = new CommentsController();
