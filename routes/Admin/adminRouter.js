
const express = require("express");
const router = express.Router();

const isAdminLoggedIn = require("../../middleware/isAdminAuth");

const indexGetController = require("../../controllers/Admin/indexGet");
const loginGetController = require("../../controllers/Admin/loginGet");
const loginPostController = require("../../controllers/Admin/loginPost");
const createTutorPostController = require("../../controllers/Admin/createTutorPost");
const createStudentPostController = require("../../controllers/Admin/createStudentPost");

router.get(
  "/",
  isAdminLoggedIn,
  indexGetController
);

router.get(
  "/login",
  loginGetController
);

router.post(
  "/login",
  loginPostController
);

router.post(
  "/create/tutor",
  createTutorPostController
);

router.post(
  "/create/student",
  createStudentPostController
);

module.exports = router;
