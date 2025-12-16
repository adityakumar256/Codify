import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState("")
  const fullText = "Get In Touch"

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
    }, 100)

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
        className={`max-w-4xl text-center space-y-8 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-90 blur-sm"
        }`}
      >
        {/* Heading */}
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
          We'd love to hear from you. Send us a message!
        </p>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-4 mt-8 opacity-0 animate-slideUp"
          style={{ animationDelay: "2s", animationFillMode: "forwards" }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
          <span className="text-red-500 font-semibold">Available 24/7</span>
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
