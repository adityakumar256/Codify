"use client"

export function RatingGraph({ rating, isLoaded, isDarkBg }) {
  const hasData = rating?.history && rating.history.length > 0

  // 🔹 Calculate only if data exists
  const maxRating = hasData
    ? Math.max(...rating.history.map(r => r.rating))
    : 0
  const minRating = hasData
    ? Math.min(...rating.history.map(r => r.rating))
    : 0
  const range = Math.max(maxRating - minRating, 1)

  const width = 500
  const height = 200
  const padding = 40
  const barWidth = hasData
    ? (width - padding * 2) / rating.history.length - 4
    : 0

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-700
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${isDarkBg ? "bg-neutral-900/50 border-neutral-800" : "bg-white/50 border-neutral-200"}
      `}
      style={{ transitionDelay: "500ms" }}
    >
      {/* Header */}
      <h3
        className={`text-lg font-semibold mb-2 ${
          isDarkBg ? "text-white" : "text-neutral-900"
        }`}
      >
        Rating
      </h3>

      {/* ===== EMPTY STATE (NO DATA) ===== */}
      {!hasData && (
        <div className="h-40 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold text-neutral-400 mb-1">
            No rating data
          </p>
          <p className="text-sm text-neutral-500">
            Participate in contests to see rating graph
          </p>
        </div>
      )}

      {/* ===== DATA STATE ===== */}
      {hasData && (
        <>
          <div className="mb-4">
            <p
              className={`text-3xl font-bold ${
                isDarkBg ? "text-white" : "text-neutral-900"
              }`}
            >
              {rating.current}
            </p>
            <p
              className={`text-sm ${
                isDarkBg ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              {rating.contest} • Rank {rating.rank}
            </p>
            <p className="text-xs text-neutral-500">{rating.date}</p>
          </div>

          <div className="relative">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-40"
            >
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map(p => (
                <line
                  key={p}
                  x1={padding}
                  y1={padding + (height - padding * 2) * p}
                  x2={width - padding}
                  y2={padding + (height - padding * 2) * p}
                  stroke={isDarkBg ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                  strokeWidth="1"
                />
              ))}

              {/* Bars */}
              {rating.history.map((r, i) => {
                const x =
                  padding +
                  (i * (width - padding * 2)) / rating.history.length +
                  2
                const barHeight =
                  ((r.rating - minRating) / range) *
                  (height - padding * 2)
                const y = height - padding - barHeight

                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="2"
                      fill="url(#columnGradient)"
                      className="cursor-pointer hover:opacity-80 transition"
                    >
                      <title>
                        Contest {r.contest}: {r.rating}
                      </title>
                    </rect>
                    <circle
                      cx={x + barWidth / 2}
                      cy={y}
                      r="3"
                      fill="#ef4444"
                    />
                  </g>
                )
              })}

              {/* Gradient */}
              <defs>
                <linearGradient
                  id="columnGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Y-axis labels */}
            <div
              className={`absolute left-0 top-0 h-full flex flex-col justify-between text-xs py-10
                ${isDarkBg ? "text-neutral-500" : "text-neutral-600"}
              `}
            >
              <span>{maxRating}</span>
              <span>{Math.round(minRating + range * 0.5)}</span>
              <span>{minRating}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
