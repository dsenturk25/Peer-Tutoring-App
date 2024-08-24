
const Tutor = require("../../../models/Tutor/tutor");
const School = require("../../../models/School/school");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  Tutor.findById(req.session.tutor._id, async (err, tutor) => {
    if (err) return res.send({ success: false, tutor: tutor });
    
    if (tutor.profile_photo)  tutor.profile_photo = await retrieveImageFromImageName(tutor.profile_photo);

    School.findById(tutor.schoolId, (err, school) => {
      return res.render("tutor/profile", {
        page: "tutor/profile",
        title: "Tutor My Sessions",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        },
        tutor,
        school
      })
    })
  })
}

