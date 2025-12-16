const Platform = require("../models/platform");

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
    let platform = await Platform.findOne({ userId });
    if (!platform) platform = new Platform({ userId });

    Object.assign(platform, req.body);
    await platform.save();

    res.json({ message: "Platform data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= FETCH ================= */
const platformgetdata = async (req, res) => {
  try {
    const userId = req.user.userId;
    const doc = await Platform.findOne({ userId });

    if (!doc) return res.json({ platforms: {}, totalQuestions: 0 });

    const platforms = {};
    let totalQuestions = 0;

    if (doc.leetcode) {
      const raw = await fetchLeetCode(doc.leetcode);
      if (raw) {
        const d = normalizeProfile({
          platform: "leetcode",
          username: doc.leetcode,
          stats: raw,
        });
        platforms.leetcode = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    if (doc.codechef) {
      const raw = await fetchCodechef(doc.codechef);
      if (raw) {
        const d = normalizeProfile({
          platform: "codechef",
          username: doc.codechef,
          stats: raw,
        });
        platforms.codechef = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    if (doc.hackerrank) {
      const raw = await fetchHackerrank(doc.hackerrank);
      if (raw) {
        const d = normalizeProfile({
          platform: "hackerrank",
          username: doc.hackerrank,
          stats: raw,
        });
        platforms.hackerrank = d;
        totalQuestions += d.stats.totalSolved;
      }
    }

    if (doc.github) {
      const raw = await fetchGithub(doc.github);
      if (raw) {
        const d = normalizeProfile({
          platform: "github",
          username: doc.github,
          extra: raw,
        });
        platforms.github = d;
      }
    }

    res.json({ platforms, totalQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Platform data fetch failed" });
  }
};

/* ================= VERIFY ================= */
const verifyPlatform = async (req, res) => {
  const { platform } = req.body;
  const userId = req.user.userId;

  let doc = await Platform.findOne({ userId });
  if (!doc) doc = new Platform({ userId });

  doc[`${platform}Verified`] = true;
  await doc.save();

  res.json({ valid: true });
};

module.exports = {
  platformlogin,
  platformgetdata,
  verifyPlatform,
};
