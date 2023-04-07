const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //get token
  const token = req.headers.token;
  if (token) {
    //bearer fdsfasdfdsfsdfasdf
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
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
    if (req.user.id == req.params.id || req.user.admin) {
      next();
    } else {
      res.status(403).json("You are not allowed to delete this user!");
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAdminAuth };
