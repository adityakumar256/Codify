const Platform = require("../models/platform")

const fetchLeetCode = require("../utils/fetchLeetCode")
const fetchGfg = require("../utils/fetchGfg")
const fetchCodechef = require("../utils/fetchCodchef")
const fetchCodeforces = require("../utils/fetchCodforces")
const fetchHackerrank = require("../utils/fetchHackerrank")
const fetchGithub = require("../utils/fetchGithub")
const fetchGithubReposCount = require("../utils/fetchGithubReposCount")

const normalizeProfile = require("../utils/normalizeProfile")

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId
    const doc = await Platform.findOne({ userId })

    if (!doc) {
      return res.json({
        user: req.user,
        totalSolved: 0,
        platforms: [],
      })
    }

    const platforms = []
    let totalSolved = 0

    /* ========= LEETCODE ========= */
    if (doc.leetcode) {
      const raw = await fetchLeetCode(doc.leetcode)
      if (raw) {
        const p = normalizeProfile({
          platform: "leetcode",
          username: doc.leetcode,
          profileUrl: `https://leetcode.com/${doc.leetcode}`,
          stats: raw,
        })
        platforms.push(p)
        totalSolved += p.stats.totalSolved || 0
      }
    }

    /* ========= CODECHEF ========= */
    if (doc.codechef) {
      const raw = await fetchCodechef(doc.codechef)   // ✅ FIXED
      if (raw) {
        const p = normalizeProfile({
          platform: "codechef",
          username: doc.codechef,
          profileUrl: `https://www.codechef.com/users/${doc.codechef}`,
          stats: raw,
        })
        platforms.push(p)
        totalSolved += p.stats.totalSolved || 0
      }
    }

    /* ========= CODEFORCES ========= */
    if (doc.codeforces) {
      const raw = await fetchCodeforces(doc.codeforces)
      if (raw) {
        const p = normalizeProfile({
          platform: "codeforces",
          username: doc.codeforces,
          profileUrl: `https://codeforces.com/profile/${doc.codeforces}`,
          stats: raw,
        })
        platforms.push(p)
        totalSolved += p.stats.totalSolved || 0
      }
    }

    /* ========= HACKERRANK ========= */
    if (doc.hackerrank) {
      const raw = await fetchHackerrank(doc.hackerrank) // ✅ FIXED
      if (raw) {
        const p = normalizeProfile({
          platform: "hackerrank",
          username: doc.hackerrank,
          profileUrl: `https://www.hackerrank.com/${doc.hackerrank}`,
          stats: raw,
        })
        platforms.push(p)
        totalSolved += p.stats.totalSolved || 0
      }
    }

    /* ========= GITHUB ========= */
    if (doc.github) {
      const profile = await fetchGithub(doc.github)     // ✅ FIXED
      const repos = await fetchGithubReposCount(doc.github)

      const p = normalizeProfile({
        platform: "github",
        username: doc.github,
        profileUrl: `https://github.com/${doc.github}`,
        extra: {
          repositories: repos,
          followers: profile?.followers ?? null,
          following: profile?.following ?? null,
        },
      })

      platforms.push(p)
    }

    return res.json({
      user: req.user,
      totalSolved,
      platforms,
    })
  } catch (err) {
    console.error("Dashboard Error:", err)
    res.status(500).json({ message: "Dashboard failed" })
  }
}

module.exports = { getDashboard }
