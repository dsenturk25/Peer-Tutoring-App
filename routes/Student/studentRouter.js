
const express = require("express");
const router = express.Router();

router.use(express.json());

const isStudentLoggedIn = require("../../middleware/isStudentAuth");

const indexGetController = require("../../controllers/Student/Index/indexGet.js");
const loginGetController = require("../../controllers/Student/Index/loginGet.js");
const lessonsGetController = require("../../controllers/Student/Index/lessonsGet.js");
const schoolGetController = require("../../controllers/Student/Index/schoolGet.js");
const tutorGetController = require("../../controllers/Student/Index/tutorGet.js");
const calendarPostController = require("../../controllers/Student/Index/calendarPost.js");
const calendarGetController = require("../../controllers/Student/Index/calendarGet.js");
const filterPostController = require("../../controllers/Student/Index/filterPost.js");


router.get(
  "/",  // index main page
  isStudentLoggedIn,
  indexGetController
);

router.get(
  "/lessons",  // index main page
  isStudentLoggedIn,
  lessonsGetController
);

router.get(
  "/school",
  isStudentLoggedIn,
  schoolGetController
)

router.get(
  "/tutor/personal",
  isStudentLoggedIn,
  tutorGetController
)

router.get(
  "/calendar",
  isStudentLoggedIn,
  calendarGetController
)

router.post(
  "/calendar",
  isStudentLoggedIn,
  calendarPostController
)

router.get(
  "/login",
  loginGetController
)

router.post(
  "/tutor/filter",
  isStudentLoggedIn,
  filterPostController
)

module.exports = router;
