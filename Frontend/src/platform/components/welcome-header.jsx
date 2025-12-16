"use client"

import { useState, useEffect } from "react"

export function WelcomeHeader({ isLoaded }) {
  const [typedText, setTypedText] = useState("")
  const fullText = "Welcome back to Codify"

  useEffect(() => {
    if (!isLoaded) return

    let index = 0

    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index))
      index++

      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [isLoaded, fullText])

  return (
    <div className="container mx-auto px-6 pt-20 pb-12">
      <div className="flex items-center gap-6 mb-8">
        {/* Avatar with rotating gradient ring */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-white to-red-600 animate-spin"
            style={{ padding: "3px", animationDuration: "3s" }}
          />

          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-2xl font-bold shadow-xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-transparent" />
            <span className="relative z-10">C</span>
          </div>

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl animate-pulse" />
        </div>

        {/* Welcome text */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center">
            <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="ml-1 w-[2px] h-8 md:h-10 bg-red-500 animate-pulse" />
          </h1>

          <p className="text-neutral-400 text-lg">
            Let&apos;s crush some code today 🔥
          </p>
        </div>
      </div>
    </div>
  )
}
