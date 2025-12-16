// utils/fetchGithubReposCount.js
const axios = require("axios");

async function fetchGithubReposCount(username) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          "User-Agent": "Codify",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return data.length; // 👈 total visible repos (30)
  } catch (err) {
    console.error("Repo list fetch error:", err.message);
    return 0;
  }
}

module.exports = fetchGithubReposCount;
