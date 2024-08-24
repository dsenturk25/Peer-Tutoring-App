
const Session = require("../../../models/Session/session");
const Tutor = require("../../../models/Tutor/tutor");
const async = require("async");

module.exports = (req, res) => {

  Session.findByIdAndUpdate(req.body.sessionId, {
    studentReflection: req.body.feedbackText,
    rating: req.body.rating
  }, (err, session) => {
    if (err) return res.status(400).send({ success: false, err: "can't update" });
    Session.find({ tutorId: session.tutorId }, (err, sessions) => {
      if (err) return res.status(400).send({ success: false, err: "can't get all sessions" });

      let totalSessionIncludedIntoCount = 0;
      let sumOfRatingsOfIncludedSessions = 0;

      async.timesSeries(sessions.length, (i, next) => {
        const eachSession = sessions[i];
        
        if (eachSession.stage == "completed" && eachSession.rating && eachSession.studentReflection) {
          sumOfRatingsOfIncludedSessions += parseFloat(eachSession.rating);
          totalSessionIncludedIntoCount++;
          next();
        } else {
          next();
        }
      }, (err) => {
        if (err) return res.status(400).send({ success: false, err: "can't calculate rating" });

        const tutorAverageRating = sumOfRatingsOfIncludedSessions / totalSessionIncludedIntoCount;
        
        Tutor.findByIdAndUpdate(session.tutorId, { rating: tutorAverageRating }, (err, tutor) => {
          if (err) return res.status(400).send({ success: false, err: "can't find tutor" });
          if (!err && tutor) return res.status(201).send({ success: true,  })
        })
      })
    })
  })
}
