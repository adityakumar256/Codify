

import { useEffect, useState } from "react"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const words = ["Code", "Build", "Create", "Innovate", "Transform"]

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // show content with entry animation
    const timeout = setTimeout(() => setIsVisible(true), 100)
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D4127]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#636B2F]/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4DE95]/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      {/* Neon Lines */}
      <div className="absolute top-1/3 left-0 w-full neon-line opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-full neon-line opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#636B2F]/30">
              <span className="w-2 h-2 bg-[#D4DE95] rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Now with AI-powered learning</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-foreground">Learn to</span>
              <br />
              <span
                key={currentWord}
                className="gradient-text animate-text-glow inline-block transition-all duration-500"
                style={{ animation: "fadeInUp 0.5s ease-out" }}
              >
                {words[currentWord]}
              </span>
              <br />
              <span className="text-foreground">with Codify</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Master programming through interactive lessons, real-world projects, and a supportive community. Your
              journey to becoming a developer starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#D4DE95] to-[#BAC095] text-[#3D4127] hover:shadow-[0_0_30px_rgba(212,222,149,0.5)] transition-all duration-300 hover:scale-105 group"
              >
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-[#636B2F] text-foreground hover:bg-[#636B2F]/20 hover:border-[#BAC095] transition-all duration-300 group bg-transparent"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-[#636B2F]/30">
              <div>
                <p className="text-3xl font-bold gradient-text">50K+</p>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">200+</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#636B2F]/40 via-[#BAC095]/30 to-[#D4DE95]/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#636B2F]/30 animate-float">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3D4127]/50 via-transparent to-[#D4DE95]/20 z-10 pointer-events-none" />
                <img
                  src="/modern-coding-workspace-with-multiple-monitors-sho.jpg"
                  alt="Coding workspace"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating Elements */}
              <div
                className="absolute -top-6 -right-6 glass rounded-xl p-4 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D4DE95]" />
                  <span className="text-sm font-mono text-foreground">Live Coding</span>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 glass rounded-xl p-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  <span className="text-sm text-foreground">Build Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
