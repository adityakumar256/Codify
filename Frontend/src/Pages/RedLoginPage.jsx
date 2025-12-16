import RedLoginCard from "../components/auth/RedLoginCard";

const RedLoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">

      {/* Multi-layered red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#38000A] via-[#9B1313] to-[#CD1C18]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#38000A]/80 via-transparent to-[#FFA896]/20" />

      {/* Bokeh sparkles */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#FFA896]/30 blur-2xl animate-bokeh" />
      <div
        className="absolute top-40 right-32 w-24 h-24 rounded-full bg-[#CD1C18]/40 blur-xl animate-bokeh"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-[#FFA896]/20 blur-3xl animate-bokeh"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-[#9B1313]/30 blur-2xl animate-bokeh"
        style={{ animationDelay: "-1s" }}
      />
      <div
        className="absolute top-1/2 left-10 w-20 h-20 rounded-full bg-[#FFA896]/25 blur-xl animate-bokeh"
        style={{ animationDelay: "-3s" }}
      />

      {/* Light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFA896]/30 to-transparent animate-light-streak"
        />
        <div
          className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#CD1C18]/20 to-transparent animate-light-streak"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFA896]/20 to-transparent animate-light-streak"
          style={{ animationDelay: "-1s" }}
        />
      </div>

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[#FFA896] rounded-full animate-sparkle"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 animate-fade-in">

        {/* Branding Section */}
        <div className="hidden lg:flex flex-1 flex-col text-left space-y-6 px-4">
          <div className="space-y-4">
            <h1
              className="text-5xl lg:text-6xl font-bold text-white tracking-tight letter-space-hover cursor-default"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Welcome
              <span className="block animate-red-shimmer animate-red-pulse-glow">
                Back
              </span>
            </h1>

            <p
              className="text-xl text-[#FFA896]/90 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Sign in to continue your journey with us. Your experience awaits.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-8 group cursor-pointer">
            <div className="w-16 h-1 bg-gradient-to-r from-[#FFA896] to-[#CD1C18] rounded-full transition-all duration-500 group-hover:w-24 group-hover:h-2" />
            <div className="w-8 h-1 bg-gradient-to-r from-[#CD1C18] to-[#9B1313] rounded-full transition-all duration-500 group-hover:w-16 group-hover:h-2" />
            <div className="w-4 h-1 bg-[#FFA896] rounded-full transition-all duration-500 group-hover:w-8 group-hover:h-2 animate-bounce-subtle" />
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <RedLoginCard />
        </div>

      </div>
    </div>
  );
};

export default RedLoginPage;
