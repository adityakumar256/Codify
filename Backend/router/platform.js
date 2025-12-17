const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const {
  savePlatform,
  getPlatform,
} = require("../controller/platform")

router.post("/save", auth, savePlatform)
router.get("/", auth, getPlatform)

module.exports = router
