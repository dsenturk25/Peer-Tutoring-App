
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {
  Tutor.createTutor(req.body, (err, tutor) => {
    if (err) return res.send({ success: false, err: err });
    return res.send({ success: true, tutor: tutor })
  })
}
