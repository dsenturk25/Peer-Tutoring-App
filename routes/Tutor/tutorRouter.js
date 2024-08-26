
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

router.use(express.json());

const isTutorLoggedIn = require("../../middleware/isTutorAuth.js");

const indexGetController = require("../../controllers/Tutor/Index/indexGet.js");
const loginGetController = require("../../controllers/Tutor/Index/loginGet.js");
const loginPostController = require("../../controllers/Tutor/Auth/loginPost.js");
const profileGetController = require("../../controllers/Tutor/Index/profileGet.js");
const openSlotGetController = require("../../controllers/Tutor/Index/openSlotGet.js")
const openSlotPostController = require("../../controllers/Tutor/Index/openSlotPost.js")
const schoolPostController = require("../../controllers/Tutor/Index/schoolGet.js");
const deleteSlotPostController = require("../../controllers/Tutor/Index/deleteSlotPost.js");

const editBioPostController = require("../../controllers/Tutor/edit/editBioPost.js");
const editPhotoPostController = require("../../controllers/Tutor/edit/editPhotoPost.js");
const editSubjectsPostController = require("../../controllers/Tutor/edit/editSubjectsPost.js");
const editProgramPostController = require("../../controllers/Tutor/edit/editProgramPost.js");
const editLinkPostController = require("../../controllers/Tutor/edit/editLinkPost.js");
const lessonsGetController = require("../../controllers/Tutor/Index/mySessionsGet.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
  }
});

const upload = multer({ storage: storage });

router.get(
  "/",
  isTutorLoggedIn,
  indexGetController
)

router.get(
  "/profile",
  isTutorLoggedIn,
  profileGetController
)

router.get(
  "/slot",
  isTutorLoggedIn,
  openSlotGetController
)

router.get(
  "/lessons",
  isTutorLoggedIn,
  lessonsGetController
)

router.get(
  "/school",
  isTutorLoggedIn,
  schoolPostController
)

router.get(
  "/login",
  loginGetController
)

router.post(
  "/login",
  loginPostController
)

router.post(
  "/slot/open",
  isTutorLoggedIn,
  openSlotPostController
)

router.post(
  "/slot/delete",
  isTutorLoggedIn,
  deleteSlotPostController
)

router.post(
  "/edit/bio",
  isTutorLoggedIn,
  editBioPostController
)

router.post(
  "/edit/program",
  isTutorLoggedIn,
  editProgramPostController
)

router.post(
  "/edit/link",
  isTutorLoggedIn,
  editLinkPostController
)

router.post(
  "/edit/photo",
  isTutorLoggedIn,
  upload.single("file"),
  editPhotoPostController
)

router.post(
  "/edit/subjects",
  isTutorLoggedIn,
  editSubjectsPostController
)

module.exports = router;
