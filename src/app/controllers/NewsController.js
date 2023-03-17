class NewsController {
  //Get /news
  index(req, res) {
    res.render("news");
  }
  show(req, res) {
    res.send("Day la cua quan");
  }
}
module.exports = new NewsController();
