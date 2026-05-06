import React from 'react'

export default function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
  return <select {...props} className={`border border-[#E5E7EB] rounded-md px-3 py-2 ${props.className ?? ''}`} />
}
