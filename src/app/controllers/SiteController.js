const Course = require("../models/Course");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class SiteController {
  //Get /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
