"use client";

import { useState, useEffect } from "react";

export function StatsOverview({ platforms = {}, isLoaded }) {
  const [animatedTotal, setAnimatedTotal] = useState(0);

  const entries = Object.values(platforms || {});
  const totalSolved = entries.reduce((sum, p) => sum + (p.count || 0), 0);

  /* 🔁 Count-up animation */
  useEffect(() => {
    if (!isLoaded || totalSolved === 0) return;

    let current = 0;
    const increment = Math.max(1, Math.ceil(totalSolved / 50));

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalSolved) {
        setAnimatedTotal(totalSolved);
        clearInterval(timer);
      } else {
        setAnimatedTotal(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isLoaded, totalSolved]);

  const avgRating =
    entries.length > 0
      ? Math.round(
          entries.reduce((sum, p) => sum + (p.rating || 0), 0) /
            Math.max(1, entries.filter((p) => p.rating != null).length)
        )
      : 0;

  const maxStreak =
    entries.length > 0 ? Math.max(...entries.map((p) => p.streak || 0)) : 0;

  if (!entries.length) return null;

  return (
    <div className="container mx-auto px-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Problems Solved */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-500">
            <div className="text-sm text-neutral-400 mb-2">
              Total Problems Solved
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {animatedTotal.toLocaleString()}
            </div>
            <div className="mt-4 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000"
                style={{ width: isLoaded ? "100%" : "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Average Rating */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-neutral-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-500">
            <div className="text-sm text-neutral-400 mb-2">Average Rating</div>
            <div className="text-5xl font-bold text-white">
              {avgRating.toLocaleString()}
            </div>

            <div className="mt-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-gradient-to-r from-white to-neutral-300 transition-all duration-1000"
                    style={{
                      width: isLoaded ? "100%" : "0%",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Max Streak */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-500">
            <div className="text-sm text-neutral-400 mb-2">Longest Streak</div>
            <div className="flex items-center gap-3">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                {maxStreak}
              </div>
              <div className="text-4xl animate-pulse">🔥</div>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              Keep the fire burning!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
