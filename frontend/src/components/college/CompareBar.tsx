import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { useCompareContext } from '../../context/CompareContext'

export default function CompareBar(): JSX.Element {
  const navigate = useNavigate()
  const { compareList, removeFromCompare, clearCompare, compareCount } = useCompareContext()

  if (compareCount === 0) return <></>

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-lg transition-all sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <p className="text-sm font-medium text-gray-700">Comparing {compareCount} colleges</p>

        <div className="flex flex-1 flex-wrap gap-2">
          {compareList.slice(0, 3).map((college) => (
            <span key={college.id} className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700">
              {college.name}
              <button
                type="button"
                onClick={() => removeFromCompare(college.id)}
                className="font-bold text-orange-600"
                aria-label="Remove college"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" disabled={compareCount < 2} onClick={() => navigate('/compare')}>
            Compare Now
          </Button>
          <button type="button" onClick={clearCompare} className="text-sm text-gray-500 underline-offset-2 hover:text-gray-700 hover:underline">
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
}
