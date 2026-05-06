import React from 'react'
import { getInitials } from '../../utils/helpers'

interface CollegeLogoProps {
  logoUrl: string | null
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap: Record<NonNullable<CollegeLogoProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-lg'
}

export default function CollegeLogo({ logoUrl, name, size = 'md' }: CollegeLogoProps): JSX.Element {
  const sizeClass = sizeMap[size]
  const [imageError, setImageError] = React.useState(false)

  if (logoUrl && !imageError) {
    return (
      <div className={`${sizeClass} overflow-hidden rounded-full border border-gray-100 bg-white`}>
        <img
          src={logoUrl}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      </div>
    )
  }

  return (
    <div className={`${sizeClass} flex items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700`}>
      {getInitials(name)}
    </div>
  )
}
