const axios = require("axios");

async function fetchGitHub(username) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers: { "User-Agent": "Codify" } }
    );

    return {
      avatar: data.avatar_url,
      repositories: data.public_repos,
      followers: data.followers,
      following: data.following,
    };

  } catch {
    return null;
  }
}

module.exports = fetchGitHub;
