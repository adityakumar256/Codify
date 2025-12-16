"use client"

import { useEffect, useState } from "react"

/* ---------- HELPERS ---------- */
const hasValue = (v) => v !== null && v !== undefined && v !== 0

export function ProblemsCircular({ problems, isLoaded, isDarkBg }) {
  const totalSolved = problems?.fundamentals?.total ?? 0
  const hasData = hasValue(totalSolved)

  const [progress, setProgress] = useState(0)

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    if (!isLoaded || !hasData) return

    let curr = 0
    const interval = setInterval(() => {
      curr += 2
      setProgress(Math.min(curr, 100))
      if (curr >= 100) clearInterval(interval)
    }, 20)

    return () => clearInterval(interval)
  }, [isLoaded, hasData])

  /* ---------- NOTHING TO SHOW ---------- */
  if (!hasData) return null

  const RADIUS = 54
  const CIRC = 2 * Math.PI * RADIUS
  const offset = CIRC * (1 - progress / 100)

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
      <h2 className="text-xl font-bold mb-8">
        Problems Solved
      </h2>

      {/* ---------- MAIN CIRCLE ---------- */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="relative w-40 h-40 mb-6">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              stroke={isDarkBg ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              stroke="#ef4444"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">
              {totalSolved}
            </div>
            <div className="text-sm text-neutral-400">
              Total Solved
            </div>
          </div>
        </div>

        {/* ---------- INFO ---------- */}
        <div className="w-full space-y-3 mt-6">
          <InfoRow label="Strongest Area" value="DSA / Problem Solving" />
          <InfoRow label="Primary Platform" value="LeetCode" />
          <InfoRow label="Consistency" value="High" />
        </div>
      </div>
    </aside>
  )
}

/* ---------- SMALL ROW ---------- */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
