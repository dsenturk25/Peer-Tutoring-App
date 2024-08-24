
const Tutor = require("../../../models/Tutor/tutor");
const Session = require("../../../models/Session/session");
const Student = require("../../../models/Student/student");

module.exports = (req, res) => {

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err) return res.send({ success: false, tutor: tutor });
    
    Session.find({ tutor: tutor._id }, (err, sessions) => {
      if (err) return res.send({ success: false, tutor: tutor });

      Student.find({ schoolId: tutor.schoolId }, (err, students) => {
        return res.render("tutor/lessons", {
          page: "tutor/lessons",
          title: "Tutor My Lessons",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          },
          tutor,
          sessions,
          students
        })
      })
    })
  })
}

