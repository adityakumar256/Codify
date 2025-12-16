const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controller/dashboardController");
const auth = require("../middleware/auth");

// 👇 yahan "/" rakho
router.get("/", auth, getDashboard);

module.exports = router;
