import Button from './Button'

interface EmptyStateAction {
  label: string
  onClick: () => void
}

interface EmptyStateProps {
  title: string
  description: string
  action?: EmptyStateAction
  icon?: string
}

const iconMap: Record<string, JSX.Element> = {
  search: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  heart: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  balance: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 6M6 7l3 9M6 7l6-1m6 11a5.002 5.002 0 01-5.909-5.724m12.846 0c.896.477 1.754 1.033 2.553 1.659M15 7h3m9 5a9 9 0 11-18 0 9 9 0 0118 0zm-5 4h.01M9 9h.01" />
    </svg>
  ),
  building: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    </svg>
  ),
  book: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.105 3.07 9.772 7.5 11.996m0-13c5.5 0 10 4.747 10 10.25 0 5.105-3.07 9.772-7.5 11.996" />
    </svg>
  ),
  chart: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  compass: (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7.16M9 20l6-5.557m0 0l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.553-.894L15 7.16M9 20v-7m6-4v7m6-5.557l-9 5.5" />
    </svg>
  ),
}

export default function EmptyState({ title, description, action, icon = 'inbox' }: EmptyStateProps): JSX.Element {
  const iconComponent = icon && iconMap[icon as keyof typeof iconMap]

  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
      {iconComponent && <div className="mb-3">{iconComponent}</div>}
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mx-auto mb-4 max-w-md text-sm text-gray-500">{description}</p>
      {action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
    </div>
  )
}
