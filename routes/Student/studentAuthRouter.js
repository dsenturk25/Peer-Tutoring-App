
const express = require("express");
const router = express.Router();

router.use(express.json());

const loginPostController = require("../../controllers/Student/Auth/loginPost");

router.get(
  "/edit-profile"  // edit profile get controller
);

router.post(
  "/edit-profile",  // edit profile post controller
)

router.post(
  "/logout",  // logout post controller
)

router.post(
  "/login",  // login post controller
  loginPostController
);


module.exports = router;
