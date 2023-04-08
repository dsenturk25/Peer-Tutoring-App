
const Tutor = require("../models/Tutor/tutor");

module.exports = (req, res, next) => {

  if (req.session && req.session.tutor && req.session.tutor != {}) {
    Tutor.findTutorById(req.session.tutor, (err, tutor) => {
      if (err || !tutor) return res.redirect("/login");
      else if (tutor) next();
    })
  } else {
    return res.redirect("/login");
  }
}

