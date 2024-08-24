
const School = require("../../models/School/school");

module.exports = (req, res) => {

  School.loginAdmin(req.body, (err, school) => {
    req.session.school = school;
    if (err || !school) return res.send({ success: false, err: err });
    return res.send({ success: true, schoolId: school._id });
  })
}
