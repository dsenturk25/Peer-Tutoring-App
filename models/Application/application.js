
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const applicationSchema = mongoose.Schema({

  from: {
    type: mongoose.Types.ObjectId  // student
  },

  to: {
    type: mongoose.Types.ObjectId  // tutor
  },

  problem: {
    type: String
  },

  goal: {
    type: String
  },

  subject: {
    type: String
  },

  isApproved: {
    type: String,
    enum: ["waiting", "approved", "rejected"],
    default: "waiting"
  },

  rejectMessage: {
    type: String
  }
})

applicationSchema.statics.createApplication = function (body, callback) {
  Application.findOne({ from: body.from, to: body.to, subject: body.subject }).then(application => {
    if (application) return callback("you_already_applied", null);
  });

  const newApplication = new Application(body);

  if (newApplication) {
    newApplication.save();
    return callback(null, newApplication);
  }

  return callback("bad_request");
}

applicationSchema.statics.rejectApplication = function (body, callback) {
  Application.findByIdAndUpdate(body.sessionId, { isApproved: "rejected", rejectMessage: body.rejectMessage }, (err, application) => {
    if (err) return callback(err);
    return callback(null, application);
  })
}

applicationSchema.statics.approveApplication = function (body, callback) {
  Application.findByIdAndUpdate(body.sessionId, { isApproved: "approved" }, (err, application) => {
    if (err) return callback(err);
    return callback(null, application);
  })
}

const Application = mongoose.model("application", applicationSchema);

module.exports = Application;
