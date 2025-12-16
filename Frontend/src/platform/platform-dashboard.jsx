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

    /* ---------- FETCH DATA (FAST) ---------- */
    const fetchData = async () => {
      try {
        const [dashRes, profileRes] = await Promise.all([
          fetch("http://localhost:7025/app/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:7025/app/profile/get", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const [dashData, profileData] = await Promise.all([
          dashRes.json(),
          profileRes.json(),
        ])

        setDashboard(dashData)
        setProfile(profileData)

        /* ---------- SAVE CACHE ---------- */
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            dashboard: dashData,
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
 /* ---------- LOADING ---------- */
if (loading) {
  return (
    <div className="min-h-screen p-8 flex gap-6 bg-neutral-950 animate-pulse">
      
      {/* Sidebar skeleton */}
      <div className="w-72 h-[90vh] rounded-xl bg-neutral-800/50" />

      {/* Main */}
      <div className="flex-1 space-y-6">
        <div className="h-10 w-64 bg-neutral-800/50 rounded" />
        <div className="grid grid-cols-3 gap-6">
          <div className="h-28 bg-neutral-800/50 rounded-xl" />
          <div className="h-28 bg-neutral-800/50 rounded-xl" />
          <div className="h-28 bg-neutral-800/50 rounded-xl" />
        </div>
        <div className="h-64 bg-neutral-800/50 rounded-xl" />
      </div>
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

  /* ---------- PLATFORMS (OBJECT → ARRAY) ---------- */
  const platformsArray = Object.values(dashboard.platforms || {})

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
      {/* ================= THEME TOGGLE ================= */}
      <button
        onClick={() => setIsDarkBg((prev) => !prev)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border bg-white/10 hover:scale-110 transition"
      >
        {isDarkBg ? "🌞" : "🌙"}
      </button>

      <div className="flex min-h-screen relative z-10">
        {/* ================= SIDEBAR ================= */}
        <ProfileSidebar
          user={profile}
          platforms={visiblePlatforms}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />

        {/* ================= MAIN CONTENT ================= */}
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

        {/* ================= RIGHT PANEL ================= */}
        <ProblemsCircular
          platforms={dashboard.platforms}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />
      </div>
    </div>
  )
}
