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
    res.render("admin/auth/register");
  }

  viewLogin(req, res, next) {
    res.render("admin/auth/loginUser");
  }

  async listUser(req, res, next) {
    const listAuth = await Auth.find({}).lean();
    try {
      res.status(200).render("admin/me/list-users", {
        users: listAuth,
        message: "Hiển thị được toàn bộ tài khoản người dùng",
      });
    } catch {
      res.status(500).json({ message: "Lỗi hiển thị danh sách Users" });
    }
  }
  async viewEdit(req, res, next) {
    const viewEdit = await Auth.findById(req.params.id).lean();
    try {
      res.status(200).render("admin/auth/edit", {
        user: viewEdit,
      });
    } catch {
      res.status(500).json({ message: "Lỗi hiển thị danh sách Users" });
    }
  }

  updateUser(req, res, next) {
    const { id } = req.params;
    const { fullName, userName, email, avatar, password = "" } = req.body;
    if (!fullName || !userName || !email || !avatar) {
      return res.status(500).json({
        success: false,
        message: "Bạn không được bỏ trống tên tài khoản!",
      });
    }
    Auth.findById(id)
      .then((user) => {
        if (!user) {
          res.status(500).json("Tài khoản không tồn tại!");
        }
        if (user && user._id != id) {
          res.status(400).json({
            success: false,
            message: "Tên tài khoản đã được sử dụng",
          });
        }
        return user.save();
      })
      .then((user) => {
        res.status(200).json({
          success: true,
          data: user,
          message: "Cập nhật tài khoản thành công!",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err.message || "Thất bại!",
        });
      });
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

  //[Delete] /admin/auth/:id/deleteUser
  deleteUser(req, res, next) {
    Auth.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
module.exports = new AuthController();
