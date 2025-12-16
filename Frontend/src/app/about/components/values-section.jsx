import { useEffect, useRef, useState } from "react"

const values = [
  {
    icon: "🧠",
    title: "Learning First",
    description:
      "We prioritize deep understanding, problem-solving, and real growth over shortcuts.",
  },
  {
    icon: "📈",
    title: "Consistency",
    description:
      "Small daily efforts compound into big results — Codify is built to support that journey.",
  },
  {
    icon: "🤝",
    title: "Community",
    description:
      "Learning is better together. We grow by sharing knowledge, resources, and experiences.",
  },
  {
    icon: "🚀",
    title: "Growth Mindset",
    description:
      "From beginner to advanced, Codify evolves with you at every stage of your coding journey.",
  },
]

export function ValuesSection() {
  const [visibleCards, setVisibleCards] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            values.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) =>
                  prev.includes(index) ? prev : [...prev, index]
                )
              }, index * 200)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-8"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">
          Our <span className="text-red-500">Values</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className={`glassmorphism p-8 rounded-xl text-center hover-tilt transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className="text-6xl mb-4 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {value.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {value.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
