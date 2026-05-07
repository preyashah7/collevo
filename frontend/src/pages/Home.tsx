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
    { name: 'Engineering', count: 10 },
    { name: 'Management', count: 8 },
    { name: 'Medical', count: 6 },
    { name: 'Law', count: 5 },
    { name: 'Design', count: 4 },
    { name: 'Science', count: 7 },
    { name: 'Commerce', count: 5 },
    { name: 'Architecture', count: 3 }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Dark Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Find Your <span className="text-orange-400">Perfect College</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Smart comparisons. Reliable data. Better decisions. No nonsense.
              </p>
              
              <div className="max-w-lg mb-8">
                <Input
                  placeholder="Search colleges, cities, or streams..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') navigate(`/colleges?search=${encodeURIComponent(query)}`)
                  }}
                  className="bg-white/95 backdrop-blur"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/colleges" className="rounded-lg bg-orange-500 hover:bg-orange-600 px-6 py-3 font-semibold text-white text-center transition">
                  Browse All Colleges
                </Link>
                <Link to="/predictor" className="rounded-lg border-2 border-white hover:bg-white/10 px-6 py-3 font-semibold text-white text-center transition">
                  Predict Your Rank
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-orange-600">87</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Decision Score</p>
                      <p className="text-xs text-gray-500">Based on 4 key factors</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Placements</span>
                      <span className="font-semibold text-gray-900">98.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Package</span>
                      <span className="font-semibold text-gray-900">₹21.5L</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-semibold text-gray-900">⭐ 4.8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">NIRF Rank</span>
                      <span className="font-semibold text-gray-900">#4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Stream Grid Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Stream</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {streams.map((stream) => (
              <button
                key={stream.name}
                type="button"
                onClick={() => navigate(`/colleges?stream=${encodeURIComponent(stream.name)}`)}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 text-left transition hover:border-orange-300 hover:shadow-md overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                <div className="text-2xl font-bold text-orange-500 group-hover:scale-110 transition">{stream.count}</div>
                <div className="mt-2 text-sm font-semibold text-gray-800">{stream.name}</div>
                <div className="text-xs text-gray-500">colleges</div>
              </button>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mb-16 grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-xl">
              📊
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Decision Score</h3>
            <p className="text-sm text-gray-600">
              Our proprietary algorithm considers placements, ratings, rankings, and packages to give you a transparent score.
            </p>
          </article>
          <article className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-xl">
              🎯
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Rank Predictor</h3>
            <p className="text-sm text-gray-600">
              Enter your exam rank and see Safe, Moderate, and Reach colleges personalized for you.
            </p>
          </article>
          <article className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 text-xl">
              ⚖️
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Compare Colleges</h3>
            <p className="text-sm text-gray-600">
              Compare up to 3 colleges side by side with highlighted winners for each metric.
            </p>
          </article>
        </section>

        {/* Top Ranked Colleges */}
        {/* Top Ranked Colleges */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Top Ranked Colleges</h2>
              <p className="text-gray-600 mt-2">Discover the best performing institutions</p>
            </div>
            <Link to="/colleges" className="text-orange-600 hover:text-orange-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => <CollegeCardSkeleton key={index} />)
              : featured.map((college) => <CollegeCard key={college.id} college={college} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
