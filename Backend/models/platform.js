const mongoose = require("mongoose")

const platformSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    leetcode: {
      username: String,
      totalSolved: Number,
      easy: Number,
      medium: Number,
      hard: Number,
      rating: Number,
      profileUrl: String,
      lastUpdated: Date,
    },

    gfg: {
      username: String,
      solved: Number,
      instituteRank: Number,
      score: Number,
      profileUrl: String,
      lastUpdated: Date,
    },

    codechef: {
      username: String,
      rating: Number,
      stars: String,
      profileUrl: String,
      lastUpdated: Date,
    },

    codeforces: {
      username: String,
      rating: Number,
      maxRating: Number,
      rank: String,
      profileUrl: String,
      lastUpdated: Date,
    },

    github: {
      username: String,
      repos: Number,
      followers: Number,
      following: Number,
      profileUrl: String,
      lastUpdated: Date,
    },

    hackerrank: {
      username: String,
      badges: Number,
      stars: Number,
      profileUrl: String,
      lastUpdated: Date,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Platform", platformSchema)
