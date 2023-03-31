const Product = require("../models/Product");
const Comment = require("../models/Comment");

class CommentsController {
  submitComment(req, res, next) {
    const productId = req.params.id;
    const { userId, userName, userImage, rating, review } = req.body;

    const comment = new Comment({
      userId,
      userName,
      userImage,
      productId,
      rating,
      review,
    });
    console.log(comment);
    comment
      .save()
      .then((comment) => {
        return res.status(200).json({
          success: true,
          message: "Bình luận thành công!",
        });
      })
      .catch((err) => {
        res.render("Bình luận không thành công", err);
      });
  }
}
module.exports = new CommentsController();

// const Product = require("../models/Product");
// const Comment = require("../models/Comment");

// class CommentsController {
//   async submitComment(req, res, next) {
//     const productId = req.params.id;
//     const { userId, userName, userImage, rating, review } = req.body;

//     // Check if the user has already submitted a comment for this product
//     Comment.findOne({ userId: userId, productId: productId }, (err, data) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: "Đã có lỗi xảy ra khi kiểm tra bình luận người dùng",
//         });
//       }

//       if (data) {
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

//       comment
//         .save()
//         .then(() => {
//           return res.status(200).json({
//             success: true,
//             message: "Bình luận thành công!",
//           });
//         })
//         .catch((err) => {
//           res.status(500).json({
//             success: false,
//             message: "Đã có lỗi xảy ra khi lưu bình luận của bạn",
//           });
//         });
//     });
//   }
// }

// module.exports = new CommentsController();

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
