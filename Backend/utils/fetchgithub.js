const axios = require("axios");

async function fetchGitHub(username) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          "User-Agent": "Codify",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return {
      avatar: data.avatar_url,
      repositories: data.public_repos,
      followers: data.followers,
      following: data.following,
    };
  } catch (err) {
    console.error(
      "GitHub fetch error:",
      err.response?.status,
      err.response?.data
    );
    return null;
  }
}

module.exports = fetchGitHub;
