

const School = require("../../../models/School/school");
const Student = require("../../../models/Student/student");
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");

module.exports = (req, res) => {

  School.findById(req.session.student.schoolId, (err, school) => {
    Student.find({ schoolId: school._id }, (err, students) => {

      if (err) return res.send({ success: false, err: "bad_request" });
      
      Tutor.find({ schoolId: school._id }, (err, tutors) => {
        if (err) return res.send({ success: false, err: "bad_request" });

        let sessionCount = 0;
        async.timesSeries(tutors.length, (i, next) => {
          const eachTutor = tutors[i];
          sessionCount += eachTutor.sessions.length;
          next();
        }, (err) => {
          if (err) return res.send({ success: false, err: "bad_request" });

          const tutorCount = tutors.length;
          const studentCount = students.length;

          const student = req.session.student;

          return res.render("student/school", {
            page: "student/school",
            title: "Student School",
            includes: {
              external: {
                css: ["page", "general"],
                js: ["page", "functions"]
              }
            },
            school,
            tutorCount,
            studentCount,
            sessionCount,
            student
          })
        })
      })
    })
  })
}

