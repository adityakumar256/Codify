import React from 'react'

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>
}

export function DropdownMenuTrigger({ children, className = '', ...props }) {
  return (
    <button className={`flex items-center gap-1 ${className}`} {...props}>
      {children}
    </button>
  )
}

export function DropdownMenuContent({ children, className = '' }) {
  return <div className={`absolute mt-2 rounded-md shadow-md ${className}`}>{children}</div>
}

export function DropdownMenuItem({ children, className = '', ...props }) {
  return (
    <div className={`px-3 py-2 cursor-pointer ${className}`} {...props}>
      {children}
    </div>
  )
}

export default DropdownMenu