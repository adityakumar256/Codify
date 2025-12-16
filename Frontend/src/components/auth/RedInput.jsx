export default function RedInput({ icon, isFocused = false, className = "", ...props }) {
  return (
    <div className="relative group">

      {/* Focus Glow Effect */}
      <div
        className={`
          absolute -inset-0.5 bg-gradient-to-r 
          from-[#CD1C18] via-[#FFA896] to-[#CD1C18] 
          rounded-xl blur-sm transition-opacity duration-300
          ${isFocused ? "opacity-60 animate-input-focus-glow" : "opacity-0 group-hover:opacity-30"}
        `}
      />

      <div className="relative flex items-center">

        {/* Icon */}
        {icon && (
          <div
            className={`
              absolute left-4 transition-all duration-300
              ${isFocused 
                ? "text-[#CD1C18] scale-110 rotate-12" 
                : "text-[#FFA896]/50 group-hover:text-[#FFA896]/80"
              }
            `}
          >
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          {...props}
          className={`
            w-full bg-[#FFA896]/10 border-2 transition-all duration-300
            ${isFocused ? "border-[#CD1C18]" : "border-[#FFA896]/30 hover:border-[#9B1313]"}
            rounded-xl py-4
            ${icon ? "pl-12" : "pl-4"} pr-4
            text-white placeholder-[#FFA896]/50
            focus:outline-none focus:bg-[#FFA896]/15
            ${className}
          `}
        />
      </div>
    </div>
  );
}
