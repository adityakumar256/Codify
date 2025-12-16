"use client"

import { useMemo } from "react"

/* 🔹 SAFE FALLBACK DATA */
const demoRating = {
  current: 1520,
  contest: "Weekly Contest 380",
  rank: 1234,
  date: "12 Dec 2025",
  history: [
    { contest: 1, rating: 1200 },
    { contest: 2, rating: 1280 },
    { contest: 3, rating: 1350 },
    { contest: 4, rating: 1420 },
    { contest: 5, rating: 1500 },
  ],
}

export function RatingGraph({ rating, isLoaded = true, isDarkBg = true }) {
  /* 🔹 USE REAL DATA IF EXISTS ELSE DEMO */
  const safeRating = rating?.history?.length ? rating : demoRating
  const history = safeRating.history

  const maxRating = useMemo(
    () => Math.max(...history.map(r => Number(r.rating))),
    [history]
  )
  const minRating = useMemo(
    () => Math.min(...history.map(r => Number(r.rating))),
    [history]
  )

  const range = Math.max(maxRating - minRating, 1)

  const width = 500
  const height = 200
  const padding = 40
  const barWidth =
    (width - padding * 2) / history.length - 6

  return (
    <div
      className={`border rounded-xl p-6 transition-all duration-700
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${isDarkBg ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}
      `}
    >
      <h3 className="text-lg font-semibold mb-4 text-white">
        Rating Progress
      </h3>

      {/* HEADER */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-white">
          {safeRating.current}
        </p>
        <p className="text-sm text-neutral-400">
          {safeRating.contest} • Rank {safeRating.rank}
        </p>
        <p className="text-xs text-neutral-500">{safeRating.date}</p>
      </div>

      {/* GRAPH */}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
        {/* GRID */}
        {[0, 0.5, 1].map(p => (
          <line
            key={p}
            x1={padding}
            y1={padding + (height - padding * 2) * p}
            x2={width - padding}
            y2={padding + (height - padding * 2) * p}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}

        {/* BARS */}
        {history.map((r, i) => {
          const barHeight =
            ((r.rating - minRating) / range) *
              (height - padding * 2) +
            4

          const x =
            padding +
            i * ((width - padding * 2) / history.length)

          const y = height - padding - barHeight

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="3"
                fill="url(#grad)"
              />
              <title>
                Contest {r.contest} → {r.rating}
              </title>
            </g>
          )
        })}

        {/* GRADIENT */}
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
