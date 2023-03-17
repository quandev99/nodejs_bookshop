const Course = require("../models/Course");

const {
  mutipleMongooseToObject,
  mutipleToObject,
} = require("../../until/mongoose");
class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("detaill", {
          course: mutipleToObject(course),
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  //[Get] /courses/create
  create(req, res, next) {
    res.render("create");
  }
  //[Post] /courses/store
  store(req, res, next) {
    // res.json(req.body);
    const FormData = req.body;
    const course = new Course(FormData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((err) => {
        res.render("error", err);
      });
  }

  //[Get] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("edit", {
          course: mutipleToObject(course),
        })
      )
      .catch(next);
  }

  //[Get] /courses/:id/
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  //[Delete] /courses/:id/
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[Delete] /courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[Restore] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[Post] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.json({ messenger: "Action is invalid!" });
        break;
    }
  }
}
module.exports = new CourseController();
