
const express = require("express");
const router = express.Router();

router.use(express.json());

const isStudentLoggedIn = require("../../middleware/isStudentAuth");

const indexGetController = require("../../controllers/Student/Index/indexGet.js");
const loginGetController = require("../../controllers/Student/Index/loginGet.js");
const lessonsGetController = require("../../controllers/Student/Index/lessonsGet.js");
const schoolGetController = require("../../controllers/Student/Index/schoolGet.js");


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
  "/login",
  loginGetController
)

module.exports = router;
