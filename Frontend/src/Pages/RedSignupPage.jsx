import React from "react";


import RedSignupCard from "../components/auth/RedSignupCard";

export default function RedSignupPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A0000] via-[#8A0F0F] to-[#CD1C18]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00000030 1px, transparent 1px),
            linear-gradient(to bottom, #00000030 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Texture glows */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_#FFB3A7_0%,_transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_#FF6A6A_0%,_transparent_60%)]" />

      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#FFB3A7]/20 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#FF6A6A]/10 blur-3xl animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-[#FF7F7F]/25 blur-2xl animate-float"
        style={{ animationDelay: "-1.5s" }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 animate-fade-in">

        {/* Left side text */}
        <div className="flex-1 text-center lg:text-left space-y-6 px-4">
          <div className="space-y-2">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Welcome
              <span className="block animate-shimmer animate-pulse-glow text-[#FFB3A7]">Aboard</span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/80 max-w-md mx-auto lg:mx-0"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Join our platform to explore exclusive content and personalized learning experiences.
            </p>
          </div>
        </div>

        {/* Right side card */}
        <div className="w-full max-w-md animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <RedSignupCard />
        </div>

      </div>
    </div>
  );
}
