
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {
  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    tutor.availableTimes.push(req.body);
    tutor.save();
    return res.send({ success: true, tutor: tutor });
  })
}
