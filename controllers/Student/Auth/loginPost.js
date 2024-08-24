
const Student = require("../../../models/Student/student");

module.exports = (req, res) => {

  Student.loginStudent(req.body, (err, student) => {
    if (err) return res.send({ success: false, err: err });
    req.session.student = student;
    return res.send({ success: true, student: student })
  })
}

