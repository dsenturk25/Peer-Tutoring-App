

module.exports = (req, res) => {

  return res.render("tutor/login", {
    page: "tutor/login",
    title: "Tutor Login",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }
  })

}

