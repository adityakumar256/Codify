export default function PremiumInput({ icon, endIcon, className = "", ...props }) {
  return (
    <div className="relative group glow-on-hover rounded-xl">
      
      {/* Focus glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#636B2F] to-[#D4DE95] opacity-0 group-focus-within:opacity-100 blur-md transition-opacity duration-300 -z-10" />

      <div className="relative flex items-center bg-gradient-to-r from-[#BAC095]/40 to-[#D4DE95]/30 rounded-xl border border-[#636B2F]/20 group-hover:border-[#636B2F]/40 group-focus-within:border-[#636B2F]/60 transition-all duration-300 overflow-hidden transform group-hover:scale-[1.01] group-focus-within:scale-[1.02]">

        {/* Inner shadow */}
        <div className="absolute inset-0 shadow-inner shadow-[#3D4127]/5 pointer-events-none rounded-xl" />

        {icon && (
          <div className="pl-4 text-[#636B2F] group-focus-within:text-[#3D4127] transition-all duration-300 group-hover:rotate-12 group-focus-within:animate-bounce-subtle">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`
            w-full px-4 py-4 bg-transparent text-[#3D4127]
            placeholder-[#636B2F]/60 focus:outline-none transition-all duration-300
            ${icon ? "pl-3" : "pl-4"}
            ${endIcon ? "pr-3" : "pr-4"}
            ${className}
          `}
          style={{ fontFamily: "var(--font-inter)" }}
        />

        {endIcon && <div className="pr-4">{endIcon}</div>}
      </div>
    </div>
  );
}
