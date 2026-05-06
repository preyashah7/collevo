import { getInitials } from '../../utils/helpers'

interface CollegeBannerProps {
  bannerUrl: string | null
  name: string
}

export default function CollegeBanner({ bannerUrl, name }: CollegeBannerProps): JSX.Element {
  // Hash function to generate consistent color based on college name
  const getColorFromName = (text: string): { bg: string; accent: string } => {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i)
      hash = hash & hash // Convert to 32bit integer
    }

    const colors = [
      { bg: 'from-orange-400 to-orange-600', accent: 'text-orange-100' },
      { bg: 'from-blue-400 to-blue-600', accent: 'text-blue-100' },
      { bg: 'from-purple-400 to-purple-600', accent: 'text-purple-100' },
      { bg: 'from-pink-400 to-pink-600', accent: 'text-pink-100' },
      { bg: 'from-green-400 to-green-600', accent: 'text-green-100' },
      { bg: 'from-indigo-400 to-indigo-600', accent: 'text-indigo-100' },
      { bg: 'from-rose-400 to-rose-600', accent: 'text-rose-100' },
      { bg: 'from-amber-400 to-amber-600', accent: 'text-amber-100' }
    ]

    return colors[Math.abs(hash) % colors.length]
  }

  if (bannerUrl) {
    return (
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-64">
        <img
          src={bannerUrl}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Hide the broken image
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    )
  }

  const { bg, accent } = getColorFromName(name)

  return (
    <div
      className={`relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center sm:h-64`}
    >
      <div className={`text-center ${accent}`}>
        <div className="text-6xl font-bold opacity-20">{getInitials(name)}</div>
        <div className="mt-2 text-sm font-medium opacity-60">College Banner</div>
      </div>
    </div>
  )
}
