"use client"

import { useEffect, useState } from "react"
import { Code2, Calendar, Trophy } from "lucide-react"

/* ---------- HELPERS ---------- */
const hasValue = (v) => v !== null && v !== undefined && v !== 0

export function StatsCards({
  totalQuestions,
  activeDays,
  totalContests,
  isLoaded,
  isDarkBg,
}) {
  const [animated, setAnimated] = useState({})

  /* ---------- COUNT UP ---------- */
  useEffect(() => {
    if (!isLoaded) return

    const targets = {
      totalQuestions,
      activeDays,
      totalContests,
    }

    const validTargets = Object.entries(targets).filter(([, v]) =>
      hasValue(v)
    )

    if (validTargets.length === 0) return

    const steps = 50
    let step = 0

    const interval = setInterval(() => {
      step++

      setAnimated((prev) => {
        const updated = { ...prev }

        validTargets.forEach(([key, value]) => {
          updated[key] = Math.min(
            Math.floor((value / steps) * step),
            value
          )
        })

        return updated
      })

      if (step >= steps) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [isLoaded, totalQuestions, activeDays, totalContests])

  /* ---------- CARDS CONFIG ---------- */
  const cards = [
    hasValue(totalQuestions) && {
      key: "totalQuestions",
      icon: Code2,
      label: "Total Questions Solved",
      color: "from-red-500 to-red-600",
    },
    hasValue(activeDays) && {
      key: "activeDays",
      icon: Calendar,
      label: "Active Days",
      color: "from-orange-500 to-red-500",
    },
    hasValue(totalContests) && {
      key: "totalContests",
      icon: Trophy,
      label: "Contests Participated",
      color: "from-red-600 to-red-700",
    },
  ].filter(Boolean)

  /* ---------- NOTHING TO SHOW ---------- */
  if (cards.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={card.key}
          className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-500
            hover:scale-105 hover:shadow-lg hover:shadow-red-500/10
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            ${
              isDarkBg
                ? "bg-neutral-900/50 border-neutral-800 hover:border-red-500/30"
                : "bg-white/50 border-neutral-200 hover:border-red-500/50"
            }
          `}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color}
                flex items-center justify-center`}
            >
              <card.icon className="w-6 h-6 text-white" />
            </div>

            <div>
              <p
                className={`text-sm mb-1 ${
                  isDarkBg ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {card.label}
              </p>
              <p
                className={`text-3xl font-bold ${
                  isDarkBg ? "text-white" : "text-neutral-900"
                }`}
              >
                {(animated[card.key] ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
