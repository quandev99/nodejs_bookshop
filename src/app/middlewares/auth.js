const jwt = require("jsonwebtoken");

require("dotenv").config();
const verifyToken = (req, res, next) => {
  //get token
  const token = req.headers.token;
  if (token) {
    //bearer fdsfasdfdsfsdfasdf
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Token is not valid", success: false });
      }
      req.user = user;
      console.log("asdasdkagdkjadhad:" + token);
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "You're not authenticated", success: false });
  }
};
const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.admin) {
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
