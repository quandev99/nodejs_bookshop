const Course = require("../models/Course");
const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class MeController {
  //Get /me/stored/courses
  storedCourses(rep, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
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
