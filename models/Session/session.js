
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const sessionSchema = mongoose.Schema({

  schoolId: {
    type: String,
    trim: true,
    default: ""
  },

  tutorId: {
    type: String
  },

  studentId: {
    type: String
  },

  date: {
    type: Date
  },

  startTime: {
    type: String
  },

  finishTime: {
    type: String,
    default: ""
  },

  studentReflection: {
    type: String,
    default: ""
  },

  cancelMessage: {
    type: String,
    default: ""
  },

  stage: {
    type: String,
    enum: ["ongoing", "completed", "canceled"],
    default: "ongoing"
  },

  rating: {
    type: Number,
  },

  canceledBy: {
    type: String,
    enum: ["tutor", "student"]
  },

  canceledAt: {
    type: Date
  },

  availableTimeId: {
    type: String
  }
})

sessionSchema.statics.createSession = function (body, callback) {

  const newSession = new Session(body);

  if (newSession) {
    newSession.save();
    return callback(null, newSession);
  }
  return callback("bad_request");
}

sessionSchema.statics.updateStudentReflection = function (body, callback) {
  Session.findByIdAndUpdate(body.sessionId, { studentReflection: body.studentReflection }, (err, session) => {
    if (err) return callback(err);
    return callback(session);
  })
}

sessionSchema.statics.updateTutorReflection = function (body, callback) {
  Session.findByIdAndUpdate(body.sessionId, { tutorReflection: body.tutorReflection }, (err, session) => {
    if (err) return callback(err);
    return callback(session);
  })
}



sessionSchema.statics.cancelSession = function (body, callback) {
  Session.findByIdAndUpdate(body.sessionId, { stage: "canceled", cancelMessage: body.cancelMessage }, (err, session) => {
    if (err) return callback(err);
    return callback(null, session);
  })
}

const Session = mongoose.model("session", sessionSchema);

module.exports = Session;
