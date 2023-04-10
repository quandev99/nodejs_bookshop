require("dotenv").config();
const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");
const verifyToken = require("../middlewares/auth");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Generate ACCESS TOKEN
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, admin: user.admin },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, admin: user.admin },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "365d" }
  );
  return { accessToken, refreshToken };
};

let refreshTokens = [];

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

  // POST /login
  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      // kiểm tra xem các trường bắt buộc đã được nhập hay chưa
      if (!userName || !password) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin" });
      }
      // tìm user trong database dựa trên userName
      const user = await Auth.findOne({ userName: userName });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Sai tên đăng nhập" });
      }
      // so sánh password đã nhập với password trong database
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword && user) {
        const { accessToken, refreshToken } = generateTokens(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken),
          {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          };

        // đăng nhập thành công
        const { password, ...others } = user._doc;
        return res.status(200).json({
          success: true,
          message: "Đăng nhập thành công",
          ...others,
          accessToken,
        });
      } else {
        // đăng nhập thất bại
        return res.status(401).json({
          success: false,
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Đăng nhập thất bại!" + error.message,
      });
    }
  }

  //POST /LogOut
  logOut = async (req, res, next) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json({
      success: true,
      message: "Đăng xuất thành công!",
    });
  };

  //create new refresh token

  createNewRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.json(401).json(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = jwt.sign(
        {
          id: user._id,
          admin: user.admin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const newRefreshToken = jwt.sign(
        {
          id: user._id,
          admin: user.admin,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
      });
    });
  };

  //create new refresh token
  // async requestRefreshToken(req, res) {
  //   //Take refresh token from server
  //   const refreshToken = req.cookies && req.cookies.refreshToken;
  //   console.log("tra lai du lieu " + refreshToken);
  //   if (!refreshToken)
  //     return res
  //       .status(401)
  //       .json({ message: " You are not allowed to access this page." });
  //   if (!refreshTokens.includes(refreshToken)) {
  //     return res
  //       .status(403)
  //       .json({ message: "You are not allowed to access this page1." });
  //   }
  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
  //     if (err) {
  //       console.log(err);
  //       // return res.status(403).json({ message: "Access denied." });
  //     }
  //     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  //     const { newAccessToken, newRefreshToken } = generateTokens(user);
  //     refreshTokens.push(newRefreshToken);
  //     res.cookie("refreshToken", newRefreshToken, {
  //       httpOnly: true,
  //       secure: false,
  //       path: "/",
  //       sameSite: "strict",
  //     });
  //     res.status(200).json({ accessToken: newAccessToken });
  //   });
  // }

  async viewEdit(req, res, next) {
    const viewEdit = await Auth.findById(req.params.id).lean();
    try {
      res.status(200).render("admin/auth/edit", {
        user: viewEdit,
        layout: "admin",
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
          layout: "admin",
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

  //[Delete] /admin/auth/:id/deleteUser
  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const userId = await Auth.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ success: true, message: "Đã xóa thành công user" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
module.exports = new AuthController();
