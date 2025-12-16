const axios = require("axios")
const cheerio = require("cheerio")
const normalizeProfile = require("./normalizeProfile")

async function fetchGFG(username) {
  try {
    const profileUrl = `https://auth.geeksforgeeks.org/user/${username}/`

    const { data } = await axios.get(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })

    const $ = cheerio.load(data)

    /* ---------- TOTAL SOLVED ---------- */
    let totalSolved = 0
    $(".scoreCard_head__G_uNQ").each((_, el) => {
      if ($(el).text().toLowerCase().includes("problems solved")) {
        totalSolved = Number(
          $(el).next().text().replace(/\D/g, "")
        )
      }
    })

    /* ---------- RANK (monthly / institute) ---------- */
    let rank = null
    $(".scoreCard_head__G_uNQ").each((_, el) => {
      const text = $(el).text().toLowerCase()
      if (text.includes("rank")) {
        rank = $(el).next().text().trim()
      }
    })

    /* ---------- LANGUAGES ---------- */
    const languages = []
    $(".language_used__1B1Z_ span").each((_, el) => {
      languages.push($(el).text().trim())
    })

    /* ---------- NORMALIZE ---------- */
    return normalizeProfile({
      platform: "geeksforgeeks",
      username,
      profileUrl,

      stats: {
        totalSolved,
        rank,
      },

      extra: {
        languages,
      },
    })

  } catch (err) {
    console.error("GFG fetch error:", err.message)
    return null
  }
}

module.exports = fetchGFG
