"use client"

import { PlatformCard } from "./platform-card"
import { useState } from "react"

/* ---------- HELPERS ---------- */
const hasValue = (v) => v !== null && v !== undefined && v !== 0

export function PlatformStats({ platforms = [], isLoaded, isDarkBg }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  console.log("PLATFORMS FULL DATA 👉", platforms)


  /* ---------- VALID PLATFORMS ONLY ---------- */
  const visiblePlatforms = platforms.filter(
    (p) =>
      hasValue(p.stats?.totalSolved) ||
      hasValue(p.stats?.rating) ||
      hasValue(p.extra?.repositories)
  )

  /* ---------- IF NOTHING TO SHOW ---------- */
  if (visiblePlatforms.length === 0) {
    return null
  }

  return (
    <section
      className={`transition-all duration-700 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseMove={(e) =>
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      style={{ transitionDelay: "300ms" }}
    >
      {/* ---------- HEADING ---------- */}
      <h3
        className={`text-xl font-bold mb-6 ${
          isDarkBg ? "text-white" : "text-neutral-900"
        }`}
      >
        Platform Stats
      </h3>

      {/* ---------- GRID ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visiblePlatforms.map((platform, index) => (
          <PlatformCard
            key={platform.platform}
            platform={platform}
            platformKey={platform.platform}
            index={index}
            mousePosition={mousePosition}
            isLoaded={isLoaded}
          />
        ))}
      </div>
    </section>
  )
}
