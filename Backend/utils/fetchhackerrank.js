const axios = require("axios");
const cheerio = require("cheerio");

async function fetchHackerRank(username) {
  try {
    const url = `https://www.hackerrank.com/${username}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    const score = $(".profile-score").text().trim();

    return {
      rating: score || null
    };

  } catch {
    return null;
  }
}

module.exports = fetchHackerRank;
