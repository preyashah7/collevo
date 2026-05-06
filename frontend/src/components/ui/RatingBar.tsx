interface RatingBarProps {
  label: string
  value: number
  maxValue?: number
}

const getBarColor = (value: number): string => {
  if (value >= 4) return 'bg-orange-500'
  if (value >= 3) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function RatingBar({ label, value, maxValue = 5 }: RatingBarProps): JSX.Element {
  const normalized = Math.max(0, Math.min(value, maxValue))
  const percentage = (normalized / maxValue) * 100

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">{normalized.toFixed(1)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div className={`h-full rounded-full ${getBarColor(normalized)}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
