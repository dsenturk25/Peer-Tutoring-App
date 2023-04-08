
const AWS = require('aws-sdk');
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_ID
});

function uploadImage(file, callback) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const url = data.Location;
      console.log(`File uploaded successfully. URL: ${url}`);
      callback(null, url);
    }
  });
}

module.exports = { uploadImage }