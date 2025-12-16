import { useState } from "react"

export function MissionSection() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">
          Our <span className="text-red-500">Mission</span>
        </h2>

        <div
          className="relative w-full max-w-2xl mx-auto h-96 cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`absolute inset-0 transition-all duration-700 transform-style-3d ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* 🔹 Front Side */}
            <div className="absolute inset-0 glassmorphism rounded-2xl p-12 flex flex-col items-center justify-center backface-hidden hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-shadow">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                Why Codify Exists
              </h3>
              <p className="text-gray-300 text-center">
                Tap to discover what drives us
              </p>
            </div>

            {/* 🔻 Back Side */}
            <div className="absolute inset-0 glassmorphism rounded-2xl p-12 flex flex-col items-center justify-center [transform:rotateY(180deg)] backface-hidden hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-shadow">
              <p className="text-xl text-gray-200 leading-relaxed text-center">
                Our mission is to help students and developers stay consistent,
                track their coding journey, and grow with clarity. Codify brings
                together problem-solving, learning resources, notes, and platform
                analytics in one place — turning daily effort into long-term
                progress.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Click the card to flip
        </p>
      </div>
    </section>
  )
}
