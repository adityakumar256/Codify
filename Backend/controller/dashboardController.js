const Platform = require("../models/platform")

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId

    const doc = await Platform.findOne({ userId })

    if (!doc) {
      return res.json({
        user: req.user,
        totalSolved: 0,
        platforms: {},
      })
    }

    const platforms = {}
    let totalSolved = 0

    /* ========= LEETCODE ========= */
    if (doc.leetcode?.username) {
      platforms.leetcode = {
        platform: "leetcode",
        ...doc.leetcode,
      }
      totalSolved += doc.leetcode.totalSolved || 0
    }

    /* ========= GFG ========= */
    if (doc.gfg?.username) {
      platforms.gfg = {
        platform: "gfg",
        ...doc.gfg,
      }
    }

    /* ========= CODECHEF ========= */
    if (doc.codechef?.username) {
      platforms.codechef = {
        platform: "codechef",
        ...doc.codechef,
      }
    }

    /* ========= CODEFORCES ========= */
    if (doc.codeforces?.username) {
      platforms.codeforces = {
        platform: "codeforces",
        ...doc.codeforces,
      }
    }

    /* ========= GITHUB ========= */
    if (doc.github?.username) {
      platforms.github = {
        platform: "github",
        ...doc.github,
      }
    }

    /* ========= HACKERRANK ========= */
    if (doc.hackerrank?.username) {
      platforms.hackerrank = {
        platform: "hackerrank",
        ...doc.hackerrank,
      }
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
