
const School = require("../../models/School/school");
const async = require("async");

module.exports = (req, res) => {

  const schoolsDisplayObjects = [];
  
  School.find({ }, (err, schools) => {
    if (err) return res.send({ success: false, err: err });

    async.timesSeries(schools.length, (i, next) => {
      const eachSchool = schools[i];

      const eachSchoolDisplayObject = {
        schoolName: eachSchool.name,
        schoolImage: eachSchool.profile_image
      }

      schoolsDisplayObjects.push(eachSchoolDisplayObject);
      next();
    }, (err) => {

      if (err) return res.send({ success: false, err: err });

      return res.render("index/index", {
        page: "index/index",
        title: "Welcome",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        },
        schoolsDisplayObjects
      })
    })
  })
}

