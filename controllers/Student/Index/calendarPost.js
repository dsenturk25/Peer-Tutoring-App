
const Session = require("../../../models/Session/session");
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");

module.exports = (req, res) => {
  
  Session.find({ studentId: req.session.student._id }, (err, sessions) => {
    if (err) return res.status(400).send({ success: false, err: "bad_request" });
    
    const calendarData = [];

    async.timesSeries(sessions.length, (i, next) => {
      const eachSession = sessions[i];
      
      Tutor.findById(eachSession.tutorId, (err, tutor) => {
        if (err) return res.status(400).send({ success: false, err: "bad_request" });

        const calendarPinFormat = {
          id: eachSession._id,
          title: `w/ ${tutor.name} ${eachSession.stage}`,
          start: new Date((eachSession.date.toString()).replace("03:00:00", eachSession.startTime)),
          end: new Date((eachSession.date.toString()).replace("03:00:00", eachSession.finishTime)),
          backgroundColor: `${eachSession.stage == "ongoing" ? "lightblue" : eachSession.stage == "completed" ? "lightgreen" : eachSession.stage == "canceled" ? "lightcoral" : ""}`,
          extendedProps: {
            tutor: tutor,
            session: eachSession
          }
        }

        calendarData.push(calendarPinFormat);
        next();
      })
    }, (err) => {
      if (err) return res.status(400).send({ success: false, err: "bad_request" });

      return res.send({ success: true, calendarData: calendarData })
    })
  })
}
