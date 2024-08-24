
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {
  Tutor.findByIdAndUpdate(req.session.tutor._id, { link: req.body.link }, (err, tutor) => {
    if (err) return res.send({ success: false, err: "not found" });
    return res.send({ success: true, tutor: tutor });
  })
}
