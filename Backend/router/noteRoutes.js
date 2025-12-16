const express = require("express")
const router = express.Router()

const {
  getAllNotes,
  createNote,
  incrementDownload,
} = require("../controller/noteController")

const auth = require("../middleware/auth")

// 📥 Get all notes (public OR auth – choose one)
router.get("/getnotes",auth, getAllNotes)
// router.get("/getnotes", auth, getAllNotes)

// 📤 Create note (admin / logged-in)
router.post("/createnotes", createNote);

// ⬇️ Download count +1 (user download)
router.patch("/download/:id", auth, incrementDownload)

module.exports = router
