
const Student = require("../../../models/Student/student");
const School = require("../../../models/School/school");
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {
 
  const tutorIdToOpenSlotMapping = {};

  Student.findById(req.session.student._id, (err, student) => {
    School.findById(student.schoolId, (err, school) => {
      Tutor.find({ schoolId: school._id.toString() }, (err, tutors) => {

        async.timesSeries(tutors.length, (i, next1) => {

          const tutor = tutors[i];

          const slotDateMapping = {}

          async.timesSeries(tutor.availableTimes.length, (j, next2) => {

            const eachAvailableTime = tutor.availableTimes[j];
            
            if (slotDateMapping[eachAvailableTime.date] && slotDateMapping[eachAvailableTime.date].length > 0) {
              slotDateMapping[eachAvailableTime.date].push(eachAvailableTime);
            } else {
              slotDateMapping[eachAvailableTime.date] = [eachAvailableTime];
            }
            next2();
          }, (err) => {
            tutorIdToOpenSlotMapping[tutor._id] = slotDateMapping;
            next1();
          })
        }, async (err) => {

          for (let i = 0; i < tutors.length; i++) {
            
            if (tutors[i].profile_photo) tutors[i].profile_photo = await retrieveImageFromImageName(tutors[i].profile_photo);
          }
          return res.render("student/index", {
            page: "student/index",
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
            tutorIdToOpenSlotMapping
          })
        })
      })
    })
  })
}
