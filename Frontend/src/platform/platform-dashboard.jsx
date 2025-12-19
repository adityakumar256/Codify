"use client"

import { useState, useEffect } from "react"
import { ProfileSidebar } from "./components/profile-sidebar"
import { StatsCards } from "./components/stats-cards"
import { PlatformStats } from "./components/platform-stats"
import { RatingGraph } from "./components/rating-graph"
import { ProblemsCircular } from "./components/problems-circular"
import { WelcomeHeader } from "./components/welcome-header"

/* ---------- HELPERS ---------- */
const hasValue = (v) => v !== null && v !== undefined && v !== 0
const CACHE_KEY = "dashboard_cache"
const CACHE_TIME = 5 * 60 * 1000 // 5 minutes

/* ---------- NORMALIZER (BACKEND → FRONTEND SHAPE) ---------- */
const normalizePlatforms = (raw = {}) => {
  const platforms = {}

  if (raw.leetcode) {
    platforms.leetcode = {
      platform: "leetcode",
      stats: {
        totalSolved: raw.leetcode.totalSolved,
        easy: raw.leetcode.easy,
        medium: raw.leetcode.medium,
        hard: raw.leetcode.hard,
        rating: raw.leetcode.rating,
      },
      profile: {
        url: raw.leetcode.profileUrl,
      },
      extra: {},
    }
  }

  if (raw.codechef) {
    platforms.codechef = {
      platform: "codechef",
      stats: {
        rating: raw.codechef.rating,
      },
      profile: {
        url: raw.codechef.profileUrl,
      },
      extra: {
        stars: raw.codechef.stars,
      },
    }
  }

  if (raw.codeforces) {
    platforms.codeforces = {
      platform: "codeforces",
      stats: {
        rating: raw.codeforces.rating,
        rank: raw.codeforces.rank,
      },
      profile: {
        url: raw.codeforces.profileUrl,
      },
      extra: {},
    }
  }

  if (raw.github) {
    platforms.github = {
      platform: "github",
      stats: {},
      profile: {
        url: raw.github.profileUrl,
      },
      extra: {
        repositories: raw.github.repos,
        followers: raw.github.followers,
      },
    }
  }

  if (raw.hackerrank) {
    platforms.hackerrank = {
      platform: "hackerrank",
      stats: {
        stars: raw.hackerrank.stars,
      },
      profile: {
        url: raw.hackerrank.profileUrl,
      },
      extra: {
        badges: raw.hackerrank.badges,
      },
    }
  }

  return platforms
}

export default function PlatformDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkBg, setIsDarkBg] = useState(true)
  const [dashboard, setDashboard] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    /* ---------- CHECK CACHE ---------- */
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      const isFresh = Date.now() - parsed.time < CACHE_TIME

      if (isFresh) {
        setDashboard(parsed.dashboard)
        setProfile(parsed.profile)
        setLoading(false)
        setIsLoaded(true)
        return
      }
    }

    /* ---------- FETCH DATA ---------- */
    const fetchData = async () => {
      try {
        const [platformRes, profileRes] = await Promise.all([
          fetch("https://codify-pia9.onrender.com/app/platform", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://codify-pia9.onrender.com/app/profile/get", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const [platformData, profileData] = await Promise.all([
          platformRes.json(),
          profileRes.json(),
        ])

        const normalizedPlatforms = normalizePlatforms(platformData)

        const dashboardData = {
          platforms: normalizedPlatforms,
          totalSolved: Object.values(normalizedPlatforms).reduce(
            (sum, p) => sum + (p.stats?.totalSolved || 0),
            0
          ),
        }

        setDashboard(dashboardData)
        setProfile(profileData)

        /* ---------- SAVE CACHE (FIXED) ---------- */
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            dashboard: dashboardData,
            profile: profileData,
            time: Date.now(),
          })
        )
      } catch (err) {
        console.error("Dashboard fetch failed", err)
      } finally {
        setLoading(false)
        setIsLoaded(true)
      }
    }

    fetchData()
  }, [])

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6
        bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-300">
        <div className="w-14 h-14 border-4 border-neutral-700 border-t-white rounded-full animate-spin" />
        <p className="text-sm tracking-wide animate-pulse">
          Loading dashboard…
        </p>
      </div>
    )
  }

  if (!dashboard || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Data not available
      </div>
    )
  }

  /* ---------- PLATFORMS ---------- */
  const platformsArray = Object.values(dashboard.platforms || [])

  const visiblePlatforms = platformsArray.filter(
    (p) =>
      hasValue(p.stats?.totalSolved) ||
      hasValue(p.stats?.rating) ||
      hasValue(p.extra?.repositories)
  )

  const hasAnyRating = platformsArray.some((p) =>
    hasValue(p.stats?.rating)
  )

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDarkBg
          ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white"
          : "bg-gradient-to-br from-white via-neutral-50 to-neutral-100 text-neutral-900"
      }`}
    >
      {/* THEME TOGGLE */}
      <button
        onClick={() => setIsDarkBg((prev) => !prev)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border bg-white/10 hover:scale-110 transition"
      >
        {isDarkBg ? "🌞" : "🌙"}
      </button>

      <div className="flex min-h-screen relative z-10">
        {/* SIDEBAR */}
        <ProfileSidebar
          user={profile}
          platforms={visiblePlatforms}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-80 mr-96 p-8 overflow-y-auto space-y-6">
          <WelcomeHeader isLoaded={isLoaded} />

          <StatsCards
            totalQuestions={dashboard.totalSolved}
            activeDays={null}
            totalContests={null}
            isLoaded={isLoaded}
            isDarkBg={isDarkBg}
          />

          <PlatformStats
            platforms={visiblePlatforms}
            isLoaded={isLoaded}
            isDarkBg={isDarkBg}
          />

          {hasAnyRating && (
            <RatingGraph
              rating={platformsArray}
              isLoaded={isLoaded}
              isDarkBg={isDarkBg}
            />
          )}
        </main>

        {/* RIGHT PANEL */}
        <ProblemsCircular
          platforms={platformsArray}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />
      </div>
    </div>
  )
}
