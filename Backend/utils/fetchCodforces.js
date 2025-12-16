const axios = require("axios");

async function fetchCodeforces(username) {
  try {
    // ✅ Basic info
    const { data } = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    if (data.status !== "OK") return null;
    const user = data.result[0];

    // ✅ Submissions for solved problems
    const { data: submissions } = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );

    const solvedSet = new Set();
    submissions.result.forEach(sub => {
      if (sub.verdict === "OK") solvedSet.add(sub.problem.name);
    });

    return {
      rating: user.rating || null,
      rank: user.rank || null,
      totalSolved: solvedSet.size
    };
  } catch (err) {
    console.error("Codeforces fetch error:", err.message);
    return null;
  }
}

module.exports = fetchCodeforces;