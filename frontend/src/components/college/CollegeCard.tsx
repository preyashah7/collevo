import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { College } from '../../types'
import { formatFees, formatPackage, formatRating, getTypeColor } from '../../utils/helpers'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import CollegeLogo from './CollegeLogo'
import { useSavedContext } from '../../context/SavedContext'
import { useCompareContext } from '../../context/CompareContext'

interface CollegeCardProps {
  college: College
}

export default function CollegeCard({ college }: CollegeCardProps): JSX.Element {
  const navigate = useNavigate()
  const { isSaved, toggleSave } = useSavedContext()
  const { addToCompare, removeFromCompare, isInCompare, canAddMore, compareCount } = useCompareContext()

  const inCompare = isInCompare(college.id)
  const disabledCompare = !inCompare && !canAddMore

  const onCompareChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation()
    if (event.target.checked) {
      addToCompare(college)
      return
    }
    removeFromCompare(college.id)
  }

  const onSaveClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()
    void toggleSave(college)
  }

  return (
    <article
      className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
      onClick={() => navigate(`/colleges/${college.slug}`)}
    >
      <div className="mb-4 flex items-start gap-3">
        <CollegeLogo logoUrl={college.logo_url} name={college.name} size="md" />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{college.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {college.city}, {college.state}
          </p>
          <div className="mt-2">
            <Badge className={getTypeColor(college.type)}>{college.type}</Badge>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            onClick={onSaveClick}
            className={`text-xl leading-none transition ${isSaved(college.id) ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
            aria-label="Toggle saved"
          >
            {isSaved(college.id) ? '❤' : '♡'}
          </button>

          <label className={`flex items-center gap-1 text-xs ${disabledCompare ? 'text-gray-300' : 'text-gray-600'}`} title={disabledCompare ? 'You can compare up to 3 colleges' : ''}>
            <input
              type="checkbox"
              checked={inCompare}
              onChange={onCompareChange}
              disabled={disabledCompare}
              className="h-3 w-3 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Compare
          </label>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-2">
          <div className="text-gray-500">NIRF</div>
          <div className="font-semibold text-gray-800">{college.nirf_ranking ? `#${college.nirf_ranking}` : 'N/A'}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2">
          <div className="text-gray-500">Rating</div>
          <div className="font-semibold text-gray-800">
            ★ {formatRating(college.overall_rating)}{' '}
            <span className="font-normal text-gray-500">({college.total_reviews ?? 0})</span>
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2">
          <div className="text-gray-500">Avg Package</div>
          <div className="font-semibold text-gray-800">{formatPackage(college.placement_avg_package_lpa)}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2">
          <div className="text-gray-500">Fees</div>
          <div className="font-semibold text-gray-800">{formatFees(college.placement_avg_package_lpa ? college.placement_avg_package_lpa * 100000 : null)}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {(college.approvals ?? []).slice(0, 3).map((exam) => (
            <span key={exam} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {exam}
            </span>
          ))}
          {college.naac_grade ? (
            <Badge className={college.naac_grade.startsWith('A') ? 'bg-orange-100 text-orange-700' : ''}>{college.naac_grade}</Badge>
          ) : null}
        </div>

        <Button variant="outline" size="sm" onClick={(event) => {
          event.stopPropagation()
          navigate(`/colleges/${college.slug}`)
        }}>
          View Details
        </Button>
      </div>

      {compareCount >= 3 && !inCompare ? <p className="mt-2 text-xs text-amber-600">Remove one college to add another for compare.</p> : null}
    </article>
  )
}
