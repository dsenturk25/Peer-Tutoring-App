
const Session = require("../../../models/Session/session");

module.exports = (req, res) => {

  if (!req.body.stage || (req.body.stage != "ongoing" && req.body.stage != "completed" && req.body.stage != "canceled")) return res.status(400).send({ success: false, err: "invalid session stage" });

  Session.findByIdAndUpdate(req.body.sessionId, { stage: req.body.stage }, (err, session) => {
    if (err) return res.status(400).send({ success: false, err: "error updating session" });
    return res.send({ success: true, session: session });
  })
}
