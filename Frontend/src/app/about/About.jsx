import { useEffect, useState } from "react"
import { HeroSection } from "./components/hero-section"
import { MissionSection } from "./components/mission-section"
import { TimelineSection } from "./components/timeline-section"
import { ValuesSection } from "./components/values-section"
import { VisionSection } from "./components/vision-section"
import { BackToTop } from "./components/back-to-top"

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  // 🔹 Floating background particles (stable on re-render)
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }))
  )

  // 🔹 Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* 🔴 Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ✨ Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 🔹 Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <MissionSection />
        <TimelineSection />
        <ValuesSection />
        <VisionSection />
        <BackToTop />
      </div>
    </div>
  )
}
