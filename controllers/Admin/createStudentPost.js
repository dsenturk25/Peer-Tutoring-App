
const Student = require("../../models/Student/student");
const School = require("../../models/School/school");

module.exports = (req, res) => {
  
  School.findById(req.body.schoolId, (err, school) => {
    if (err) return res.send({ success: false, err: "couldn't find school" });
    req.body.email += school.corporate_email;
    Student.createStudent(req.body, (err, student) => {
      if (err) return res.send({ success: false, err: "couldn't create tutor" });
      return res.redirect("/admin");
    })
  })
}
