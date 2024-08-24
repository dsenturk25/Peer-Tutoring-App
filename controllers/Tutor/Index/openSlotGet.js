
const Tutor = require("../../../models/Tutor/tutor");
const Session = require("../../../models/Session/session");
const async = require("async");

module.exports = (req, res) => {

  let slotDateMapping = {}

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err) return res.send({ success: false, tutor: tutor });
    
    Session.find({ tutor: tutor._id }, (err, sessions) => {
      if (err) return res.send({ success: false, tutor: tutor });

        async.timesSeries(tutor.availableTimes.length, (i, next) => {

          const eachAvailableTime = tutor.availableTimes[i];
          
          if (slotDateMapping[eachAvailableTime.date] && slotDateMapping[eachAvailableTime.date].length > 0) {
            slotDateMapping[eachAvailableTime.date].push(eachAvailableTime);
          } else {
            slotDateMapping[eachAvailableTime.date] = [eachAvailableTime];
          }
          next();
        }, (err) => {
          return res.render("tutor/slot", {
            page: "tutor/slot",
            title: "Tutor Manage Slots",
            includes: {
              external: {
                css: ["page", "general"],
                js: ["page", "functions"]
              }
            },
            tutor,
            sessions,
            slotDateMapping
          })
        })
    })
  })
}

