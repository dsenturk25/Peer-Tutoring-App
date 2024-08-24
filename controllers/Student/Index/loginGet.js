
module.exports = (req, res) => {

  return res.render("student/login", {
    page: "student/login",
    title: "Student Login",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }
  })
}

