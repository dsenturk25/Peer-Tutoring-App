
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const HomeworkReview = require("../HomeworkReview/homeworkReview");
const { sendTutorConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const tutorSchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
  },

  surname: {
    type: String,
    trim: true,
  },

  profile_photo: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  school_number: {
    type: Number,
    trim: true,
    default: ""
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },

  school: {
    type: String,
    trim: true,
    default: ""
  },

  students: [
    tutor = {
      type: mongoose.Types.ObjectId
    }
  ],

  sessions: [
    session = {
      type: mongoose.Types.ObjectId
    }
  ],

  gender: {
    type: String,
    trim: true,
    enum: ["m", "f", "o"],
    default: "o"
  },

  class: {
    type: String,
    default: "0-0"
  },

  phone_number: {
    type: String,
    trim: true,
    default: ""
  },

  country: {
    type: String,
    trim: true,
    default: ""
  },

  city: {
    type: String,
    trim: true,
    default: ""
  },

  isAccountCompleted: {
    type: Boolean,
    default: false
  },

  isEmailConfirmed: {
    type: Boolean,
    default: false
  },

  confirmation_code: {
    type: Number,
  },

  rating: {
    type: Number,
    default: 0
  },

  link: {
    type: String,
    default: ""
  },

  subjects: [
    subject = {
      type: String
    }
  ],

  gpa: {
    type: Number
  },

  program: {
    type: String,
    enum: ["meb", "ib", "ap", ""],
    default: ""
  },

  availableTimes: [
    availableTime = {
      day: {
        type: String
      },
      startTime: {
        type: String
      },
      finishTime: {
        type: String
      },
      isAvailable: {
        type: Boolean
      }
    }
  ]
})


tutorSchema.statics.createTutor = function (body, callback) {

  Tutor.findOne({ email: body.email }).then(tutor => {
    if (tutor) return callback("email_not_unique", null);
  });

  const newTutor = new Tutor(body);

  if (newTutor) {

    newTutor.confirmation_code = createConfirmationCode();

    newTutor.save();
    sendTutorConfirmationEmail(newTutor);
    return callback(null, newTutor);
  }

  return callback("bad_request");
}

studentSchema.statics.loginTutor = function (body, callback) {

  Student.findOne({ email: body.email }).then(student => {
    if (!student) return callback("user_not_found");

    verifypassword(body.password, student.password, (res) => {
      if (res) return callback(null, student);

      return callback("verify_error", null);
    })
  });
}

tutorSchema.statics.findTutorById = function (body, callback) {

  Tutor.findById(mongoose.Types.ObjectId(body._id), (err, tutor) => {
    ;
    if (err || !tutor) return callback("user_not_found");
    callback(null, tutor);
  })

}

tutorSchema.statics.searchTutor = function (body, callback) {
  const targetTutors = [];

  tutorSchema.find({}, (err, tutors) => {
    if (err) return callback(err);
    async.timesSeries(tutors.length, (i, next) => {
      const tutor = tutors[i];

      delete tutor.password;
      delete tutor.students;
      delete tutor.link;
      delete tutor.confirmation_code;
      delete tutor.isAccountCompleted;
      delete tutor.isEmailConfirmed;
      delete tutor.isAccountCompleted;
      delete tutor.sessions;

      if (body.filter == "subject") {
        if ((tutor.name + " " + tutor.surname).includes(body.query)) {
          targetTutors.push(tutor);
          next();
        }
      } else if (body.filter == "subject") {
        if (tutor.subjects.includes(body.query)) {
          targetTutors.push(tutor);
          next();
        }
      } else if (body.filter == "rating") {
        if (tutor.rating < body.upperRatingBoundary && tutor.rating > body.lowerRatingBoundary) {
          targetTutors.push(tutor);
          next();
        }
      } else if (body.filter == "gpa") {
        if (tutor.rating < body.upperGpaBoundary && tutor.rating > body.lowerGpaBoundary) {
          targetTutors.push(tutor);
          next();
        }
      } else if (body.filter == "program") {
        if (tutor.program == body.query) {
          targetTutors.push(tutor);
          next();
        }
      } else if (body.filter == "all") {
        targetTutors.push(tutor);
        next();
      }
    }, (err) => {
      if (err) return callback(err);
      return callback(null, targetTutors);
    })
  })
}



tutorSchema.statics.sortTutors = function (body, callback) {

  Tutor.find({}).sort({ [body.filter]: [body.order] }).exec((err, tutors) => {
    if (err) return callback(err);
    return callback(null, tutors);
  });
}



tutorSchema.statics.updateAvailableTimes = function (body, callback) {
  Tutor.findByIdAndUpdate(body.id, { availableTimes: body.availableTimesArray }, (err, tutor) => {
    if (err) return callback(err);
    return callback(null, tutor);
  })
}



tutorSchema.statics.confirmEmail = function (body, callback) {

  Tutor.findById(body._id, (err, tutor) => {
    if (err || !tutor) return callback("verify_error");
    if (body.confirmation_code == tutor.confirmation_code.toString()) {
      tutor.isEmailConfirmed = true;
      tutor.save();
      return callback(null, tutor);
    } else return callback("verify_error");
  })

}



tutorSchema.statics.updateConfirmationCode = function (body, callback) {
  Tutor.findById(body._id, (err, tutor) => {
    if (err, !tutor) return callback("bad_request");
    tutor.confirmation_code = createConfirmationCode();
    tutor.save();
    sendTutorConfirmationEmail(tutor);
    return callback(null, tutor);
  })
}


tutorSchema.statics.rejectHomeworkRequest = function (body, callback) {
  HomeworkReview.findByIdAndUpdate(body.id, { stage: "rejected", rejectMessage: body.rejectMessage }, (err, homeworkRequest) => {
    if (err) return callback(err);
    return callback(null, homeworkRequest);
  })
}

tutorSchema.statics.answerHomeworkRequest = function (body, callback) {
  HomeworkReview.findByIdAndUpdate(body.id, {
    stage: "answered",
    answerMessage: body.answerMessage,
    answerAttachments: body.answerAttachments  // aws links
  })
}


tutorSchema.pre('save', hashpassword);

const Tutor = mongoose.model("tutor", tutorSchema);

module.exports = Tutor;
