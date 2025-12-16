"use client"

import { useState } from "react"

export function ActivityHeatmap({
  activity = [],
  maxStreak = 0,
  currentStreak = 0,
  isLoaded,
  isDarkBg,
}) {
  const [hoveredDay, setHoveredDay] = useState(null)

  const hasActivity = activity && activity.length > 0

  /* -------- GROUP BY WEEKS (SAFE) -------- */
  const weeks = []
  let currentWeek = []

  if (hasActivity) {
    activity.forEach((day, index) => {
      currentWeek.push(day)
      if (currentWeek.length === 7 || index === activity.length - 1) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    })
  }

  /* -------- COLORS -------- */
  const getIntensityColor = (count) => {
    if (count === 0) return "bg-neutral-800/30"
    if (count < 5) return "bg-green-900/50"
    if (count < 10) return "bg-green-700/70"
    if (count < 15) return "bg-green-500/80"
    return "bg-green-400"
  }

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ]

  return (
    <div
      className={`relative backdrop-blur-sm border rounded-xl p-6 transition-all duration-700 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isDarkBg ? "bg-neutral-900/50 border-neutral-800" : "bg-white/50 border-neutral-200"}`}
      style={{ transitionDelay: "300ms" }}
    >
      {/* ================= HEADER (SAME) ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className={`text-lg font-semibold mb-1 ${
              isDarkBg ? "text-white" : "text-neutral-900"
            }`}
          >
            Submissions
          </h3>
          <p
            className={`text-sm ${
              isDarkBg ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {hasActivity
              ? `${activity.filter((d) => d.count > 0).length} days in the last year`
              : "No activity recorded yet"}
          </p>
        </div>

        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-red-500">{maxStreak}</p>
            <p className={`text-xs ${isDarkBg ? "text-neutral-400" : "text-neutral-600"}`}>
              Max Streak
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-500">{currentStreak}</p>
            <p className={`text-xs ${isDarkBg ? "text-neutral-400" : "text-neutral-600"}`}>
              Current Streak
            </p>
          </div>
        </div>
      </div>

      {/* ================= EMPTY STATE OVERLAY ================= */}
      {!hasActivity && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <p className="text-lg font-semibold text-neutral-400 mb-1">
            No activity yet
          </p>
          <p className="text-sm text-neutral-500">
            Start solving problems to build your streak 🔥
          </p>
        </div>
      )}

      {/* ================= HEATMAP ================= */}
      {hasActivity && (
        <>
          <div className="relative overflow-x-auto pb-4">
            {/* Months */}
            <div className="flex gap-1 mb-2 pl-8 min-w-max">
              {months.map((month) => (
                <div
                  key={month}
                  className={`text-xs w-24 ${
                    isDarkBg ? "text-neutral-500" : "text-neutral-600"
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getIntensityColor(
                        day.count
                      )} transition-all duration-200 hover:scale-150 cursor-pointer`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.date}: ${day.count} submissions`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {hoveredDay && (
              <div
                className={`fixed z-50 px-3 py-2 border rounded-lg text-xs shadow-xl ${
                  isDarkBg
                    ? "bg-neutral-800 border-neutral-700 text-white"
                    : "bg-white border-neutral-300 text-neutral-900"
                }`}
              >
                <p className="font-semibold">{hoveredDay.count} submissions</p>
                <p className={isDarkBg ? "text-neutral-400" : "text-neutral-600"}>
                  {hoveredDay.date}
                </p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div
            className={`flex items-center gap-2 mt-4 text-xs ${
              isDarkBg ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-neutral-800/30 rounded-sm" />
              <div className="w-3 h-3 bg-green-900/50 rounded-sm" />
              <div className="w-3 h-3 bg-green-700/70 rounded-sm" />
              <div className="w-3 h-3 bg-green-500/80 rounded-sm" />
              <div className="w-3 h-3 bg-green-400 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </>
      )}
    </div>
  )
}
