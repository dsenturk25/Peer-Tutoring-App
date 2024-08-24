
module.exports = (req, res) => {

  return res.render("index/index", {
    page: "index/index",
    title: "Welcome",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }
  })

}

