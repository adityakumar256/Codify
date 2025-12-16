const axios = require("axios");
const cheerio = require("cheerio");

async function fetchHackerRank(username) {
  try {
    const url = `https://www.hackerrank.com/${username}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);

    // ✅ Profile score (if available)
    const score = $(".profile-score").text().trim() || null;

    // ✅ Badges
    const badges = [];
    $(".badge-title").each((i, el) => {
      badges.push($(el).text().trim());
    });

    return { rating: score, badges };
  } catch (err) {
    console.error("HackerRank fetch error:", err.message);
    return null;
  }
}

module.exports = fetchHackerRank;