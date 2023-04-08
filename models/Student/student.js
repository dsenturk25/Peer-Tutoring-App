
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Application = require("../Application/application");
const Tutor = require("../Tutor/tutor");
const HomeworkReview = require("../HomeworkReview/homeworkReview");
const Session = require("../Session/session");
const { sendStudentConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const studentSchema = mongoose.Schema({

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

  tutors: [
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
})

studentSchema.statics.createStudent = function (body, callback) {

  Student.findOne({ email: body.email }).then(student => {
    if (student) return callback("email_not_unique", null);
  });

  const newStudent = new Student(body);

  if (newStudent) {

    newStudent.confirmation_code = createConfirmationCode();

    newStudent.save();
    sendStudentConfirmationEmail(newStudent);
    return callback(null, newStudent);
  }

  return callback("bad_request");
}

studentSchema.statics.loginStudent = function (body, callback) {

  Student.findOne({ email: body.email }).then(student => {
    if (!student) return callback("user_not_found");

    verifypassword(body.password, student.password, (res) => {
      if (res) return callback(null, student);

      return callback("verify_error", null);
    })
  });
}

studentSchema.statics.findStudentById = function (body, callback) {

  Student.findById(mongoose.Types.ObjectId(body._id), (err, student) => {
    ;
    if (err || !student) return callback("user_not_found");
    callback(null, student);
  })

}

studentSchema.statics.sendApplication = function (body, callback) {
  Application.createApplication(body, (err, application) => {
    if (err) return callback(err);
    return callback(null, application);
  })
}



studentSchema.statics.sendSessionRequest = function (body, callback) {
  Session.createSession(body, (err, session) => {
    if (err) return callback(err);
    return callback(null, session);
  })
}

studentSchema.statics.getMyTutors = function (body, callback) {
  const tutors = [];
  Student.findById(body.id, (err, student) => {
    if (err) return callback(err);

    async.timesSeries(student.tutors.length, (i, next) => {
      const tutorId = student.tutors[i];
      Tutor.findById(tutorId, (err, tutor) => {
        if (err) return callback(err);
        delete tutor.password;
        delete tutor.students;
        tutors.push(tutor);
        next();
      })
    }, (err) => {
      if (err) return callback(err);
      return callback(err, tutors);
    })
  })
}



studentSchema.statics.getMyStudents = function (body, callback) {
  const students = [];
  Tutor.findById(body.id, (err, tutor) => {
    if (err) return callback(err);

    async.timesSeries(tutor.students.length, (i, next) => {
      const studentId = tutor.students[i];
      Student.findById(studentId, (err, student) => {
        if (err) return callback(err);
        delete student.password;
        delete student.tutors;
        students.push(student);
        next();
      })
    }, (err) => {
      if (err) return callback(err);
      return callback(err, students);
    })
  })
}



studentSchema.statics.confirmEmail = function (body, callback) {

  Student.findById(body._id, (err, student) => {
    if (err || !student) return callback("verify_error");
    if (body.confirmation_code == student.confirmation_code.toString()) {
      student.isEmailConfirmed = true;
      student.save();
      return callback(null, student);
    } else return callback("verify_error");
  })

}



studentSchema.statics.updateConfirmationCode = function (body, callback) {
  Student.findById(body._id, (err, student) => {
    if (err, !student) return callback("bad_request");
    student.confirmation_code = createConfirmationCode();
    student.save();
    sendStudentConfirmationEmail(student);
    return callback(null, student);
  })
}


studentSchema.statics.createHomeworkReviewRequest = function (body, callback) {

  const newHomeworkReviewRequest = new HomeworkReview(body);

  if (newHomeworkReviewRequest) {
    newHomeworkReviewRequest.save();
    return callback(null, newHomeworkReviewRequest);
  }
  return callback("bad_request");
}


studentSchema.statics.cancelHomeworkReviewRequest = function (body, callback) {
  HomeworkReview.findByIdAndUpdate(body.id, { stage: "canceled", cancelMessage: body.cancelMessage }, (err, homeworkReview) => {
    if (err) return callback(err);
    return callback(null, homeworkReview);
  })
}



studentSchema.pre('save', hashpassword);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
