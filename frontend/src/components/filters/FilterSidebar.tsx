import React from 'react'
import type { CollegeFilters } from '../../types'

interface FilterSidebarProps {
  filters: CollegeFilters
  onChange: (next: CollegeFilters) => void
  onClear: () => void
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

const streams = ['Engineering', 'Management', 'Medical', 'Law', 'Design', 'Science', 'Commerce', 'Architecture']
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Telangana', 'Punjab', 'West Bengal']
const types = ['government', 'private', 'deemed', 'autonomous']
const exams = ['JEE Main', 'JEE Advanced', 'CAT', 'NEET', 'GATE', 'CLAT', 'GMAT', 'XAT']

function FilterSection({ title, children }: SectionProps): JSX.Element {
  const [open, setOpen] = React.useState(true)
  return (
    <section className="border-b border-gray-100 py-3">
      <button type="button" onClick={() => setOpen((prev) => !prev)} className="flex w-full items-center justify-between text-left text-sm font-semibold text-gray-800">
        {title}
        <span className="text-gray-500">{open ? '▾' : '▸'}</span>
      </button>
      {open ? <div className="mt-3 space-y-2">{children}</div> : null}
    </section>
  )
}

const mapSort = (value: string): string => {
  if (value === 'rating') return 'rating_desc'
  if (value === 'fees_low') return 'fees_asc'
  if (value === 'fees_high') return 'fees_desc'
  if (value === 'nirf') return 'ranking'
  return ''
}

export default function FilterSidebar({ filters, onChange, onClear }: FilterSidebarProps): JSX.Element {
  const hasActiveFilters = Object.entries(filters).some(([, value]) => value !== undefined && value !== '')

  return (
    <aside className="sticky top-24 hidden h-fit w-[260px] rounded-xl border border-gray-200 bg-white p-4 lg:block">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-700">Filters</h2>

      <FilterSection title="Stream">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="radio" name="stream" checked={!filters.stream} onChange={() => onChange({ ...filters, stream: undefined })} /> All
        </label>
        {streams.map((stream) => (
          <label key={stream} className="flex items-center gap-2 text-sm text-gray-600">
            <input type="radio" name="stream" checked={filters.stream === stream} onChange={() => onChange({ ...filters, stream, page: 1 })} /> {stream}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="State">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="radio" name="state" checked={!filters.state} onChange={() => onChange({ ...filters, state: undefined })} /> All
        </label>
        {states.map((state) => (
          <label key={state} className="flex items-center gap-2 text-sm text-gray-600">
            <input type="radio" name="state" checked={filters.state === state} onChange={() => onChange({ ...filters, state, page: 1 })} /> {state}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Type">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="radio" name="type" checked={!filters.type} onChange={() => onChange({ ...filters, type: undefined })} /> All
        </label>
        {types.map((type) => (
          <label key={type} className="flex items-center gap-2 text-sm text-gray-600 capitalize">
            <input type="radio" name="type" checked={filters.type === type} onChange={() => onChange({ ...filters, type, page: 1 })} /> {type}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Fees">
        <input
          type="range"
          min={0}
          max={20}
          step={1}
          value={typeof filters.fees_max === 'number' ? filters.fees_max : 20}
          onChange={(event) => onChange({ ...filters, fees_max: Number(event.target.value), page: 1 })}
          className="w-full accent-orange-500"
        />
        <p className="text-xs text-gray-500">Up to ₹{typeof filters.fees_max === 'number' ? filters.fees_max : 20}L / year</p>
      </FilterSection>

      <FilterSection title="Exam Accepted">
        {exams.map((exam) => (
          <label key={exam} className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.exam === exam}
              onChange={(event) => onChange({ ...filters, exam: event.target.checked ? exam : undefined, page: 1 })}
            />
            {exam}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Sort By">
        <select
          value={filters.sort ?? ''}
          onChange={(event) => onChange({ ...filters, sort: mapSort(event.target.value), page: 1 })}
          className="w-full rounded-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Popularity</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="fees_low">Fees (Low to High)</option>
          <option value="fees_high">Fees (High to Low)</option>
          <option value="nirf">NIRF Ranking</option>
        </select>
      </FilterSection>

      {hasActiveFilters ? (
        <button type="button" onClick={onClear} className="mt-4 text-sm font-medium text-orange-600 hover:text-orange-700">
          Clear All Filters
        </button>
      ) : null}
    </aside>
  )
}
