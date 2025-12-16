import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {/* 🔙 Back to Dashboard */}
      <Link
        to="/dashboard"
        className="absolute top-8 left-8 text-white/60 hover:text-red-500 transition-colors"
      >
        ← Back to Dashboard
      </Link>

      <div
        className={`max-w-4xl text-center space-y-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{
          transform: isVisible ? "translateZ(0)" : "translateZ(-100px)",
        }}
      >
        {/* Title */}
        <div className="inline-block animate-float">
          <h1 className="text-7xl font-bold text-gradient animate-glow mb-4">
            About Codify
          </h1>
        </div>

        {/* Description */}
        <div className="overflow-hidden">
          <p
            className="text-2xl text-gray-300 animate-slideUp opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            Codify is a developer-focused platform built to track progress,
            explore learning resources, and grow together as a coding community.
          </p>
        </div>

        {/* Highlight line */}
        <div
          className="overflow-hidden"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          <p
            className="text-lg text-gray-400 animate-slideUp opacity-0"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            From DSA practice and platform analytics to notes, projects, and
            insights — Codify helps learners turn consistency into confidence.
          </p>
        </div>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-4 mt-8 opacity-0 animate-slideUp"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
          <span className="text-red-500 font-semibold">
            Learn • Track • Grow
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
