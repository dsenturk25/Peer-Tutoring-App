
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");
const Organization = require("../Organizations/organization");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

const chatSchema = mongoose.Schema({

  sender: {
    type: mongoose.Types.ObjectId
  },

  message: {
    type: mongoose.Types.ObjectId
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
})

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
