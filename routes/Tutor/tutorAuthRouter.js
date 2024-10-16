
const express = require("express");
const router = express.Router();

router.use(express.json());

const isTutorLoggedIn = require("../../middleware/isTutorAuth.js");

const loginPostController = require("../../controllers/Tutor/Auth/loginPost");
const registerPostController = require("../../controllers/Tutor/Auth/registerPost.js");
const logoutPostController = require("../../controllers/Tutor/Auth/logoutPost.js");
const changePasswordPostController = require("../../controllers/Tutor/Auth/changePasswordPost.js");

router.post(
  "/register",  // register post controller
  registerPostController
);

router.post(
  "/login",  // login post controller
  loginPostController
);

router.post(
  "/logout",
  isTutorLoggedIn,
  logoutPostController
)

router.post(
  "/password/change",
  isTutorLoggedIn,
  changePasswordPostController
)


module.exports = router;
