
const Tutor = require("../../models/Tutor/tutor");
const School = require("../../models/School/school");

module.exports = (req, res) => {
  
  School.findById(req.body.schoolId, (err, school) => {
    if (err) return res.send({ success: false, err: "couldn't find school" });
    req.body.email += school.corporate_email;
    Tutor.createTutor(req.body, (err, tutor) => {
      if (err) return res.send({ success: false, err: "couldn't create tutor" });
      return res.redirect("/admin");
    })
  })
}
