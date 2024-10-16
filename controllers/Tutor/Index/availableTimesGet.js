
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");

module.exports = (req, res) => {
  Tutor.findById(req.session.tutor._id, (err, tutor) => {
    if (err || !tutor) return res.status(400).json({ success: false, err: "can't find alumni" });

    const availableTimes = [];

    async.timesSeries(tutor.availableTimes.length, (i, next) => {

      const eachAvailableTime = tutor.availableTimes[i];

      const calendarPinFormat = {
        id: eachAvailableTime._id,
        title: `${eachAvailableTime.isAvailable ? "Waiting for session request..." : "Session arranged"}`,
        start: new Date(eachAvailableTime.date + ' ' + (eachAvailableTime.startTime)),
        end: new Date(eachAvailableTime.date + ' ' + eachAvailableTime.finishTime),
        backgroundColor: `${eachAvailableTime.isAvailable ? "lightgreen" : "lightcoral"}`
      }

      availableTimes.push(calendarPinFormat);
      next();
    }, (err) => {

      if (err) return res.status(400).json({ success: false, err: "can't find mentor" });
      return res.status(200).json({ success: true, availableTimes: availableTimes });
    })
  })
}
