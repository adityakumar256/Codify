import { useEffect, useRef, useState } from "react"

const timelineEvents = [
  {
    year: "2023",
    title: "The Idea",
    description:
      "Codify started as a personal idea to track coding progress, DSA practice, and learning consistency in one place.",
  },
  {
    year: "Early 2024",
    title: "First Build",
    description:
      "Built the first version of Codify with dashboard analytics, authentication, and platform stats for learners.",
  },
  {
    year: "Mid 2024",
    title: "Learning Hub",
    description:
      "Introduced notes library, resource management, and structured learning content for students.",
  },
  {
    year: "Late 2024",
    title: "Platform Integration",
    description:
      "Integrated multiple coding platforms to track problems solved, ratings, and overall progress seamlessly.",
  },
  {
    year: "Now",
    title: "Growing Community",
    description:
      "Codify is evolving into a complete developer companion — helping learners stay consistent, focused, and confident.",
  },
]

export function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineEvents.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) =>
                  prev.includes(index) ? prev : [...prev, index]
                )
              }, index * 300)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-8 py-24"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-center mb-20 text-white">
          Our <span className="text-red-500">Journey</span>
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-red-500 to-red-600" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <div className="glassmorphism p-6 rounded-xl hover-tilt hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all">
                    <div className="text-red-500 font-bold text-2xl mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse-glow" />
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
