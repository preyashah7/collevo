import type { CollegeFilters } from '../../types'
import Button from '../ui/Button'

interface FilterBottomSheetProps {
  filters: CollegeFilters
  onChange: (next: CollegeFilters) => void
  onClear: () => void
  isOpen: boolean
  onClose: () => void
}

const streams = ['Engineering', 'Management', 'Medical', 'Law', 'Design', 'Science', 'Commerce', 'Architecture']
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Telangana', 'Punjab', 'West Bengal']
const types = ['government', 'private', 'deemed', 'autonomous']

const mapSort = (value: string): string => {
  if (value === 'rating') return 'rating_desc'
  if (value === 'fees_low') return 'fees_asc'
  if (value === 'fees_high') return 'fees_desc'
  if (value === 'nirf') return 'ranking'
  return ''
}

export default function FilterBottomSheet({ filters, onChange, onClear, isOpen, onClose }: FilterBottomSheetProps): JSX.Element {
  return (
    <>
      {isOpen ? <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} /> : null}

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-4 transition-transform duration-200 lg:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Filters</h3>
          <button type="button" onClick={onClose} className="text-xl text-gray-500" aria-label="Close filters">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Stream</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onChange({ ...filters, stream: undefined, page: 1 })} className={`rounded-full px-3 py-1 text-xs ${!filters.stream ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>All</button>
              {streams.map((stream) => (
                <button key={stream} type="button" onClick={() => onChange({ ...filters, stream, page: 1 })} className={`rounded-full px-3 py-1 text-xs ${filters.stream === stream ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                  {stream}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-gray-500">State</p>
            <select value={filters.state ?? ''} onChange={(event) => onChange({ ...filters, state: event.target.value || undefined, page: 1 })} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm">
              <option value="">All</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Type</p>
            <select value={filters.type ?? ''} onChange={(event) => onChange({ ...filters, type: event.target.value || undefined, page: 1 })} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm capitalize">
              <option value="">All</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Sort By</p>
            <select value={filters.sort ?? ''} onChange={(event) => onChange({ ...filters, sort: mapSort(event.target.value), page: 1 })} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm">
              <option value="">Popularity</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="fees_low">Fees (Low to High)</option>
              <option value="fees_high">Fees (High to Low)</option>
              <option value="nirf">NIRF Ranking</option>
            </select>
          </section>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Button variant="primary" className="flex-1" onClick={onClose}>
            Apply Filters
          </Button>
          <Button variant="ghost" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>
    </>
  )
}
