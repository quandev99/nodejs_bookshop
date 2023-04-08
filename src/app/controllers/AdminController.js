class AdminController {
  admin(req, res, next) {
    try {
      return res
        .status(200)
        .render("admin", { success: true, layout: "admin" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new AdminController();
