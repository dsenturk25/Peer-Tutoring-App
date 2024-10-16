
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err) return res.status(400).send({ success: false, err: "bad_request" });
  
    tutor.password = req.body.password;
    tutor.isPasswordChanged = true;

    tutor.save();

    return res.status(200).send({ success: true, tutor: tutor });
  })
}
