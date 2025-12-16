export default function RedButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        relative w-full py-4 px-6 rounded-xl font-semibold text-white
        bg-gradient-to-r from-[#38000A] via-[#9B1313] to-[#CD1C18]
        animate-gradient-shift overflow-hidden
        transition-all duration-400 ease-out
        hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(205,28,24,0.4)]
        active:translate-y-0 active:shadow-[0_5px_20px_rgba(205,28,24,0.3)]
        group red-ripple-effect
        ${className}
      `}
    >

      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r 
          from-transparent via-white/20 to-transparent skew-x-12 
          group-hover:animate-button-shine" 
        />
      </div>

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 
        bg-gradient-to-r from-[#CD1C18]/20 via-[#FFA896]/10 to-[#CD1C18]/20" 
      />

      {/* Button Text */}
      <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide 
        group-hover:tracking-widest transition-all duration-300"
      >
        {children}
      </span>

    </button>
  );
}
