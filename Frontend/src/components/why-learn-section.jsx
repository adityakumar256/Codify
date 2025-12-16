

import { CheckCircle2, Sparkles, Target, TrendingUp } from "lucide-react"
import useScrollReveal from "@/hooks/useScrollReveal"

const benefits = [
  {
    icon: Sparkles,
    title: "AI-Powered Learning",
    description: "Get personalized recommendations and instant code reviews powered by advanced AI.",
  },
  {
    icon: Target,
    title: "Project-Based Curriculum",
    description: "Build real-world projects that you can add to your portfolio and showcase to employers.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Our alumni have landed jobs at top tech companies like Google, Meta, and Amazon.",
  },
  {
    icon: CheckCircle2,
    title: "Lifetime Access",
    description: "Once enrolled, you get lifetime access to all course materials and future updates.",
  },
]

export function WhyLearnSection() {
  // Scroll Reveal Hook
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section
      ref={ref}
      className={`py-24 relative overflow-hidden reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Black & Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0505] to-[#2d0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Learn with <span className="text-red-500">Codify</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers through our comprehensive learning platform.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group relative p-8 rounded-2xl reveal ${
                isVisible ? "visible" : ""
              } bg-gradient-to-br from-gray-900/80 to-black/80 border border-red-900/30 hover:border-red-500/50 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-red-500" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border border-red-500/30 shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
