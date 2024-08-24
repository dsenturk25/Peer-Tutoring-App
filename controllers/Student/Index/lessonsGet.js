
const Student = require("../../../models/Student/student");
const School = require("../../../models/School/school");
const Tutor = require("../../../models/Tutor/tutor");
const Sessions = require("../../../models/Session/session");

module.exports = (req, res) => {
 

  Student.findById(req.session.student._id, (err, student) => {
    School.findById(student.schoolId, (err, school) => {
      Tutor.find({ schoolId: school._id.toString() }, (err, tutors) => {
        Sessions.find({ studentId: student._id }, (err, sessions) => {
          return res.render("student/lessons", {
            page: "student/lessons",
            title: "Student Welcome",
            includes: {
              external: {
                css: ["page", "general"],
                js: ["page", "functions"]
              }
            },
            student,
            school,
            tutors,
            sessions
          })
        })
      })
    })
  })
}
