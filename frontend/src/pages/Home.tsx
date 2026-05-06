import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CollegeCard from '../components/college/CollegeCard'
import CollegeCardSkeleton from '../components/college/CollegeCardSkeleton'
import Input from '../components/ui/Input'
import { collegeApi } from '../services/api'
import type { College } from '../types'

export default function Home(): JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState('')
  const [featured, setFeatured] = React.useState<College[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const load = async (): Promise<void> => {
      setLoading(true)
      try {
        const response = await collegeApi.getAll({ sort: 'ranking', limit: 6 })
        setFeatured(response.data.data ?? [])
      } catch {
        setFeatured([])
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const streams = [
    { emoji: '🔧', name: 'Engineering', count: 10 },
    { emoji: '📊', name: 'Management', count: 8 },
    { emoji: '🏥', name: 'Medical', count: 6 },
    { emoji: '⚖️', name: 'Law', count: 5 },
    { emoji: '🎨', name: 'Design', count: 4 },
    { emoji: '🔬', name: 'Science', count: 7 },
    { emoji: '💼', name: 'Commerce', count: 5 },
    { emoji: '🏛️', name: 'Architecture', count: 3 }
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-10">
        <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300" />
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Find Your Perfect College</h1>
        <p className="mt-3 text-base text-gray-600">Compare, shortlist, and decide - without the noise.</p>
        <div className="mt-6 max-w-2xl">
          <Input
            placeholder="Search colleges, cities, or streams..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            icon={<span>🔍</span>}
            onKeyDown={(event) => {
              if (event.key === 'Enter') navigate(`/colleges?search=${encodeURIComponent(query)}`)
            }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/colleges" className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
            🔍 Browse All Colleges
          </Link>
          <Link to="/compare" className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            ⚖️ Compare Colleges
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Explore by Stream</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {streams.map((stream) => (
            <button
              key={stream.name}
              type="button"
              onClick={() => navigate(`/colleges?stream=${encodeURIComponent(stream.name)}`)}
              className="rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-orange-300 hover:shadow-sm"
            >
              <div className="text-2xl">{stream.emoji}</div>
              <div className="mt-2 text-sm font-semibold text-gray-800">{stream.name}</div>
              <div className="text-xs text-gray-500">{stream.count} colleges</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-gray-800">Decision-Focused</h3>
          <p className="mt-2 text-sm text-gray-600">Not just data. Guidance that helps you choose.</p>
        </article>
        <article className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-gray-800">Free Predictor</h3>
          <p className="mt-2 text-sm text-gray-600">See Safe / Moderate / Reach colleges for your rank.</p>
        </article>
        <article className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-gray-800">Clean Compare</h3>
          <p className="mt-2 text-sm text-gray-600">Compare up to 3 colleges side by side with winner highlights.</p>
        </article>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Top Ranked Colleges</h2>
          <Link to="/colleges" className="text-sm font-medium text-orange-600 hover:text-orange-700">
            View All Colleges →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <CollegeCardSkeleton key={index} />)
            : featured.map((college) => <CollegeCard key={college.id} college={college} />)}
        </div>
      </section>
    </div>
  )
}
