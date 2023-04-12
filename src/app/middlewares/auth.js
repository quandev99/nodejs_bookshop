const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  // const token = req.headers.Authorization;

  console.log("Token cua toi: " + token);
  if (token) {
    // const accessToken = token.split(" ")[1];
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.admin === true) {
      next();
    } else {
      res.status(403).json({
        message: "You do not have access to the admin page!",
        success: false,
      });
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAdminAuth };
