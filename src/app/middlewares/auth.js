const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();
const verifyToken =  (req, res, next) => {
  // const token = req.headers.Authorization;

  // console.log("Token cua toi: " + token);
  const token = req.cookies.refreshToken;
  if (token) {
    // const accessToken = token.split(" ")[1];
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      var user = JSON.stringify(decoded);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

// const verifyTokenAndAdminAuth = (req, res, next) => {
//   verifyToken(req, res, () => {
//     const auth = req?.user
//     console.log("auth", auth);
//     if (auth && auth.admin !== undefined) {
//       if (auth.admin) {
//         // Kiểm tra nếu tồn tại req.user và req.user.admin là true
//         next();
//       } else {
//         res.status(403).json({
//           message: "You do not have access to the admin page!",
//         });
//       }
//     } else {
//       console.log(
//         "Thuộc tính 'admin' không tồn tại hoặc không được định nghĩa."
//       );
//     }
//   });
// };

const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    const  data = req?.user;
const auth = JSON.parse(data);
    if (auth) {
      if (auth.admin !== undefined) {
        if (auth.admin) {
          // Kiểm tra nếu tồn tại req.user và req.user.admin là true
          next();
        } else {
          res.status(403).json({
            message: "You do not have access to the admin page!",
          });
        }
      } else {
        res.status(403).json({
          message: "khong ton tai!",
        });
      }
    } else {
      console.log("Người dùng không được xác định.");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdminAuth };
