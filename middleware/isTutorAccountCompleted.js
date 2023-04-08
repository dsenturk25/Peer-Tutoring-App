
const Tutor = require("../models/Tutor/tutor");

module.exports = (req, res, next) => {

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (!tutor.isAccountCompleted) return res.redirect("/tutor/complete_account");
    else if (tutor.isAccountCompleted) return next();
  })
}
