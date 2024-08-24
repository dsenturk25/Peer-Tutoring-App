
const School = require("../../models/School/school");
const Tutor = require("../../models/Tutor/tutor");
const Student = require("../../models/Student/student");


module.exports = (req, res) => {

  School.findById(req.session.school._id, (err, school) => {

    Tutor.find({ schoolId: school._id.toString() }, (err, tutors) => {
      Student.find({ schoolId: school._id.toString() }, (err, students) => {

        return res.render("admin/index", {
          page: "admin/index",
          title: "Admin Welcome",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          },
          school,
          tutors,
          students
        })  
      })
    })
  })
}

