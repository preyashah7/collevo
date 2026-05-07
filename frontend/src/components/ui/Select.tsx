import React from 'react'

export default function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
  const { className = '', children, ...rest } = props

  return (
    <select {...rest} className={`w-full border border-[#E5E7EB] rounded-md px-3 py-2 ${className}`}>
      {children}
    </select>
  )
}
