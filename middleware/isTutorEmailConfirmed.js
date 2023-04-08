
const Tutor = require("../models/Tutor/tutor");

module.exports = (req, res, next) => {

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (!tutor.isEmailConfirmed) return res.redirect("/tutor/email_confirm");
    else if (tutor.isEmailConfirmed) return next();
  })
}
