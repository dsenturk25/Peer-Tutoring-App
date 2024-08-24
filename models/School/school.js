
const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({

  name: {
    type: String
  },

  corporate_email: {
    type: String
  },

  address: {
    type: String
  },

  password: {
    type: String
  },

  country: {
    type: String,
    default: "Türkiye"
  },

  city: {
    type: String
  },

  profile_image: {
    type: String
  },

  banner_image: {
    type: String
  },

  external_links: []
})

schoolSchema.statics.loginAdmin = function (body, callback) {
  School.findOne({ corporate_email: body.email, password: body.password }, (err, school) => {
    if (!school || err) return callback("verify_error");
    return callback(null, school);
  })
}

const School = mongoose.model("school", schoolSchema);

module.exports = School;
