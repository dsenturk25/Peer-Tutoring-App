
const Student = require("../models/Student/student");

module.exports = (req, res, next) => {

  Student.findById(req.session.student._id, (err, student) => {
    if (!student.isAccountCompleted) return res.redirect("/student/complete_account");
    else if (student.isAccountCompleted) return next();
  })
}
