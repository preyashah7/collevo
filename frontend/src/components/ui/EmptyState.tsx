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

export default function EmptyState({ title, description, action, icon = '📭' }: EmptyStateProps): JSX.Element {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mx-auto mb-4 max-w-md text-sm text-gray-500">{description}</p>
      {action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
    </div>
  )
}
