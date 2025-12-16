const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    pages: { type: Number, required: true },
    downloads: { type: Number, default: 0 },
    trending: { type: Boolean, default: false },

    pdfUrl: { type: String, required: true },

    // ✅ Preview / Thumbnail
    previewImage: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Note", noteSchema)
