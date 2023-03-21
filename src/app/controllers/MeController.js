const Course = require("../models/Course");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class MeController {
  //Get /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});
    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        // [req.query.column]: req.query.type,
        name: "asc",
      });
      return;
    }
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCourse]) => {
        res.render("me/stored-courses", {
          deletedCourse: deletedCourse,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
    // Course.countDocumentsDeleted()
    //   .then((deletedCourse) => {
    //     console.log(deletedCourse);
    //   })
    //   .catch(next);
    // Course.find({})
    //   .then((courses) => {
    //     res.render("me/stored-courses", {
    //       courses: mutipleMongooseToObject(courses),
    //     });
    //   })
    //   .catch(next);
  }

  //Get /me/trash/courses
  trashCourses(rep, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new MeController();
