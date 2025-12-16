const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    leetcode: String,
    leetcodeVerified: { type: Boolean, default: false },

    gfg: String,
    gfgVerified: { type: Boolean, default: false },

    codechef: String,
    codechefVerified: { type: Boolean, default: false },

    codeforces: String,
    codeforcesVerified: { type: Boolean, default: false },

    hackerrank: String,
    hackerrankVerified: { type: Boolean, default: false },

    github: String,
    githubVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Platform", platformSchema);
