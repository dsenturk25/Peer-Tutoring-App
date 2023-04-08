
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");
const Organization = require("../Organizations/organization");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const homeworkReviewSchema = mongoose.Schema({

  from: {
    type: mongoose.Types.ObjectId
  },

  to: {
    type: mongoose.Types.ObjectId
  },

  links: [
    link = {
      type: String
    }
  ],

  files: [
    file = {
      type: String
    }
  ],

  message: {
    type: String
  },

  stage: {
    type: String,
    enum: ["waiting", "rejected", "answered", "canceled"]
  },

  rejectMessage: {
    type: String
  },

  cancelMessage: {
    type: String
  },

  answerMessage: {
    type: String
  },

  answerAttachments: [
    answerAttachment = {
      type: String
    }
  ]
})


const HomeworkReview = mongoose.model("homeworkreview", homeworkReviewSchema);

module.exports = HomeworkReview;
