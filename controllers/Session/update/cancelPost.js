
const Session = require("../../../models/Session/session");

module.exports = (req, res) => {

  Session.findByIdAndUpdate(req.body.sessionId, {
    stage: "canceled",
    cancelMessage: req.body.cancelMessage,
    canceledBy: req.body.canceledBy,
    canceledAt: Date.now()
  }, (err, session) => {
    if (err) return res.status(400).send({ success: false, err: "session cancel error" });
    return res.send({ success: true, session: session });
  })
}
