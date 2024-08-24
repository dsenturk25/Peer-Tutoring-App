
const express = require("express");
const router = express.Router();

const isStudentLoggedIn = require("../../middleware/isStudentAuth");
const isTutorLoggedIn = require("../../middleware/isTutorAuth");

const createPostController = require("../../controllers/Session/create/post");
const editStagePostController = require("../../controllers/Session/update/stagePost");
const cancelPostController = require("../../controllers/Session/update/cancelPost");
const giveFeedbackController = require("../../controllers/Session/update/giveFeedbackPost.js");

router.post(
  "/create",
  isStudentLoggedIn,
  createPostController
)

router.post(
  "/edit/stage/tutor",
  isTutorLoggedIn,
  editStagePostController
)

router.post(
  "/edit/stage/student",
  isStudentLoggedIn,
  editStagePostController
)

router.post(
  "/edit/cancel/tutor",
  isTutorLoggedIn,
  cancelPostController
)

router.post(
  "/edit/cancel/student",
  isStudentLoggedIn,
  cancelPostController
)

router.post(
  "/edit/give-feedback",
  isStudentLoggedIn,
  giveFeedbackController
)

module.exports = router;
