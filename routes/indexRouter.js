
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/Index/indexGet");

router.get(
  "/",
  indexGetController
)

module.exports = router
