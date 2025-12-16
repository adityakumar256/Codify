import { useState, useEffect } from "react"
import { HeroSection } from "./components/hero-section"
import { ContactForm } from "./components/contact-form"
import { ContactInfo } from "./components/contact-info"
import { BackToTop } from "./components/back-to-top"

export default function ContactPage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const progress =
        totalHeight > 0
          ? (window.scrollY / totalHeight) * 100
          : 0

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(
              circle at 50% ${50 + scrollProgress / 10}%,
              rgba(239, 68, 68, 0.2) 0%,
              transparent 50%
            )`,
          }}
        />
      </div>

      <HeroSection />
      <ContactForm />
      <ContactInfo />
      <BackToTop />
    </div>
  )
}
