
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {
  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err) return res.send({ success: false, err: "not found" });

    if (!tutor.subjects.includes(req.body.subject)) {
      tutor.subjects.push(req.body.subject);
    } else {
      const indexOfToBeRemovedSubject = tutor.subjects.indexOf(req.body.subject);
      tutor.subjects.splice(indexOfToBeRemovedSubject, 1);
    }

    tutor.save();
    return res.send({ success: true, tutor: tutor });
  })
}
