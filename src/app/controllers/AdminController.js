class AdminController {
  admin(req, res, next) {
    res.render("admin/index", { layout: "admin" });
  }
}
module.exports = new AdminController();
