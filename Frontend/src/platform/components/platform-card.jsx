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

export function PlatformCard({
  platform,
  platformKey,
  index,
  mousePosition,
  onClick,
  isLoaded
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({})
  const [countUp, setCountUp] = useState({})
  const cardRef = useRef(null)

  /* 🌀 3D Tilt */
  useEffect(() => {
    if (!isHovered || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const dx = (mousePosition.x - (rect.left + rect.width / 2)) / rect.width
    const dy = (mousePosition.y - (rect.top + rect.height / 2)) / rect.height

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${dy * 10}deg) rotateY(${-dx * 10}deg)`
    })
  }, [mousePosition, isHovered])

  /* 🔢 Count Up */
  useEffect(() => {
    if (!isLoaded) return

    const targets = {
      solved: platform.stats?.totalSolved ?? 0,
      easy: platform.stats?.easy ?? 0,
      medium: platform.stats?.medium ?? 0,
      hard: platform.stats?.hard ?? 0,
      rating: platform.stats?.rating ?? 0,
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
        setCountUp(p => ({ ...p, [key]: curr }))
      }, 30)
    })
  }, [isLoaded, platform])

  const total =
    (platform.stats?.easy || 0) +
    (platform.stats?.medium || 0) +
    (platform.stats?.hard || 0)

  const percent =
    total > 0 ? (platform.stats.totalSolved / total) * 100 : 0

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
      style={{ transitionDelay: `${index * 150}ms`, ...tiltStyle }}
    >
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl p-6 hover:border-red-500 transition">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{platformIcons[platformKey]}</span>
            <h3 className="text-xl font-bold capitalize">{platform.platform}</h3>
          </div>
          {platform.stats?.rank && (
            <span className="text-xs bg-red-600 px-3 py-1 rounded-full">
              {platform.stats.rank}
            </span>
          )}
        </div>

        {/* GitHub */}
        {platformKey === "github" ? (
          <div className="space-y-3">
            <Stat label="Repos" value={countUp.repos} />
            <Stat label="Followers" value={countUp.followers} />
          </div>
        ) : (
          <>
            {/* Progress Circle */}
            <div className="flex justify-center mb-5">
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
              <div className="absolute text-center">
                <div className="text-2xl font-bold">{countUp.solved}</div>
                <div className="text-xs text-gray-400">Solved</div>
              </div>
            </div>

            <Bar label="Easy" value={countUp.easy} color="bg-green-500" />
            <Bar label="Medium" value={countUp.medium} color="bg-yellow-500" />
            <Bar label="Hard" value={countUp.hard} color="bg-red-500" />
          </>
        )}

        {/* Footer */}
        {platform.stats?.rating && (
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-400">Rating</div>
            <div className="text-lg font-bold">{countUp.rating}</div>
          </div>
        )}
      </div>
    </div>
  )
}

/* 🧩 Helpers */
const Stat = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-400">{label}</span>
    <span className="font-bold">{value ?? 0}</span>
  </div>
)

const Bar = ({ label, value, color }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{value ?? 0}</span>
    </div>
    <div className="h-2 bg-neutral-800 rounded">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
)
