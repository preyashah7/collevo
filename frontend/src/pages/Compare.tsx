import React from 'react'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CollegeLogo from '../components/college/CollegeLogo'
import { useCompareContext } from '../context/CompareContext'
import { collegeApi } from '../services/api'
import type { College } from '../types'
import { formatFees, formatPackage, formatRating } from '../utils/helpers'

interface CompareRow {
  label: string
  type: 'text' | 'number'
  values: Array<string | number | null>
  better?: 'higher' | 'lower'
}

const getWinnerIndexes = (values: Array<string | number | null>, better: 'higher' | 'lower' | undefined): number[] => {
  if (!better) return []
  const numeric = values.map((value, index) => ({ value: typeof value === 'number' ? value : null, index })).filter((item): item is { value: number; index: number } => item.value !== null)
  if (numeric.length === 0) return []
  const target = better === 'higher' ? Math.max(...numeric.map((item) => item.value)) : Math.min(...numeric.map((item) => item.value))
  return numeric.filter((item) => item.value === target).map((item) => item.index)
}

export default function Compare(): JSX.Element {
  const { compareList, addToCompare, removeFromCompare, clearCompare, compareCount } = useCompareContext()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<College[]>([])

  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const timer = window.setTimeout(async () => {
      try {
        const response = await collegeApi.search(query)
        setResults(response.data.data ?? [])
      } catch {
        setResults([])
      }
    }, 250)

    return () => window.clearTimeout(timer)
  }, [query])

  const rows: CompareRow[] = [
    { label: 'Location', type: 'text', values: compareList.map((college) => `${college.city}, ${college.state}`) },
    { label: 'Type', type: 'text', values: compareList.map((college) => college.type) },
    { label: 'Established Year', type: 'number', values: compareList.map((college) => college.established_year), better: 'lower' },
    { label: 'Campus Size', type: 'number', values: compareList.map((college) => college.campus_size_acres), better: 'higher' },
    { label: 'NAAC Grade', type: 'text', values: compareList.map((college) => college.naac_grade ?? 'N/A') },
    { label: 'NIRF Ranking', type: 'number', values: compareList.map((college) => college.nirf_ranking), better: 'lower' },
    { label: 'Fees per Year', type: 'number', values: compareList.map((college) => college.placement_avg_package_lpa ? college.placement_avg_package_lpa * 100000 : null), better: 'lower' },
    { label: 'Avg Package LPA', type: 'number', values: compareList.map((college) => college.placement_avg_package_lpa), better: 'higher' },
    { label: 'Highest Package', type: 'number', values: compareList.map((college) => college.placement_highest_package_cr), better: 'higher' },
    { label: 'Placement %', type: 'number', values: compareList.map((college) => college.placement_percent), better: 'higher' },
    { label: 'Companies Count', type: 'number', values: compareList.map((college) => college.placement_companies_count), better: 'higher' },
    { label: 'Overall Rating', type: 'number', values: compareList.map((college) => college.overall_rating), better: 'higher' },
    { label: 'Total Reviews', type: 'number', values: compareList.map((college) => college.total_reviews), better: 'higher' }
  ]

  const addFromSearch = (college: College): void => {
    addToCompare(college)
    setQuery('')
    setResults([])
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => void navigator.clipboard.writeText(window.location.href)}>
            Share Comparison
          </Button>
          <Button variant="ghost" onClick={clearCompare}>Clear All</Button>
        </div>
      </div>

      {compareCount === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="No colleges selected for comparison"
            description="Pick up to 3 colleges from the listing page and compare them here."
            icon="balance"
            action={{ label: 'Browse Colleges', onClick: () => (window.location.href = '/colleges') }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 rounded-xl border-2 border-dashed border-gray-300 bg-white" />
            ))}
          </div>
        </div>
      ) : null}

      {compareCount === 1 ? (
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-gray-200 bg-white p-4">
            <CollegeLogo logoUrl={compareList[0].logo_url} name={compareList[0].name} size="md" />
            <h2 className="mt-2 font-semibold">{compareList[0].name}</h2>
          </article>

          {Array.from({ length: 2 }).map((_, index) => (
            <article key={index} className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-4">
              <Input placeholder="Search college to add..." value={query} onChange={(event) => setQuery(event.target.value)} />
              {results.length > 0 ? (
                <div className="mt-2 max-h-40 overflow-auto rounded-md border border-gray-100">
                  {results.map((college) => (
                    <button key={college.id} type="button" className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50" onClick={() => addFromSearch(college)}>
                      {college.name}
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {compareCount >= 2 ? (
        <div className="overflow-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="sticky left-0 z-10 bg-gray-50 px-3 py-3 text-left font-semibold text-gray-700">Criteria</th>
                {compareList.map((college) => (
                  <th key={college.id} className="px-3 py-3 align-top text-left">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <CollegeLogo logoUrl={college.logo_url} name={college.name} size="sm" />
                          <p className="font-semibold text-gray-900">{college.name}</p>
                        </div>
                        <p className="text-xs text-gray-500">{college.city}</p>
                        <Badge className="mt-1">{college.type}</Badge>
                      </div>
                      <button type="button" onClick={() => removeFromCompare(college.id)} className="text-lg text-gray-400 hover:text-red-500">×</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const winners = getWinnerIndexes(row.values, row.better)
                return (
                  <tr key={row.label} className="border-b border-gray-100">
                    <td className="sticky left-0 bg-white px-3 py-3 font-medium text-gray-700">{row.label}</td>
                    {row.values.map((value, index) => {
                      const isWinner = winners.includes(index)
                      let display = 'N/A'
                      if (row.label === 'Avg Package LPA') display = formatPackage(typeof value === 'number' ? value : null)
                      else if (row.label === 'Fees per Year') display = formatFees(typeof value === 'number' ? value : null)
                      else if (row.label === 'Overall Rating') display = formatRating(typeof value === 'number' ? value : null)
                      else if (value !== null) display = String(value)

                      return (
                        <td key={`${row.label}-${compareList[index]?.id ?? index}`} className={`px-3 py-3 text-gray-700 ${isWinner ? 'border-l-2 border-green-500 bg-green-50' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span>{display}</span>
                            {isWinner ? <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Best</span> : null}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

          {compareList.length < 3 ? (
            <div className="border-t border-gray-100 p-4">
              <Input placeholder="Add another college..." value={query} onChange={(event) => setQuery(event.target.value)} />
              {results.length > 0 ? (
                <div className="mt-2 max-h-40 overflow-auto rounded-md border border-gray-100">
                  {results.map((college) => (
                    <button key={college.id} type="button" className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50" onClick={() => addFromSearch(college)}>
                      {college.name}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
