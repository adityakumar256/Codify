

import { Code2, Zap, Users, Award } from "lucide-react"
import useScrollReveal from "@/hooks/useScrollReveal"

const features = [
  {
    icon: Code2,
    title: "Interactive Coding",
    description: "Write real code in your browser with instant feedback and AI assistance.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Our platform is optimized for speed, so you can focus on learning.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of developers learning and growing together.",
  },
  {
    icon: Award,
    title: "Certified Learning",
    description: "Earn industry-recognized certificates to boost your career.",
  },
]

export function GradientSection() {
  // 👇 Scroll Reveal Hook
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <section
      ref={ref}
      className={`py-24 relative reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#636B2F]/30 via-[#BAC095]/20 to-[#D4DE95]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Everything You Need to Succeed
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need to become a professional developer.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group glass rounded-2xl p-6 border reveal ${
                isVisible ? "visible" : ""
              } border-[#636B2F]/30 hover:border-[#D4DE95]/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,107,47,0.3)]`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4DE95]/20 to-[#636B2F]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-[#D4DE95]" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 neon-line opacity-50" />
      </div>
    </section>
  )
}
