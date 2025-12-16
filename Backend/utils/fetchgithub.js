const axios = require("axios");
const normalize = require("./normalizeProfile");

async function fetchGitHub(username) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers: { "User-Agent": "Codify" } }
    );

    return normalize({
      platform: "github",
      username: data.login,
      profileUrl: data.html_url,
      avatar: data.avatar_url,
      extra: {
        repositories: data.public_repos,
        followers: data.followers,
        following: data.following
      }
    });

  } catch {
    return null;
  }
}

module.exports = fetchGitHub;
