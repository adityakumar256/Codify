"use client";

export function PlatformStats({ platforms = {}, isLoaded, isDarkBg }) {
  const hasPlatforms =
    platforms && Object.values(platforms).some(p => (p?.count || 0) > 0);

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-700
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${
          isDarkBg
            ? "bg-neutral-900/50 border-neutral-800"
            : "bg-white/50 border-neutral-200"
        }
      `}
      style={{ transitionDelay: "400ms" }}
    >
      <h3
        className={`text-lg font-semibold mb-6 ${
          isDarkBg ? "text-white" : "text-neutral-900"
        }`}
      >
        Platform Stats
      </h3>

      {/* 🔴 EMPTY STATE */}
      {!hasPlatforms && (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-neutral-400 mb-2">
            No platforms connected
          </p>
          <p className="text-sm text-neutral-500">
            Connect your coding platforms to see stats here
          </p>
        </div>
      )}

      {/* 🟢 DATA STATE */}
      {hasPlatforms && (
        <div className="space-y-4">
          {Object.entries(platforms)
            .filter(([, data]) => (data?.count || 0) > 0)
            .map(([key, platform]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300
                  ${
                    isDarkBg
                      ? "bg-neutral-800/30 hover:bg-neutral-800/50"
                      : "bg-neutral-100/50 hover:bg-neutral-200/50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-sm font-bold text-white">
                    {platform.icon}
                  </div>
                  <span
                    className={`font-medium ${
                      isDarkBg ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {platform.name}
                  </span>
                </div>

                <span
                  className={`text-2xl font-bold ${
                    isDarkBg ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {platform.count}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
