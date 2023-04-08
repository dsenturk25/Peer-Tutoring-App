
const Student = require("../models/Student/student");

module.exports = (req, res, next) => {

  Student.findById(req.session.student._id, (err, student) => {
    if (!student.isEmailConfirmed) return res.redirect("/student/email_confirm");
    else if (student.isEmailConfirmed) return next();
  })
}
