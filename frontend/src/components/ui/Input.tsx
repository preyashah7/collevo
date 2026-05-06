import React from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  type?: string
  icon?: React.ReactNode
  className?: string
  error?: string
  label?: string
  name?: string
  disabled?: boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

export default function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  className = '',
  error,
  label,
  name,
  disabled,
  onKeyDown
}: InputProps): JSX.Element {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span> : null}
      <span className="relative block">
        {icon ? <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span> : null}
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          disabled={disabled}
          onKeyDown={onKeyDown}
          className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${icon ? 'pl-9' : ''} ${error ? 'border-red-500' : 'border-gray-200'} ${disabled ? 'cursor-not-allowed bg-gray-100' : 'bg-white'} ${className}`}
        />
      </span>
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  )
}
