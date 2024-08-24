
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {
  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err) return res.send({ success: false, err: "not found" });

    if (!tutor.subjects.includes(req.body.subject)) {
      tutor.subjects.push(req.body.subject);
    } else {
      const newSubjectsArray = tutor.subjects.filter(eachSubject => {
        return eachSubject != req.body.subject;
      })

      tutor.subjects = newSubjectsArray;
    }

    tutor.save();
    return res.send({ success: true, tutor: tutor });
  })
}
