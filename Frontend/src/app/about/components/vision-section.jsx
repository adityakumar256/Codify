import { useEffect, useRef, useState } from "react"

export function VisionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
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
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-5xl font-bold mb-12 text-white">
          Our <span className="text-red-500">Vision</span>
        </h2>

        <div
          className={`glassmorphism p-12 rounded-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {/* Vision Text */}
          <p className="text-2xl text-gray-200 leading-relaxed mb-8">
            Our vision is to make Codify a trusted companion for every learner —
            a single place where students and developers can track progress,
            stay consistent, and grow with confidence throughout their coding
            journey.
          </p>

          <p className="text-lg text-gray-400 leading-relaxed mb-12">
            We aim to bridge the gap between learning and real progress by
            combining analytics, structured resources, and community-driven
            growth — helping learners focus on what truly matters.
          </p>

          {/* Vision Pills */}
          <div className="flex items-center justify-center gap-6 flex-wrap mt-12">
            <div className="glassmorphism px-6 py-3 rounded-full text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-default">
              <span className="text-red-500 font-bold">One Platform</span>
              <span className="text-gray-400 ml-2">For Growth</span>
            </div>

            <div className="glassmorphism px-6 py-3 rounded-full text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-default">
              <span className="text-red-500 font-bold">Built</span>
              <span className="text-gray-400 ml-2">By Learners</span>
            </div>

            <div className="glassmorphism px-6 py-3 rounded-full text-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-default">
              <span className="text-red-500 font-bold">Focused</span>
              <span className="text-gray-400 ml-2">On Consistency</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
