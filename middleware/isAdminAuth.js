
const School = require("../models/School/school");

module.exports = (req, res, next) => {

  if (req.session.school) {
    School.findById(req.session.school._id, (err, school) => {
      if (err || !school) return res.redirect("/admin/login");
      return next();
    })
  } else {
    return res.redirect("/admin/login");
  }
}
