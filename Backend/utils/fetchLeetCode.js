const axios = require("axios");

async function fetchLeetCode(username) {
  try {
    const query = `
      query user($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const res = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username } },
      { headers: { "Content-Type": "application/json" } }
    );

    const stats = res.data.data?.matchedUser?.submitStats?.acSubmissionNum;
    if (!stats) return null;

    return {
      totalSolved: stats[0].count,
      easy: stats[1].count,
      medium: stats[2].count,
      hard: stats[3].count,
    };

  } catch {
    return null;
  }
}

module.exports = fetchLeetCode;
