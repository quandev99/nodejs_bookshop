const Auth = require("../models/Auth");
const session = require("express-session");
class AuthController {
  //Get /
  register(req, res, next) {
    const formData = req.body;
    Auth.findOne({ userName: formData.userName })
      .then((user) => {
        if (user) {
          res.json("Tai khoan da ton tai");
        } else {
          return Auth.create(formData);
        }
      })
      .then((data) => {
        res.json({
          message: "Tao tai khoan thanh cong",
          user: data,
        });
      })
      .catch((err) => {
        res.json("Loi cmnr");
      });
  }
  viewLogin(req, res, next) {
    res.render("auth/loginUser");
  }
  login(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;
    Auth.findOne({ userName: userName, password: password })
      .then((data) => {
        if (!data) {
          res.send({
            message: "Sai tai khoan hoac mat khau",
          });
        } else {
          res.status(200).json({
            message: "Dang nhap thanh cong",
            user: data,
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
}
module.exports = new AuthController();
