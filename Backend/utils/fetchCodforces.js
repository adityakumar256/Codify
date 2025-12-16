const axios = require("axios");

async function fetchCodeforces(username) {
  try {
    const { data } = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );

    if (data.status !== "OK") return null;
    const user = data.result[0];

    return {
      rating: user.rating || null,
      rank: user.rank || null,
    };

  } catch {
    return null;
  }
}

module.exports = fetchCodeforces;
