const axios = require("axios");
const cheerio = require("cheerio");

async function fetchCodeChef(username) {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);

    const rating = $(".rating-number").text().trim() || null;
    const rank = $(".rating-ranks li strong").first().text().trim() || null;

    // ✅ Solved problems count (update selector if needed)
    let totalSolved = 0;
    $(".problem-solved").each((i, el) => {
      const text = $(el).text().trim();
      const match = text.match(/\d+/);
      if (match) totalSolved = parseInt(match[0], 10);
    });

    return { rating, rank, totalSolved };
  } catch (err) {
    console.error("CodeChef fetch error:", err.message);
    return null;
  }
}

module.exports = fetchCodeChef;