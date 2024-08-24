
const Tutor = require("../../../models/Tutor/tutor");
const { uploadImageToAws } = require("../../../utils/uploadImageToAws");
const fs = require("fs");

module.exports = (req, res) => {
  
  // upload to aws
  const filename = req.file.filename;
  const filemimetype = req.file.mimetype;
  const destination = "../../../uploads/" + filename;
  
  const imageSrc = fs.readFileSync(req.file.destination + req.file.filename);

  uploadImageToAws(imageSrc, filename, filemimetype).then((data) => {

    if (data) {
      Tutor.findByIdAndUpdate(req.session.tutor._id, { profile_photo: filename }, (err, tutor) => {

        fs.unlink(destination, (err, file) => {
          if (err) return res.send({ success: false, err: "can't update photo" });
          return res.send({ success: true, tutor: tutor });  
        })
      })
    }
  })
}
