const Auth = require("../models/Auth");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");

class AuthController {
  //Post /register
  register(req, res, next) {
    const { fullName, password, avatar, userName, email } = req.body;
    // // kiểm tra xem các trường bắt buộc đã được nhập hay chưa
    if (!fullName || !password || !avatar || !userName || !email) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    // kiểm tra xem userName đã được sử dụng hay chưa
    Auth.findOne({ userName: userName }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.status(400).json({ message: "UserName đã được sử dụng" });
      }
      // tạo document mới và lưu vào database
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const newUser = new Auth({
          fullName,
          password: hash,
          avatar,
          userName,
          email,
        });
        newUser.save((err, savedUser) => {
          if (err) {
            return next(err);
          }
          // trả về thông tin user đã tạo thành công
          res
            .status(201)
            .json({ user: savedUser, message: "Đăng kí thành công" });
        });
      });
    });
  }
  viewRegister(req, res) {
    res.render("auth/register");
  }

  viewLogin(req, res, next) {
    res.render("admin/auth/loginUser");
  }

  listUser(req, res, next) {
    Auth.find({})
      .then((users) => {
        res.render("admin/me/list-users", {
          users: mutipleMongooseToObject(users),
        });
      })
      .catch(next);
  }
  viewEdit(req, res, next) {
    Auth.findById(req.params.id)
      .then((users) =>
        res.render("admin/auth/edit", {
          users: mutipleToObject(users),
        })
      )
      .catch(next);
  }

  // POST /login
  login(req, res, next) {
    const { userName, password } = req.body;
    // kiểm tra xem các trường bắt buộc đã được nhập hay chưa
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    // tìm user trong database dựa trên userName
    Auth.findOne({ userName: userName }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: "UserName hoặc mật khẩu không đúng" });
      }
      // so sánh password đã nhập với password trong database
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          // đăng nhập thành công
          req.user = user;
          return res
            .status(200)
            .json({ message: "Đăng nhập thành công", user: user });
        } else {
          // đăng nhập thất bại
          return res
            .status(401)
            .json({ message: "UserName hoặc mật khẩu không đúng" });
        }
      });
    });
  }

  // login(req, res, next) {
  //   const userName = req.body.userName;
  //   const password = req.body.password;
  //   Auth.findOne({ userName: userName, password: password })
  //     .then((data) => {
  //       if (!data) {
  //         res.send({
  //           message: "Sai tai khoan hoac mat khau",
  //         });
  //       } else {
  //         res.status(200).json({
  //           message: "Dang nhap thanh cong",
  //           user: data,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(400).send(err);
  //     });
  // }
}
module.exports = new AuthController();
