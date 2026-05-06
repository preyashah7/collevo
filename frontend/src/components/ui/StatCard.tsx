interface StatCardProps {
  label: string
  value: string
  subtext?: string
  color?: 'default' | 'green' | 'orange' | 'blue'
}

const colorMap: Record<NonNullable<StatCardProps['color']>, string> = {
  default: 'text-gray-900',
  green: 'text-green-600',
  orange: 'text-orange-600',
  blue: 'text-blue-600'
}

export default function StatCard({ label, value, subtext, color = 'default' }: StatCardProps): JSX.Element {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${colorMap[color]}`}>{value}</p>
      {subtext ? <p className="mt-1 text-xs text-gray-400">{subtext}</p> : null}
    </div>
  )
}
