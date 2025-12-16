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

export default function PlatformDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkBg, setIsDarkBg] = useState(true)

  const [dashboard, setDashboard] = useState(null)
  const [profile, setProfile] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    const fetchData = async () => {
      try {
        /* ---------- DASHBOARD DATA ---------- */
        const dashRes = await fetch("http://localhost:7025/app/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const dashData = await dashRes.json()
        setDashboard(dashData)

        /* ---------- PROFILE DATA ---------- */
        const profileRes = await fetch("http://localhost:7025/app/profile/get", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const profileData = await profileRes.json()
        setProfile(profileData)
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
      <div className="min-h-screen flex items-center justify-center text-neutral-400">
        Loading dashboard…
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

  /* ---------- FILTER PLATFORMS (ONLY DATA WALA) ---------- */
  const visiblePlatforms = dashboard.platforms?.filter(
    (p) =>
      hasValue(p.stats?.totalSolved) ||
      hasValue(p.stats?.rating) ||
      hasValue(p.extra?.repositories)
  )

  /* ---------- CHECK IF ANY RATING EXISTS ---------- */
  const hasAnyRating = dashboard.platforms?.some((p) =>
    hasValue(p.stats?.rating)
  )

  return (
    <div
      className={`min-h-screen text-white relative overflow-hidden transition-colors duration-500 ${
        isDarkBg
          ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
          : "bg-gradient-to-br from-white via-neutral-50 to-neutral-100"
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
          
  {/* ---------- WELCOME HEADER ---------- */}
  <WelcomeHeader isLoaded={isLoaded} />

          {/* ---------- TOP STATS ---------- */}
          <StatsCards
            totalQuestions={dashboard.totalSolved}
            activeDays={null}
            totalContests={null}
            isLoaded={isLoaded}
            isDarkBg={isDarkBg}
          />

          {/* ---------- PLATFORMS ---------- */}
          <PlatformStats
            platforms={visiblePlatforms}
            isLoaded={isLoaded}
            isDarkBg={isDarkBg}
          />

          {/* ---------- RATING GRAPH (ONLY IF DATA EXISTS) ---------- */}
          {hasAnyRating && (
            <RatingGraph
              rating={dashboard.platforms}
              isLoaded={isLoaded}
              isDarkBg={isDarkBg}
            />
          )}
        </main>

        {/* ================= RIGHT PANEL ================= */}
        <ProblemsCircular
          problems={{
            fundamentals: { total: dashboard.totalSolved },
          }}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />
      </div>
    </div>
  )
} 