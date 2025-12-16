"use client"

import { useState, useEffect } from "react"
import { ProfileSidebar } from "./components/profile-sidebar"
import { StatsCards } from "./components/stats-cards"
import { ActivityHeatmap } from "./components/activity-heatmap"
import { PlatformStats } from "./components/platform-stats"
import { RatingGraph } from "./components/rating-graph"
import { ProblemsCircular } from "./components/problems-circular"

export default function PlatformDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkBg, setIsDarkBg] = useState(true)

  const [dashboard, setDashboard] = useState(null)
  const [profile, setProfile] = useState(null) // ✅ ADD THIS

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    const fetchData = async () => {
      try {
        // 🔹 dashboard API (same as before)
        const dashRes = await fetch("http://localhost:7025/app/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const dashData = await dashRes.json()
        setDashboard(dashData)

        // 🔹 profile API (NEW – only for sidebar)
        const profileRes = await fetch("http://localhost:7025/app/profile/get", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const profileData = await profileRes.json()
        setProfile(profileData)

      } catch (err) {
        console.error("Fetch failed", err)
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

  /* ---------- UI (UNCHANGED) ---------- */
  return (
    <div
      className={`min-h-screen text-white relative overflow-hidden transition-colors duration-500 ${
        isDarkBg
          ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
          : "bg-gradient-to-br from-white via-neutral-50 to-neutral-100"
      }`}
    >
      {/* background, blobs, toggle – SAME */}
            {/* ================= THEME TOGGLE (ADDED BACK) ================= */}
      <button
        onClick={() => setIsDarkBg((prev) => !prev)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border bg-white/10 hover:scale-110 transition"
      >
        {isDarkBg ? "🌞" : "🌙"}
      </button>

      <div className="flex min-h-screen relative z-10">
        {/* ✅ ONLY THIS LINE CHANGED */}
        <ProfileSidebar
          user={profile}                 // ❗ was dashboard.profile
          platforms={dashboard.platforms}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />

        {/* MAIN CONTENT – SAME AS BEFORE */}
        <main className="flex-1 ml-80 mr-96 p-8 overflow-y-auto">
          <StatsCards
            totalQuestions={dashboard.totalSolved ?? 0}
            activeDays={0}
            totalContests={0}
            isLoaded={isLoaded}
            isDarkBg={isDarkBg}
          />

          <ActivityHeatmap
            activity={[]}
            maxStreak={0}
            currentStreak={0}
            isLoaded={isLoaded}
            isDarkBg={isDarkBg}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <PlatformStats
              platforms={dashboard.platforms}
              isLoaded={isLoaded}
              isDarkBg={isDarkBg}
            />

            <RatingGraph
              rating={null}
              isLoaded={isLoaded}
              isDarkBg={isDarkBg}
            />
          </div>
        </main>

        <ProblemsCircular
          problems={{
            fundamentals: { total: dashboard.totalSolved ?? 0 },
            dsa: { total: 0 },
          }}
          isLoaded={isLoaded}
          isDarkBg={isDarkBg}
        />
      </div>
    </div>
  )
}
