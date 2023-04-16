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

      // Tìm tất cả bình luận của sản sản phẩm đó.
      const comments = await Comment.find({ productId });
      // Tính tổng số sao đã đánh giá của sản phảm đó.
      const totalScore = comments.reduce((a, b) => a + b.rating, 0);
      // Tính số lượt đánh giá sản phẩm.
      const reviewCount = comments.length;
      // Tính trung bình số sao,
      const averageScore = totalScore / reviewCount;
      // Cập nhật điểm đánh giá trung bình và số lần đánh giá cho sản phẩm
      const product = await Product.findById(productId);
      // Làm tròn số sao
      product.average_score = Math.round(averageScore);
      product.review_count = reviewCount;
      // lưu trung đánh giá số sao và lượt đánh giá sản phẩm đó
      await product.save();
      return res.status(200).json({
        success: true,
        message: "Bình luận của bạn đã được gửi thành công",
      });
    } catch (error) {
      return next(error);
    }
  }
  deleteComment = async (req, res, next) => {
    const id = req.params.id;
    const deleted = await Comment.deleteOne({ _id: id });
    try {
      return res
        .status(200)
        .json({ success: true, message: "Đã xóa thành công user" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
module.exports = new CommentsController();
