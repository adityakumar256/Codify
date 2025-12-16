const express = require("express");
const router = express.Router();

const { saveProfile, getProfile } = require("../controller/profile");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// 🔹 SAVE / UPDATE PROFILE (with photo)
router.post("/save", auth, upload.single("photo"), saveProfile);

// 🔹 GET PROFILE
router.get("/get", auth, getProfile);

module.exports = router;
