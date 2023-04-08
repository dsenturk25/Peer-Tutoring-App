
const express = require("express");
const router = express.Router();

router.use(express.json());


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
  "/register",  // register post controller
);

router.post(
  "/login",  // login post controller
);

router.get(
  "/email_confirm"  // email_confirm get controller frontend
)

router.post(
  "/auth/email_confirm"  // email_confirm post controller backend
)

router.get(
  "/complete_account"  // complete_account get controller frontend
)

router.post(
  "/complete_account"  // complete_account post controller frontend
)

router.post(
  "/auth/resend_code"  // resend_code post controller frontend
)

module.exports = router;
