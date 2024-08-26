
const Session = require("../../../models/Session/session");
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");

module.exports = (req, res) => {

  Session.findByIdAndUpdate(req.body.sessionId, {
    stage: "canceled",
    cancelMessage: req.body.cancelMessage,
    canceledBy: req.body.canceledBy,
    canceledAt: Date.now()
  }, (err, session) => {
    if (err) return res.status(400).send({ success: false, err: "session cancel error" });

    Tutor.findById(session.tutorId, (err, tutor) => {
      if (err) return res.status(400).send({ success: false, err: "session cancel error" });

      async.timesSeries(tutor.availableTimes.length, (i, next) => {
        const eachAvailableTime = tutor.availableTimes[i];

        if (eachAvailableTime && (eachAvailableTime._id == session.availableTimeId) && !eachAvailableTime.isAvailable) {
          eachAvailableTime.isAvailable = true;
        }
        next();
      }, (err) => {
        if (err) return res.status(400).send({ success: false, err: "session cancel error" });

        tutor.save();
        return res.send({ success: true, tutor: tutor });
      })
    })
  })
}
