const axios = require("axios");
const cheerio = require("cheerio");

async function fetchCodeChef(username) {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);

    return {
      rating: $(".rating-number").text().trim() || null,
      rank: $(".rating-ranks li strong").first().text().trim() || null,
    };

  } catch {
    return null;
  }
}

module.exports = fetchCodeChef;
