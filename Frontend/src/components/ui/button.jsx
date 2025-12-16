import React from 'react'

export function Button({ children, className = '', variant = 'default', size = 'md', ...props }) {
  const sizeClass = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }[size] || 'px-4 py-2'
  
  const variantClass = {
    default: 'bg-black text-white hover:bg-gray-900',
    ghost: 'bg-transparent text-inherit hover:bg-gray-100',
    outline: 'border border-current bg-transparent hover:bg-current/10'
  }[variant] || 'bg-black text-white hover:bg-gray-900'
  
  const base = `${sizeClass} ${variantClass} rounded-md transition-all duration-200`
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
