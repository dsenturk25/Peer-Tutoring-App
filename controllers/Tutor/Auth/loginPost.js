
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {
  Tutor.loginTutor(req.body, (err, tutor) => {
    if (err) return res.send({ success: false, err: err });
    req.session.tutor = tutor;
    return res.send({ success: true, tutor: tutor })
  })
}
