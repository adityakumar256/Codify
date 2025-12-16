const Platform = require("../models/platform")
const fetchLeetCode = require("../utils/fetchLeetCode")
const fetchGFG = require("../utils/fetchGfg")
const fetchCodeChef = require("../utils/fetchCodchef")
const fetchCodeforces = require("../utils/fetchCodforces")
const fetchHackerRank = require("../utils/fetchhackerrank")
const fetchGitHub = require("../utils/fetchgithub")
const fetchGithubReposCount = require("../utils/fetchGithubReposCount")
const normalizeProfile = require("../utils/normalizeProfile")

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId

    // ✅ YAHI MISSING THA
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
      const raw = await fetchCodeChef(doc.codechef)
      if (raw) {
        const p = normalizeProfile({
          platform: "codechef",
          username: doc.codechef,
          profileUrl: `https://www.codechef.com/users/${doc.codechef}`,
          stats: raw,
        })
        platforms.push(p)
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
      }
    }

    /* ========= HACKERRANK ========= */
    if (doc.hackerrank) {
      const raw = await fetchHackerRank(doc.hackerrank)
      if (raw) {
        const p = normalizeProfile({
          platform: "hackerrank",
          username: doc.hackerrank,
          profileUrl: `https://www.hackerrank.com/${doc.hackerrank}`,
          stats: raw,
        })
        platforms.push(p)
      }
    }

    /* ========= GITHUB ========= */
    if (doc.github) {
      const profile = await fetchGitHub(doc.github)
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
