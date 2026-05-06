import React from 'react'
import { useSearchParams } from 'react-router-dom'
import CollegeCard from '../components/college/CollegeCard'
import CollegeCardSkeleton from '../components/college/CollegeCardSkeleton'
import FilterBottomSheet from '../components/filters/FilterBottomSheet'
import FilterSidebar from '../components/filters/FilterSidebar'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import useColleges from '../hooks/useColleges'
import type { CollegeFilters } from '../types'

const toFilters = (params: URLSearchParams): CollegeFilters => {
  const page = Number(params.get('page') || '1')
  const limit = Number(params.get('limit') || '10')
  const feesMax = params.get('fees_max')
  const ratingMin = params.get('rating_min')
  return {
    search: params.get('search') || undefined,
    stream: params.get('stream') || undefined,
    state: params.get('state') || undefined,
    city: params.get('city') || undefined,
    type: params.get('type') || undefined,
    sort: params.get('sort') || undefined,
    exam: params.get('exam') || undefined,
    page,
    limit,
    fees_max: feesMax ? Number(feesMax) : undefined,
    rating_min: ratingMin ? Number(ratingMin) : undefined
  }
}

const toParams = (filters: CollegeFilters): URLSearchParams => {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.set(key, String(value))
  })
  return params
}

export default function CollegeList(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = React.useMemo(() => toFilters(searchParams), [searchParams])
  const { colleges, filters, setFilters, loading, pagination, loadMore } = useColleges(initial)
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  React.useEffect(() => {
    setSearchParams(toParams(filters), { replace: true })
  }, [filters, setSearchParams])

  const clearFilters = (): void => {
    setFilters({ page: 1, limit: 10 })
  }

  const activeFilterTags = Object.entries(filters).filter(([key, value]) => !['page', 'limit'].includes(key) && value !== undefined && value !== '')

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
      <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} />

      <div className="min-w-0 flex-1">
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{pagination.total || colleges.length}</span> colleges found
            </p>

            <div className="flex items-center gap-2">
              <select
                value={filters.sort ?? ''}
                onChange={(event) => setFilters({ sort: event.target.value || undefined, page: 1 })}
                className="rounded-md border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="">Popularity</option>
                <option value="rating_desc">Rating (High to Low)</option>
                <option value="fees_asc">Fees (Low to High)</option>
                <option value="fees_desc">Fees (High to Low)</option>
                <option value="ranking">NIRF Ranking</option>
              </select>

              <button type="button" className="rounded-md border border-gray-200 px-3 py-2 text-sm lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                Filters
              </button>
            </div>
          </div>

          {activeFilterTags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeFilterTags.map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilters({ ...filters, [key]: undefined, page: 1 })}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700"
                >
                  {key}: {String(value)} ×
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {loading && colleges.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <CollegeCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!loading && colleges.length === 0 ? (
          <EmptyState
            title="No colleges found"
            description="Try changing filters to broaden your results."
            icon="🔎"
            action={{ label: 'Clear Filters', onClick: clearFilters }}
          />
        ) : null}

        {colleges.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {colleges.length} of {pagination.total || colleges.length} colleges
              </p>
              {pagination.totalPages > pagination.page ? (
                <Button loading={loading} onClick={() => void loadMore()}>
                  Load More
                </Button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      <FilterBottomSheet
        filters={filters}
        onChange={setFilters}
        onClear={clearFilters}
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </div>
  )
}
