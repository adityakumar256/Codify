const express = require("express");
const router = express.Router();

const {
  platformlogin,
  platformgetdata,
  verifyPlatform
} = require("../controller/platform");

const auth = require("../middleware/auth");

console.log("✅ platform router loaded");

router.post("/verify", auth, verifyPlatform);
router.post("/platlogin", auth, platformlogin);
router.get("/platdata", auth, platformgetdata);

module.exports = router;
