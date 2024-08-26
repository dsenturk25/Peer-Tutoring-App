
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");

module.exports = (req, res) => {

  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err || !tutor) res.status(400).send({ success: false, err: "bad_request" });
    
    async.timesSeries(tutor.availableTimes.length, (i, next) => {
      const eachAvailableTime = tutor.availableTimes[i];
      console.log(eachAvailableTime)
      if (eachAvailableTime && (eachAvailableTime._id == req.body.slotId && eachAvailableTime.isAvailable)) {
        const indexOfAvailableTime = tutor.availableTimes.indexOf(eachAvailableTime);
        tutor.availableTimes.splice(indexOfAvailableTime, 1);
      }
      next();
    }, (err) => {
      if (err) res.status(400).send({ success: false, err: "bad_request" });

      tutor.save()
      return res.send({ success: true, tutor: tutor });
    })
  })
}
