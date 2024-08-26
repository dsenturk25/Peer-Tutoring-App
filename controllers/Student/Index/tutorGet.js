
const School = require("../../../models/School/school");
const Session = require("../../../models/Session/session");
const Student = require("../../../models/Student/student");
const Tutor = require("../../../models/Tutor/tutor");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");
const async = require("async");

module.exports = (req, res) => {
  
  if (
    req.query.filter 
    && req.query.filter.includes("-") 
    && req.query.filter.split("-")[0].length > 0 
    && req.query.filter.split("-")[1].length > 0
  ) {

    const tutorName = req.query.filter.split("-")[0];
    const tutorSurname = req.query.filter.split("-")[1];

    Tutor.findOne({ name: tutorName, surname: tutorSurname }, async (err, tutor) => {
      if (err || !tutor) return res.status(400).redirect("/student");

      delete tutor.password;
      tutor.profile_photo = await retrieveImageFromImageName(tutor.profile_photo);

      Student.findById(req.session.student._id, (err, student) => {
        if (err || !tutor) return res.status(400).redirect("/student");

        School.findById(student.schoolId, (err, school) => {
          if (err || !tutor) return res.status(400).redirect("/student");

          Session.find({ studentId: student._id, tutorId: tutor._id }, (err, sessions) => {
            if (err || !tutor) return res.status(400).redirect("/student");

            const slotDateMapping = {};

            async.timesSeries(tutor.availableTimes.length, (i, next) => {

              const eachAvailableTime = tutor.availableTimes[i];
              
              if (slotDateMapping[eachAvailableTime.date] && slotDateMapping[eachAvailableTime.date].length > 0) {
                slotDateMapping[eachAvailableTime.date].push(eachAvailableTime);
              } else {
                slotDateMapping[eachAvailableTime.date] = [eachAvailableTime];
              }
              next();
            }, (err) => {
              return res.render("student/tutor", {
                page: "student/tutor",
                title: "Student Tutor",
                includes: {
                  external: {
                    css: ["page", "general"],
                    js: ["page", "functions"]
                  }
                },
                school,
                student,
                tutor,
                sessions,
                slotDateMapping
              }) 
            })
          })
        })
      })
    })
  } else {
    return res.status(400).redirect("/student");
  }
}
