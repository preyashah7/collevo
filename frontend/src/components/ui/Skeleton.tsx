interface SkeletonRectProps {
  className?: string
}

interface SkeletonTextProps {
  width?: string
  height?: string
  className?: string
}

export function SkeletonRect({ className = '' }: SkeletonRectProps): JSX.Element {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
}

export function SkeletonText({ width = 'w-full', height = 'h-4', className = '' }: SkeletonTextProps): JSX.Element {
  return <div className={`animate-pulse rounded bg-gray-200 ${width} ${height} ${className}`} />
}

export function SkeletonCard(): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
        <div className="min-w-0 flex-1 space-y-2">
          <SkeletonText width="w-11/12" />
          <SkeletonText width="w-2/3" height="h-3" />
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <SkeletonRect className="h-10" />
        <SkeletonRect className="h-10" />
        <SkeletonRect className="h-10" />
        <SkeletonRect className="h-10" />
      </div>
      <div className="space-y-2">
        <SkeletonText width="w-3/4" height="h-3" />
        <SkeletonText width="w-1/2" height="h-3" />
      </div>
    </div>
  )
}

export default SkeletonRect
