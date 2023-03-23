class AdminController {
  admin(req, res, next) {
    res.render("admin");
    // res.json({ message: "Đã vào được trang Admin" });
  }
}
module.exports = new AdminController();
