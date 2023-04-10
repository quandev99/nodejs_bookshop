class AdminController {
  admin(req, res, next) {
    try {
      return res.status(200).render("admin", { layout: "admin" });
    } catch (error) {
      console.log("Lỗi hiện thị trang Admin!" + error);
    }
  }
}
module.exports = new AdminController();
