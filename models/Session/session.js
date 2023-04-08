
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");
const Organization = require("../Organizations/organization");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const sessionSchema = mongoose.Schema({

  school: {
    type: String,
    trim: true,
    default: ""
  },

  tutor: {
    type: mongoose.Types.ObjectId
  },

  student: {
    type: mongoose.Types.ObjectId
  },

  date: {
    type: Date
  },

  startTime: {
    type: String
  },

  finishTime: {
    type: String
  },

  link: {
    type: String
  },

  studentReflection: {
    type: String
  },

  tutorReflection: {
    type: String
  },

  tutorApproval: {
    type: Boolean
  },

  studentApproval: {
    type: Boolean
  },

  cancelMessage: {
    type: String
  },

  rejectMessage: {
    type: String
  }
  ,
  stage: {
    type: String,
    enum: ["request", "progress", "completed", "rejected", "canceled"]
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

sessionSchema.statics.approveStudent = function (body, callback) {
  Session.findByIdAndUpdate(body.id, { studentApproval: true }, (err, session) => {
    if (err) return callback(err);
    if (session.studentApproval && session.tutorApproval) {
      session.stage = "progress";
      session.save();
    }
    return callback(null, session);
  })
}

sessionSchema.statics.approveTutor = function (body, callback) {
  Session.findByIdAndUpdate(body.id, { tutorApproval: true }, (err, session) => {
    if (err) return callback(err);
    if (session.studentApproval && session.tutorApproval) {
      session.stage = "progress";
      session.save();
    }
    return callback(null, session);
  })
}

sessionSchema.statics.markSessionAsComplete = function (body, callback) {
  Session.findByIdAndUpdate(body.sessionId, { stage: "completed" }, (err, session) => {
    if (err) return callback(err);
    return callback(session);
  })
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


sessionSchema.statics.rejectSession = function (body, callback) {
  Session.findByIdAndUpdate(body.sessionId, { stage: "rejected", rejectMessage: body.rejectMessage }, (err, session) => {
    if (err) return callback(err);
    return callback(null, session);
  })
}


const Session = mongoose.model("session", sessionSchema);

module.exports = Session;
