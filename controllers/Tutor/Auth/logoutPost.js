const Tutor = require("../../../models/Tutor/tutor")

module.exports = (req, res) => {
  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (!tutor && err) return res.send({ success: false, err: "couldn't logout" });
    req.session.tutor = {};
    return res.send({ success: true })   
  })
}
