"use client";

import { useEffect, useState } from "react";

const platformIcons = {
  leetcode: "💻",
  codechef: "👨‍🍳",
  codeforces: "⚔",
  hackerrank: "🎯",
  gfg: "🤓",
  geeksforgeeks: "🤓",
  github: "🐙",
};

export function FocusedCardView({ platform, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setParticles(
          [...Array(20)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 2 + Math.random() * 2,
          }))
        );
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible
          ? "bg-black/90 backdrop-blur-xl"
          : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all duration-300 group"
        onClick={handleClose}
      >
        <svg
          className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Focused Card */}
      <div
        className={`relative max-w-4xl w-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 transform ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-5 rounded-3xl`}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="text-6xl md:text-7xl animate-bounce">
              {platformIcons[platform.key] || "🧩"}
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                {platform.name}
              </h2>
              <p className="text-neutral-400">Detailed Statistics & Progress</p>
            </div>
          </div>

          {/* Celebration */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full">
              <span className="text-2xl animate-pulse">🎉</span>
              <span className="text-neutral-300">
                Keep up the amazing work!
              </span>
              <span
                className="text-2xl animate-pulse"
                style={{ animationDelay: "500ms" }}
              >
                🚀
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-red-500 rounded-full animate-particle-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.id * 100}ms`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`}
      />
      <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800 rounded-2xl p-6">
        <div className="text-3xl mb-3">{icon}</div>
        <div className="text-sm text-neutral-400 mb-2">{label}</div>
        <div
          className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
