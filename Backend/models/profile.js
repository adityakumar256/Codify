const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    photo: String,
    name: String,
    email: String,

    college: String,
    course: String,
    branch: String,
    year: String,
    contact: String,
    description: String,

    // 🔹 SOCIAL LINKS (NEW)
    linkedinUrl: {
      type: String,
      default: "",
    },
    facebookUrl: {
      type: String,
      default: "",
    },
    instagramUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
