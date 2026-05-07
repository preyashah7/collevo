import React from 'react'
import { useNavigate } from 'react-router-dom'
import { collegeApi } from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import CollegeLogo from '../components/college/CollegeLogo'
import type { College } from '../types'
import { calculateDecisionScore } from '../utils/helpers'

interface PredictorFormData {
  exam: string
  rank: number
  category: string
}

interface CategorizedColleges {
  safe: College[]
  moderate: College[]
  reach: College[]
}

export default function Predictor(): JSX.Element {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState<PredictorFormData>({
    exam: 'jee-main',
    rank: 1000,
    category: 'general'
  })
  const [results, setResults] = React.useState<CategorizedColleges | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const safeNumber = (value: unknown): number => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const parsed = Number(value)
      return Number.isFinite(parsed) ? parsed : 0
    }
    return 0
  }

  const exams = [
    { value: 'jee-main', label: 'JEE Main' },
    { value: 'jee-advanced', label: 'JEE Advanced' },
    { value: 'neet', label: 'NEET' },
    { value: 'cat', label: 'CAT' },
    { value: 'gate', label: 'GATE' },
    { value: 'clat', label: 'CLAT' }
  ]

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'obc', label: 'OBC' },
    { value: 'sc', label: 'SC' },
    { value: 'st', label: 'ST' },
    { value: 'ews', label: 'EWS' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rank' ? parseInt(value) || 0 : value
    }))
  }

  const handlePredict = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await collegeApi.getAll({ limit: 100, sort: 'ranking' })
      const colleges = response.data.data || []

      const rankedColleges = colleges
        .map((college) => ({
          ...college,
          nirf_ranking: safeNumber(college.nirf_ranking),
          overall_rating: safeNumber(college.overall_rating),
          placement_percent: safeNumber(college.placement_percent),
          placement_avg_package_lpa: safeNumber(college.placement_avg_package_lpa)
        }))
        .filter((college) => college.nirf_ranking > 0)

      const targetRank = Math.max(1, formData.rank)
      const categoryBoost = formData.category === 'general' ? 0 : formData.category === 'ews' ? 2 : formData.category === 'obc' ? 4 : 6

      const thresholds =
        targetRank <= 100
          ? { reach: 20, moderate: 40, safe: 80 }
          : targetRank <= 1000
            ? { reach: 15, moderate: 35, safe: 70 }
            : targetRank <= 5000
              ? { reach: 10, moderate: 25, safe: 60 }
              : { reach: 5, moderate: 15, safe: 40 }

      const reachLimit = thresholds.reach + categoryBoost
      const moderateLimit = thresholds.moderate + categoryBoost
      const safeLimit = thresholds.safe + categoryBoost

      const sortedByMatch = [...rankedColleges].sort((a, b) => {
        const aDiff = Math.abs(a.nirf_ranking - moderateLimit)
        const bDiff = Math.abs(b.nirf_ranking - moderateLimit)
        return aDiff - bDiff
      })

      const safe = sortedByMatch
        .filter((college) => college.nirf_ranking > safeLimit)
        .slice(0, 5)

      const moderate = sortedByMatch
        .filter((college) => college.nirf_ranking > reachLimit && college.nirf_ranking <= moderateLimit)
        .slice(0, 5)

      const reach = sortedByMatch
        .filter((college) => college.nirf_ranking <= reachLimit)
        .slice(0, 5)

      setResults({ safe, moderate, reach })
    } catch {
      setError('Failed to get predictions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-3">College Predictor</h1>
          <p className="text-orange-100 text-lg">
            Discover which colleges match your exam rank and get personalized recommendations
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Prediction Form */}
        <div className="mb-12 rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Enter Your Details</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Exam</label>
              <Select
                name="exam"
                value={formData.exam}
                onChange={handleChange}
                className="w-full"
              >
                {exams.map((exam) => (
                  <option key={exam.value} value={exam.value}>
                    {exam.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rank</label>
              <Input
                type="number"
                name="rank"
                value={formData.rank.toString()}
                onChange={handleChange}
                placeholder="Enter your rank"
                min="1"
                max="100000"
              />
              <p className="mt-1 text-xs text-gray-500">Lower rank number = better chances</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Button
            onClick={handlePredict}
            disabled={loading}
            className="mt-8 w-full md:w-auto"
          >
            {loading ? 'Analyzing...' : 'Get Predictions'}
          </Button>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Reach Colleges */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-orange-500"></div>
                <h3 className="text-2xl font-bold text-gray-900">Reach Colleges</h3>
                <p className="ml-auto text-sm text-gray-600">Top-tier choices</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.reach.length > 0 ? (
                  results.reach.map(college => (
                    <button
                      key={college.id}
                      onClick={() => navigate(`/colleges/${college.slug}`)}
                      className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-left transition hover:border-orange-400 hover:bg-orange-100"
                    >
                      <div className="flex items-start gap-3">
                        <CollegeLogo logoUrl={college.logo_url} name={college.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 font-semibold text-gray-900">{college.name}</h4>
                          <p className="text-xs text-gray-600">{college.city}</p>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs font-semibold text-orange-700">
                              Rank: {college.nirf_ranking ? `#${college.nirf_ranking}` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="col-span-3 py-8 text-center text-gray-500">
                    No reach colleges found. Try increasing your rank number.
                  </p>
                )}
              </div>
            </div>

            {/* Moderate Colleges */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-yellow-500"></div>
                <h3 className="text-2xl font-bold text-gray-900">Moderate Colleges</h3>
                <p className="ml-auto text-sm text-gray-600">Good chances</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.moderate.length > 0 ? (
                  results.moderate.map(college => (
                    <button
                      key={college.id}
                      onClick={() => navigate(`/colleges/${college.slug}`)}
                      className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-left transition hover:border-yellow-400 hover:bg-yellow-100"
                    >
                      <div className="flex items-start gap-3">
                        <CollegeLogo logoUrl={college.logo_url} name={college.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 font-semibold text-gray-900">{college.name}</h4>
                          <p className="text-xs text-gray-600">{college.city}</p>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs font-semibold text-yellow-700">
                              Rank: {college.nirf_ranking ? `#${college.nirf_ranking}` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="col-span-3 py-8 text-center text-gray-500">
                    No moderate colleges found.
                  </p>
                )}
              </div>
            </div>

            {/* Safe Colleges */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-green-500"></div>
                <h3 className="text-2xl font-bold text-gray-900">Safe Colleges</h3>
                <p className="ml-auto text-sm text-gray-600">Likely admits</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.safe.length > 0 ? (
                  results.safe.map(college => (
                    <button
                      key={college.id}
                      onClick={() => navigate(`/colleges/${college.slug}`)}
                      className="rounded-lg border border-green-200 bg-green-50 p-4 text-left transition hover:border-green-400 hover:bg-green-100"
                    >
                      <div className="flex items-start gap-3">
                        <CollegeLogo logoUrl={college.logo_url} name={college.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 font-semibold text-gray-900">{college.name}</h4>
                          <p className="text-xs text-gray-600">{college.city}</p>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs font-semibold text-green-700">
                              Rank: {college.nirf_ranking ? `#${college.nirf_ranking}` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="col-span-3 py-8 text-center text-gray-500">
                    No safe colleges found. Try a lower rank number.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
            <div className="mb-4 text-4xl text-orange-500">Score</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Personalized College Recommendations</h3>
            <p className="text-gray-600 mb-6">Fill in your details above to discover colleges that match your profile</p>
            <p className="text-sm text-gray-500">Based on your rank, category, and exam type</p>
          </div>
        )}
      </div>
    </div>
  )
}
