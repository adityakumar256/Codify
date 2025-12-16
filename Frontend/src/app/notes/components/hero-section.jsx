import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState("")
  const fullText = "Study Notes Library"

  useEffect(() => {
    setIsVisible(true)
    let index = 0

    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
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
        className={`max-w-5xl text-center space-y-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Title */}
        <div className="animate-float">
          <h1 className="text-7xl font-bold text-gradient animate-glow mb-4">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-2xl text-gray-300 animate-slideUp opacity-0"
          style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
        >
          Browse, preview, and download premium study materials
        </p>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-6 flex-wrap mt-8 opacity-0 animate-slideUp"
          style={{ animationDelay: "2s", animationFillMode: "forwards" }}
        >
          <div className="glassmorphism px-6 py-3 rounded-full text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
            <span className="text-red-500 font-bold">100+</span>
            <span className="text-gray-400 ml-2">Notes</span>
          </div>

          <div className="glassmorphism px-6 py-3 rounded-full text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
            <span className="text-red-500 font-bold">15+</span>
            <span className="text-gray-400 ml-2">Subjects</span>
          </div>

          <div className="glassmorphism px-6 py-3 rounded-full text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
            <span className="text-red-500 font-bold">Free</span>
            <span className="text-gray-400 ml-2">Forever</span>
          </div>
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
