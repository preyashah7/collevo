import { useNavigate } from 'react-router-dom'
import CollegeCard from '../components/college/CollegeCard'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useCompareContext } from '../context/CompareContext'
import { useSavedContext } from '../context/SavedContext'

export default function Saved(): JSX.Element {
  const navigate = useNavigate()
  const { savedColleges, loading } = useSavedContext()
  const { addToCompare } = useCompareContext()

  const onCompareSaved = (): void => {
    savedColleges.slice(0, 3).forEach((college) => addToCompare(college))
    navigate('/compare')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">
          Your Saved Colleges <span className="rounded-full bg-orange-100 px-2 py-1 text-sm text-orange-700">{savedColleges.length}</span>
        </h1>
        <Button onClick={onCompareSaved} disabled={savedColleges.length < 2}>
          Compare Saved
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-xl bg-white" />
          ))}
        </div>
      ) : null}

      {!loading && savedColleges.length === 0 ? (
        <EmptyState
          icon="💙"
          title="You haven't saved any colleges yet"
          description="Save colleges from the listing page to shortlist your options."
          action={{ label: 'Browse Colleges →', onClick: () => navigate('/colleges') }}
        />
      ) : null}

      {savedColleges.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {savedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
