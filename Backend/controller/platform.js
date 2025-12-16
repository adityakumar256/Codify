const fetchGfg = require("../utils/fetchGfg");
const fetchLeetCode = require("../utils/fetchLeetCode");
const fetchGithub = require("../utils/fetchGithub");
const fetchCodechef = require("../utils/fetchCodchef");
const fetchCodeforces = require("../utils/fetchCodforces");
const fetchHackerrank = require("../utils/fetchHackerrank");

const normalizeProfile = require("../utils/normalizeProfile");




/* ================= SAVE ================= */
const platformlogin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { leetcode, gfg, codechef, hackerrank, codeforces, github } = req.body;

    let platform = await Platform.findOne({ userId });
    if (!platform) platform = new Platform({ userId });

    if (leetcode && !platform.leetcodeVerified)
      return res.status(403).json({ message: "LeetCode not verified" });

    if (gfg && !platform.gfgVerified)
      return res.status(403).json({ message: "GFG not verified" });

    if (codechef && !platform.codechefVerified)
      return res.status(403).json({ message: "CodeChef not verified" });

    if (codeforces && !platform.codeforcesVerified)
      return res.status(403).json({ message: "Codeforces not verified" });

    if (hackerrank && !platform.hackerrankVerified)
      return res.status(403).json({ message: "HackerRank not verified" });

    if (github && !platform.githubVerified)
      return res.status(403).json({ message: "GitHub not verified" });

    platform.leetcode = leetcode ?? platform.leetcode;
    platform.gfg = gfg ?? platform.gfg;
    platform.codechef = codechef ?? platform.codechef;
    platform.hackerrank = hackerrank ?? platform.hackerrank;
    platform.codeforces = codeforces ?? platform.codeforces;
    platform.github = github ?? platform.github;

    await platform.save();
    res.json({ message: "Platform data saved successfully" });
  } catch (err) {
    console.error("platformlogin error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= FETCH (🔥 MAIN FIX) ================= */
const platformgetdata = async (req, res) => {
  try {
    const userId = req.user.userId;
    const doc = await Platform.findOne({ userId });

    if (!doc) {
      return res.json({ platforms: {}, totalQuestions: 0 });
    }

    const platforms = {};
    let totalQuestions = 0;

    /* ========= LEETCODE ========= */
    if (doc.leetcode) {
      const raw = await fetchLeetCode(doc.leetcode);
      if (raw) {
        const d = normalizeProfile({
          platform: "leetcode",
          username: doc.leetcode,
          profileUrl: `https://leetcode.com/${doc.leetcode}`,
          stats: raw,
        });
        platforms.leetcode = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    /* ========= GFG ========= */
    if (doc.gfg) {
      const raw = await fetchGFG(doc.gfg);
      if (raw) {
        const d = normalizeProfile({
          platform: "gfg",
          username: doc.gfg,
          profileUrl: `https://auth.geeksforgeeks.org/user/${doc.gfg}`,
          stats: raw,
        });
        platforms.gfg = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    /* ========= CODECHEF ========= */
    if (doc.codechef) {
      const raw = await fetchCodechef(doc.codechef);
      if (raw) {
        const d = normalizeProfile({
          platform: "codechef",
          username: doc.codechef,
          profileUrl: `https://www.codechef.com/users/${doc.codechef}`,
          stats: raw,
        });
        platforms.codechef = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    /* ========= CODEFORCES ========= */
    if (doc.codeforces) {
      const raw = await fetchCodeforces(doc.codeforces);
      if (raw) {
        const d = normalizeProfile({
          platform: "codeforces",
          username: doc.codeforces,
          profileUrl: `https://codeforces.com/profile/${doc.codeforces}`,
          stats: raw,
        });
        platforms.codeforces = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    /* ========= HACKERRANK ========= */
    if (doc.hackerrank) {
      const raw = await fetchhackerrank(doc.hackerrank);
      if (raw) {
        const d = normalizeProfile({
          platform: "hackerrank",
          username: doc.hackerrank,
          profileUrl: `https://www.hackerrank.com/${doc.hackerrank}`,
          stats: raw,
        });
        platforms.hackerrank = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    /* ========= GITHUB ========= */
  if (doc.github) {
  const raw = await fetchGitHub(doc.github);
  if (raw) {
    const d = normalizeProfile({
      platform: "github",
      username: raw.username,
      profileUrl: raw.profile.url,
      avatar: raw.profile.avatar,
      extra: {
        repositories: raw.extra.repositories,
        followers: raw.extra.followers,
        following: raw.extra.following,
      }
    });

    platforms.github = d;
  }
}

    return res.json({ platforms, totalQuestions });

  } catch (err) {
    console.error("platdata error:", err);
    res.status(500).json({ message: "Platform data fetch failed" });
  }
};









/* ================= VERIFY ================= */
const verifyPlatform = async (req, res) => {
  const { platform } = req.body;

  let doc = await Platform.findOne({ userId: req.user.userId });
  if (!doc) doc = new Platform({ userId: req.user.userId });

  doc[`${platform}Verified`] = true;
  await doc.save();

  res.json({ valid: true });
};

/* ================= EXPORT ================= */
module.exports = {
  platformlogin,
  platformgetdata,
  verifyPlatform,
};
