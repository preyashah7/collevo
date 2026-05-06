import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import type { College } from '../../types'
import { collegeApi } from '../../services/api'
import Input from '../ui/Input'
import CollegeLogo from '../college/CollegeLogo'
import { useSavedContext } from '../../context/SavedContext'
import { useCompareContext } from '../../context/CompareContext'

export default function Navbar(): JSX.Element {
  const navigate = useNavigate()
  const { savedCount } = useSavedContext()
  const { compareCount } = useCompareContext()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<College[]>([])
  const [open, setOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const timer = window.setTimeout(async () => {
      try {
        const response = await collegeApi.search(query.trim())
        setResults((response.data.data ?? []).slice(0, 6))
        setOpen(true)
      } catch {
        setResults([])
      }
    }, 250)

    return () => window.clearTimeout(timer)
  }, [query])

  const onResultClick = (slug: string): void => {
    setOpen(false)
    setQuery('')
    navigate(`/colleges/${slug}`)
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button type="button" className="text-xl lg:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle menu">
          ☰
        </button>

        <Link to="/" className="whitespace-nowrap text-2xl font-bold text-orange-500">
          🎓 Collevo
        </Link>

        <div ref={containerRef} className={`relative ${mobileSearchOpen ? 'flex-1' : 'hidden flex-1 md:block'}`}>
          <Input
            placeholder="Search colleges..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            icon={<span>🔍</span>}
          />
          {open && results.length > 0 ? (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {results.map((college) => (
                <button
                  key={college.id}
                  type="button"
                  onClick={() => onResultClick(college.slug)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-gray-50"
                >
                  <CollegeLogo logoUrl={college.logo_url} name={college.name} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-gray-800">{college.name}</span>
                    <span className="block text-xs text-gray-500">{college.city}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button type="button" className="md:hidden" onClick={() => setMobileSearchOpen((prev) => !prev)} aria-label="Toggle search">
          🔍
        </button>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <NavLink to="/saved" className="text-sm font-medium text-gray-600 hover:text-orange-600">
            ❤ Saved <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">{savedCount}</span>
          </NavLink>
          <NavLink to="/compare" className="text-sm font-medium text-gray-600 hover:text-orange-600">
            ⚖ Compare <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">{compareCount}</span>
          </NavLink>
          <NavLink to="/colleges" className="text-sm font-medium text-gray-600 hover:text-orange-600">
            Colleges
          </NavLink>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600">
            Exams
          </a>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="space-y-2 border-t border-gray-200 px-4 py-3 md:hidden">
          <NavLink to="/saved" className="block text-sm text-gray-700" onClick={() => setMobileMenuOpen(false)}>
            Saved ({savedCount})
          </NavLink>
          <NavLink to="/compare" className="block text-sm text-gray-700" onClick={() => setMobileMenuOpen(false)}>
            Compare ({compareCount})
          </NavLink>
          <NavLink to="/colleges" className="block text-sm text-gray-700" onClick={() => setMobileMenuOpen(false)}>
            Colleges
          </NavLink>
        </div>
      ) : null}
    </nav>
  )
}
