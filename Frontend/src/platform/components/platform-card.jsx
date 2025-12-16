"use client"

import { useState, useEffect, useRef } from "react"

const platformIcons = {
  leetcode: "💻",
  codechef: "👨‍🍳",
  codeforces: "⚔️",
  hackerrank: "🎯",
  gfg: "🤓",
  github: "🐙",
}

/* ---------- HELPERS ---------- */
const hasValue = (v) => v !== null && v !== undefined && v !== 0

export function PlatformCard({
  platform,
  platformKey,
  index,
  mousePosition,
  onClick,
  isLoaded,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({})
  const [countUp, setCountUp] = useState({})
  const cardRef = useRef(null)

  /* ---------- 3D TILT ---------- */
  useEffect(() => {
    if (!isHovered || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const dx = (mousePosition.x - (rect.left + rect.width / 2)) / rect.width
    const dy = (mousePosition.y - (rect.top + rect.height / 2)) / rect.height

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${dy * 10}deg) rotateY(${-dx * 10}deg)`,
    })
  }, [mousePosition, isHovered])

  /* ---------- COUNT UP ---------- */
  useEffect(() => {
    if (!isLoaded) return

    const targets = {
      solved: platform.stats?.totalSolved ?? 0,
      easy: platform.stats?.easy ?? 0,
      medium: platform.stats?.medium ?? 0,
      hard: platform.stats?.hard ?? 0,
      rating: Number(platform.stats?.rating) || 0,
      repos: platform.extra?.repositories ?? 0,
      followers: platform.extra?.followers ?? 0,
    }

    Object.entries(targets).forEach(([key, value]) => {
      let curr = 0
      const inc = Math.max(1, Math.ceil(value / 25))
      const t = setInterval(() => {
        curr += inc
        if (curr >= value) {
          curr = value
          clearInterval(t)
        }
        setCountUp((p) => ({ ...p, [key]: curr }))
      }, 25)
    })
  }, [isLoaded, platform])

  const easy = platform.stats?.easy || 0
  const medium = platform.stats?.medium || 0
  const hard = platform.stats?.hard || 0
  const solved = platform.stats?.totalSolved || 0

  const total = easy + medium + hard
  const percent = total > 0 ? (solved / total) * 100 : 0

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTiltStyle({})
      }}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-700 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 120}ms`, ...tiltStyle }}
    >
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl p-6 hover:border-red-500 transition">

        {/* ---------- HEADER ---------- */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {platformIcons[platformKey]}
            </span>
            <h3 className="text-xl font-bold capitalize">
              {platform.platform}
            </h3>
          </div>

          {hasValue(platform.stats?.rank) && (
            <span className="text-xs bg-red-600 px-3 py-1 rounded-full">
              {platform.stats.rank}
            </span>
          )}
        </div>

        {/* ---------- GITHUB CARD ---------- */}
        {platformKey === "github" ? (
          <div className="space-y-3">
            {hasValue(platform.extra?.repositories) && (
              <Stat label="Repositories" value={countUp.repos} />
            )}
            {hasValue(platform.extra?.followers) && (
              <Stat label="Followers" value={countUp.followers} />
            )}
          </div>
        ) : (
          <>
            {/* ---------- SOLVED CIRCLE ---------- */}
            {hasValue(solved) && (
              <div className="flex justify-center mb-5 relative">
                <svg width="120" height="120" className="-rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#333"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#ef4444"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={
                      2 * Math.PI * 50 * (1 - percent / 100)
                    }
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">
                    {countUp.solved}
                  </div>
                  <div className="text-xs text-gray-400">Solved</div>
                </div>
              </div>
            )}

            {/* ---------- DIFFICULTY BARS ---------- */}
            {hasValue(easy) && (
              <Bar
                label="Easy"
                value={countUp.easy}
                percent={(easy / total) * 100}
                color="bg-green-500"
              />
            )}

            {hasValue(medium) && (
              <Bar
                label="Medium"
                value={countUp.medium}
                percent={(medium / total) * 100}
                color="bg-yellow-500"
              />
            )}

            {hasValue(hard) && (
              <Bar
                label="Hard"
                value={countUp.hard}
                percent={(hard / total) * 100}
                color="bg-red-500"
              />
            )}
          </>
        )}

        {/* ---------- RATING ---------- */}
        {hasValue(platform.stats?.rating) && (
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-400">Rating</div>
            <div className="text-lg font-bold">
              {countUp.rating}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- SMALL COMPONENTS ---------- */
const Stat = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
)

const Bar = ({ label, value, percent, color }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 bg-neutral-800 rounded overflow-hidden">
      <div
        className={`h-full ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
)
