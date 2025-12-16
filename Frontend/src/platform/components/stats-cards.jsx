"use client"

import { useEffect, useState } from "react"
import { Code2, Calendar, Trophy } from "lucide-react"

export function StatsCards({
  totalQuestions,
  activeDays,
  totalContests,
  isLoaded,
  isDarkBg,
}) {
  const [animatedQuestions, setAnimatedQuestions] = useState(0)
  const [animatedDays, setAnimatedDays] = useState(0)
  const [animatedContests, setAnimatedContests] = useState(0)

  useEffect(() => {
    if (!isLoaded) return

    const steps = 60
    let step = 0

    const interval = setInterval(() => {
      step++
      setAnimatedQuestions(Math.min(Math.floor((totalQuestions / steps) * step), totalQuestions))
      setAnimatedDays(Math.min(Math.floor((activeDays / steps) * step), activeDays))
      setAnimatedContests(Math.min(Math.floor((totalContests / steps) * step), totalContests))

      if (step >= steps) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [isLoaded, totalQuestions, activeDays, totalContests])

  const cards = [
    {
      icon: Code2,
      label: "Total Questions",
      value: animatedQuestions,
      color: "from-red-500 to-red-600",
    },
    {
      icon: Calendar,
      label: "Total Active Days",
      value: animatedDays,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Trophy,
      label: "Total Contests",
      value: animatedContests,
      color: "from-red-600 to-red-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-500
            hover:scale-105 hover:shadow-lg hover:shadow-red-500/10
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            ${
              isDarkBg
                ? "bg-neutral-900/50 border-neutral-800 hover:border-red-500/30"
                : "bg-white/50 border-neutral-200 hover:border-red-500/50"
            }
          `}
          style={{ transitionDelay: `${index * 100}ms` }}
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
                {card.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
