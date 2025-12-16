const Note = require("../models/Note")

/* =========================
   📥 GET ALL NOTES
   (Frontend ke liye)
========================= */
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })

    // frontend expects { notes: [] }
    res.status(200).json({ notes })
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch notes",
    })
  }
}

/* =========================
   📤 CREATE NOTE
   (Admin use)
========================= */
exports.createNote = async (req, res) => {
  try {
    // note create hote hi
    // downloads automatically = 0 (schema default)
    const note = await Note.create(req.body)

    res.status(201).json({
      success: true,
      note,
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      message: "Invalid note data",
    })
  }
}

/* =========================
   ⬇️ DOWNLOAD COUNT +1
   (User jab download kare)
========================= */
exports.incrementDownload = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } }, // 👈 yahin count badhta hai
      { new: true }
    )

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.status(200).json({
      success: true,
      downloads: note.downloads,
      pdfUrl: note.pdfUrl,
    })
  } catch (err) {
    res.status(400).json({
      message: "Download failed",
    })
  }
}
