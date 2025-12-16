import React from "react"

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-[#636b2f] bg-transparent text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bac095] transition ${className}`}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input
