"use client"

import { useEffect, useState } from "react"

export function ProblemsCircular({ problems, isLoaded, isDarkBg }) {
  const hasData =
    problems &&
    (problems?.fundamentals?.total > 0 || problems?.dsa?.total > 0)

  const [progress, setProgress] = useState({ fundamentals: 0, dsa: 0 })

  useEffect(() => {
    if (!isLoaded || !hasData) return

    const steps = 60
    let current = 0

    const interval = setInterval(() => {
      current++
      setProgress({
        fundamentals: Math.min((current / steps) * 100, 100),
        dsa: Math.min((current / steps) * 100, 100),
      })
      if (current >= steps) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [isLoaded, hasData])

  const platformColors = {
    GFG: "#2f8d46",
    HackerRank: "#00ea64",
  }

  const difficultyColors = {
    Easy: "#10b981",
    Medium: "#eab308",
    Hard: "#ef4444",
  }

  const RADIUS = 56
  const CIRC = 2 * Math.PI * RADIUS

  const buildSegments = (items = [], total = 0, colorMap, keyName) => {
    if (!total) return []
    let offset = 0

    return items.map((item) => {
      const pct = (item.count / total) * 100
      const len = (CIRC * pct) / 100
      const seg = {
        label: item[keyName],
        count: item.count,
        color: colorMap[item[keyName]] || "#10b981",
        offset,
        length: len,
      }
      offset += len
      return seg
    })
  }

  const fundamentalsSegments = hasData
    ? buildSegments(
        problems.fundamentals.breakdown,
        problems.fundamentals.total,
        platformColors,
        "platform"
      )
    : []

  const dsaSegments = hasData
    ? buildSegments(
        problems.dsa.breakdown,
        problems.dsa.total,
        difficultyColors,
        "difficulty"
      )
    : []

  return (
    <aside
      className={`fixed right-0 top-0 w-96 h-screen p-6 overflow-y-auto backdrop-blur-xl border-l transition-all duration-700
        ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
        ${
          isDarkBg
            ? "bg-neutral-900/60 border-neutral-800 text-white"
            : "bg-white/60 border-neutral-200 text-neutral-900"
        }
      `}
    >
      <h2
        className={`text-xl font-bold mb-6 ${
          isDarkBg ? "text-white" : "text-neutral-900"
        }`}
      >
        Problems Solved
      </h2>

      {/* ===== EMPTY STATE ===== */}
      {!hasData && (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold text-neutral-400 mb-2">
            No problems solved yet
          </p>
          <p className="text-sm text-neutral-500">
            Start solving problems to unlock insights
          </p>
        </div>
      )}

      {/* ===== DATA STATE ===== */}
      {hasData && (
        <>
          {/* Fundamentals */}
          <Section
            title="Fundamentals"
            total={problems.fundamentals.total}
            segments={fundamentalsSegments}
            progress={progress.fundamentals}
            isDarkBg={isDarkBg}
            radius={RADIUS}
            circumference={CIRC}
          />

          <hr
            className={`my-8 ${
              isDarkBg ? "border-neutral-800" : "border-neutral-200"
            }`}
          />

          {/* DSA */}
          <Section
            title="DSA"
            total={problems.dsa.total}
            segments={dsaSegments}
            progress={progress.dsa}
            isDarkBg={isDarkBg}
            radius={RADIUS}
            circumference={CIRC}
          />

          <hr
            className={`my-8 ${
              isDarkBg ? "border-neutral-800" : "border-neutral-200"
            }`}
          />

          <h3
            className={`font-semibold mb-2 ${
              isDarkBg ? "text-white" : "text-neutral-900"
            }`}
          >
            Competitive Programming
          </h3>
          <p
            className={`text-sm ${
              isDarkBg ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Contest stats coming soon…
          </p>
        </>
      )}
    </aside>
  )
}

/* 🔹 Reusable Section Component (UNCHANGED UI) */
function Section({
  title,
  total,
  segments,
  progress,
  isDarkBg,
  radius,
  circumference,
}) {
  return (
    <div className="mb-6">
      <h3
        className={`font-semibold mb-4 ${
          isDarkBg ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h3>

      <div className="flex gap-6 items-center">
        {/* Circle */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={isDarkBg ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="8"
              fill="none"
            />
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx="64"
                cy="64"
                r={radius}
                stroke={seg.color}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${seg.length * (progress / 100)} ${circumference}`}
                strokeDashoffset={-seg.offset * (progress / 100)}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{total}</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-2">
          {segments.map((s) => (
            <div key={s.label} className="flex justify-between">
              <span style={{ color: s.color }}>{s.label}</span>
              <span className="font-bold">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
