
const Tutor = require("../../../models/Tutor/tutor");

module.exports = (req, res) => {

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    return res.render("tutor/index", {
      page: "tutor/index",
      title: "Tutor Welcome",
      includes: {
        external: {
          css: ["page", "general"],
          js: ["page", "functions"]
        }
      },
      tutor
    })
  })
}

