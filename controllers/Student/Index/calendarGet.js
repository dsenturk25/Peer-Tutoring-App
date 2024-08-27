
const Student = require("../../../models/Student/student");

module.exports = (req, res) => {
  Student.findById(req.session.student._id, (err, student) => {

    if (err) return res.redirect("/student");
    return res.render("student/calendar", {
      page: "student/calendar",
      title: "Student Calendar",
      includes: {
        external: {
          css: ["page", "general"],
          js: ["page", "functions"]
        }
      },
      student,
    });
  })
}
