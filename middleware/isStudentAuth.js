
const Student = require("../models/Student/student");

module.exports = (req, res, next) => {

  if (req.session && req.session.student && req.session.student != {}) {
    Student.findStudentById(req.session.student, (err, student) => {
      if (err || !student) return res.redirect("/student/login");
      else if (student) next();
    })
  } else {
    return res.redirect("/student/login");
  }
}

