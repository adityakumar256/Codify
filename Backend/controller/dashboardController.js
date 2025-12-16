const Platform = require("../models/platform");
const normalizeDashboard = require("../utils/normalizeDashboard");
const normalizeProfile = require("../utils/normalizeProfile");

const fetchLeetCode = require("../utils/fetchLeetCode");
const fetchGFG = require("../utils/fetchGFG");
const fetchCodeChef = require("../utils/fetchCodchef");
const fetchCodeforces = require("../utils/fetchCodforces");
const fetchHackerRank = require("../utils/fetchhackerrank");
const fetchGitHub = require("../utils/fetchgithub");

const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    const platformDoc = await Platform.findOne({
      userId: user.userId,
    });

    if (!platformDoc) {
      return res.json(
        normalizeDashboard({
          user,
          profiles: [],
        })
      );
    }

    const profiles = [];

    // ✅ LEETCODE
    if (platformDoc.leetcode) {
      const raw = await fetchLeetCode(platformDoc.leetcode);
      if (raw) {
        profiles.push(
          normalizeProfile({
            platform: "leetcode",
            username: platformDoc.leetcode,
            profileUrl: `https://leetcode.com/${platformDoc.leetcode}`,
            stats: raw,
          })
        );
      }
    }

    // ✅ GFG
    if (platformDoc.gfg) {
      const raw = await fetchGFG(platformDoc.gfg);
      if (raw) {
        profiles.push(
          normalizeProfile({
            platform: "gfg",
            username: platformDoc.gfg,
            profileUrl: `https://auth.geeksforgeeks.org/user/${platformDoc.gfg}`,
            stats: raw,
          })
        );
      }
    }

    // ✅ CODECHEF
    if (platformDoc.codechef) {
      const raw = await fetchCodeChef(platformDoc.codechef);
      if (raw) {
        profiles.push(
          normalizeProfile({
            platform: "codechef",
            username: platformDoc.codechef,
            profileUrl: `https://www.codechef.com/users/${platformDoc.codechef}`,
            stats: raw,
          })
        );
      }
    }

    // ✅ CODEFORCES
    if (platformDoc.codeforces) {
      const raw = await fetchCodeforces(platformDoc.codeforces);
      if (raw) {
        profiles.push(
          normalizeProfile({
            platform: "codeforces",
            username: platformDoc.codeforces,
            profileUrl: `https://codeforces.com/profile/${platformDoc.codeforces}`,
            stats: raw,
          })
        );
      }
    }

    // ✅ HACKERRANK
    if (platformDoc.hackerrank) {
      const raw = await fetchHackerRank(platformDoc.hackerrank);
      if (raw) {
        profiles.push(
          normalizeProfile({
            platform: "hackerrank",
            username: platformDoc.hackerrank,
            profileUrl: `https://www.hackerrank.com/${platformDoc.hackerrank}`,
            stats: raw,
          })
        );
      }
    }

    // ✅ GITHUB (no totalSolved, but still normalized)
    if (platformDoc.github) {
      const raw = await fetchGitHub(platformDoc.github);
      if (raw) {
        profiles.push(
          normalizeProfile({
            platform: "github",
            username: platformDoc.github,
            profileUrl: `https://github.com/${platformDoc.github}`,
            extra: {
              repos: raw.public_repos,
              followers: raw.followers,
            },
          })
        );
      }
    }

    const dashboardData = normalizeDashboard({
      user,
      profiles,
    });

    return res.json(dashboardData);

  } catch (err) {
    console.error("🔥 Dashboard Error:", err);
    return res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
};

module.exports = { getDashboard };
