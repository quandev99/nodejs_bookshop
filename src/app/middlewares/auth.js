const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();
const verifyToken = (req, res, next) => {
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

const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      // && req.user.admin
      // Kiểm tra nếu tồn tại req.user và req.user.admin là true
      next();
    } else {
      res.status(403).json({
        message: "You do not have access to the admin page!",
      });
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAdminAuth };
