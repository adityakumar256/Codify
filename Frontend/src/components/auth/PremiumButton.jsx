export default function PremiumButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        relative w-full py-4 px-6 rounded-xl font-semibold text-lg
        bg-gradient-to-r from-[#3D4127] via-[#636B2F] to-[#D4DE95]
        text-[#D4DE95] hover:text-white
        overflow-hidden group ripple-effect
        transform hover:scale-[1.03] active:scale-[0.97]
        transition-all duration-300 ease-out
        shadow-lg shadow-[#3D4127]/30 hover:shadow-2xl hover:shadow-[#3D4127]/50
        hover:rotate-[0.5deg]
        ${className}
      `}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none" />

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#636B2F] via-[#BAC095]/30 to-[#D4DE95] blur-xl transition-opacity duration-500 -z-10" />

      {/* Animated shine */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 ease-out" />

      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#D4DE95]/50 transition-all duration-300" />

      <span className="relative z-10 tracking-wide group-hover:tracking-widest transition-all duration-300">
        {children}
      </span>
    </button>
  );
}
