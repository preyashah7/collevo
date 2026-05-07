import React from 'react'
import { Link, useParams } from 'react-router-dom'
import CollegeCard from '../components/college/CollegeCard'
import CollegeLogo from '../components/college/CollegeLogo'
import CollegeBanner from '../components/college/CollegeBanner'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import RatingBar from '../components/ui/RatingBar'
import StatCard from '../components/ui/StatCard'
import { useCompareContext } from '../context/CompareContext'
import { useSavedContext } from '../context/SavedContext'
import { collegeApi } from '../services/api'
import type { College, Course, Placement, Review } from '../types'
import { formatFees, formatPackage, formatRating, getTypeColor } from '../utils/helpers'

export default function CollegeDetail(): JSX.Element {
  const { slug = '' } = useParams()
  const { isSaved, toggleSave } = useSavedContext()
  const { addToCompare, isInCompare, removeFromCompare } = useCompareContext()
  const [college, setCollege] = React.useState<College | null>(null)
  const [courses, setCourses] = React.useState<Course[]>([])
  const [placements, setPlacements] = React.useState<Placement[]>([])
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [similar, setSimilar] = React.useState<College[]>([])
  const [loading, setLoading] = React.useState(true)
  const [courseFilter, setCourseFilter] = React.useState('All')
  const [reviewsShown, setReviewsShown] = React.useState(3)

  React.useEffect(() => {
    const load = async (): Promise<void> => {
      if (!slug) return
      setLoading(true)
      try {
        const [collegeRes, coursesRes, reviewsRes, placementsRes] = await Promise.all([
          collegeApi.getBySlug(slug),
          collegeApi.getCourses(slug),
          collegeApi.getReviews(slug),
          collegeApi.getPlacements(slug)
        ])
        const current = collegeRes.data.data
        setCollege(current)
        setCourses(coursesRes.data.data ?? [])
        setReviews(reviewsRes.data.data ?? [])
        setPlacements(placementsRes.data.data ?? [])

        const similarRes = await collegeApi.getAll({ state: current.state, limit: 4 })
        setSimilar((similarRes.data.data ?? []).filter((item) => item.id !== current.id).slice(0, 3))
      } catch {
        setCollege(null)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="animate-pulse rounded-xl bg-white p-8 shadow-sm">
          <div className="mb-4 h-6 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    )
  }

  if (!college) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <EmptyState title="College not found" description="This college detail page is unavailable right now." icon="building" />
      </div>
    )
  }

  const filteredCourses =
    courseFilter === 'All' ? courses : courses.filter((course) => course.degree_level.toLowerCase().includes(courseFilter.toLowerCase()))

  const avgCategory = (picker: (review: Review) => number | null): number => {
    const values = reviews.map(picker).filter((value): value is number => value !== null)
    if (!values.length) return 0
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <CollegeBanner bannerUrl={college.banner_url} name={college.name} />

      <header className="sticky top-16 z-30 mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <CollegeLogo logoUrl={college.logo_url} name={college.name} size="lg" />
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-gray-900">{college.name}</h1>
              <p className="text-sm text-gray-500">{college.city}, {college.state}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className={getTypeColor(college.type)}>{college.type}</Badge>
                {college.naac_grade ? <Badge className="bg-orange-100 text-orange-700">NAAC {college.naac_grade}</Badge> : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">★ {formatRating(college.overall_rating)} ({college.total_reviews} reviews)</span>
            <Button variant="outline" onClick={() => void toggleSave(college)}>{isSaved(college.id) ? 'Saved' : 'Save'}</Button>
            <Button variant="outline" onClick={() => (isInCompare(college.id) ? removeFromCompare(college.id) : addToCompare(college))}>
              {isInCompare(college.id) ? 'Compared' : 'Compare'}
            </Button>
            <Button variant="secondary">Brochure</Button>
            {college.website ? (
              <a href={college.website} target="_blank" rel="noreferrer" className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white">
                Visit Website
              </a>
            ) : null}
          </div>
        </div>

        <nav className="mt-4 flex gap-2 overflow-auto text-sm">
          {['overview', 'courses', 'admissions', 'placements', 'reviews'].map((section) => (
            <a key={section} href={`#${section}`} className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
              {section[0].toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg Package" value={formatPackage(college.placement_avg_package_lpa)} color="green" />
        <StatCard label="Highest Package" value={college.placement_highest_package_cr ? `₹${college.placement_highest_package_cr} Cr` : 'N/A'} color="orange" />
        <StatCard label="Placement %" value={college.placement_percent ? `${college.placement_percent}%` : 'N/A'} color="blue" />
        <StatCard label="NIRF Rank" value={college.nirf_ranking ? `#${college.nirf_ranking}` : 'N/A'} />
      </section>

      <section id="overview" className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        <p className="mt-3 text-sm text-gray-600">{college.description ?? 'No description available.'}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div><dt className="text-gray-500">Established</dt><dd className="font-medium text-gray-800">{college.established_year ?? 'N/A'}</dd></div>
          <div><dt className="text-gray-500">Campus Size</dt><dd className="font-medium text-gray-800">{college.campus_size_acres ? `${college.campus_size_acres} acres` : 'N/A'}</dd></div>
          <div><dt className="text-gray-500">Total Students</dt><dd className="font-medium text-gray-800">{college.total_students ?? 'N/A'}</dd></div>
          <div><dt className="text-gray-500">Total Faculty</dt><dd className="font-medium text-gray-800">{college.total_faculty ?? 'N/A'}</dd></div>
          <div className="sm:col-span-2 lg:col-span-2">
            <dt className="text-gray-500">Approvals</dt>
            <dd className="mt-1 flex flex-wrap gap-1">{(college.approvals ?? []).map((item) => <Badge key={item}>{item}</Badge>)}</dd>
          </div>
        </dl>
      </section>

      <section id="courses" className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">Courses</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {['All', 'UG', 'PG', 'Diploma'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setCourseFilter(level)}
              className={`rounded-full px-3 py-1 text-xs ${courseFilter === level ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {filteredCourses.length === 0 ? (
            <EmptyState title="No courses" description="Course data is not available." icon="book" />
          ) : (
            filteredCourses.map((course) => (
              <article key={course.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.degree_type} • {course.duration_years} years</p>
                  </div>
                  <Button variant="outline" size="sm">Apply Now</Button>
                </div>
                <div className="mt-2 grid gap-2 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
                  <p>Fees: {formatFees(course.fees_per_year)}</p>
                  <p>Median Salary: {formatPackage(course.median_salary_lpa)}</p>
                  <p>Eligibility: {course.eligibility ?? 'N/A'}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">{(course.exams ?? []).map((exam) => <Badge key={exam}>{exam}</Badge>)}</div>
              </article>
            ))
          )}
        </div>
      </section>

      <section id="admissions" className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">Admissions</h2>
        <div className="mt-3 flex flex-wrap gap-1">{(courses.flatMap((course) => course.exams) ?? []).slice(0, 8).map((exam) => <Badge key={exam} className="bg-orange-100 text-orange-700">{exam}</Badge>)}</div>
        <p className="mt-3 text-sm text-gray-600">General eligibility varies by course. Please check the official college website for exact criteria.</p>
        <Button className="mt-3">Get notified</Button>
      </section>

      <section id="placements" className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">Placements</h2>
        {placements.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Placement data not available" description="Latest placement statistics are missing for this college." icon="chart" />
          </div>
        ) : (
          <div className="mt-4 overflow-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="px-2 py-2">Year</th>
                  <th className="px-2 py-2">Avg Package</th>
                  <th className="px-2 py-2">Highest</th>
                  <th className="px-2 py-2">Students</th>
                  <th className="px-2 py-2">Companies</th>
                </tr>
              </thead>
              <tbody>
                {placements.slice(0, 3).map((placement) => (
                  <tr key={placement.id} className="border-b border-gray-100 text-gray-700">
                    <td className="px-2 py-2">{placement.year}</td>
                    <td className="px-2 py-2">{formatPackage(placement.avg_package_lpa)}</td>
                    <td className="px-2 py-2">{placement.highest_package_cr ? `₹${placement.highest_package_cr} Cr` : 'N/A'}</td>
                    <td className="px-2 py-2">{placement.students_placed ?? 'N/A'}</td>
                    <td className="px-2 py-2">{placement.companies_count ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section id="reviews" className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-4xl font-bold text-gray-900">{formatRating(college.overall_rating)}</p>
            <p className="text-sm text-gray-500">Overall Rating</p>
          </div>
          <div className="space-y-2">
            <RatingBar label="Academics" value={avgCategory((item) => item.academics_rating)} />
            <RatingBar label="Faculty" value={avgCategory((item) => item.faculty_rating)} />
            <RatingBar label="Campus" value={avgCategory((item) => item.campus_rating)} />
            <RatingBar label="Placement" value={avgCategory((item) => item.placement_rating)} />
            <RatingBar label="Infrastructure" value={avgCategory((item) => item.infrastructure_rating)} />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {reviews.slice(0, reviewsShown).map((review) => (
            <article key={review.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{review.reviewer_name}</p>
                  <p className="text-xs text-gray-500">{review.course_studied ?? 'Course N/A'} {review.batch_year ? `• ${review.batch_year}` : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-100 text-orange-700">★ {formatRating(review.overall_rating)}</Badge>
                  {review.is_verified ? <Badge className="bg-green-100 text-green-700">Verified</Badge> : null}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{review.body_text ?? 'No detailed comment provided.'}</p>
              <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-green-700">What I Liked</p>
                  <ul className="mt-1 list-inside list-disc text-gray-600">
                    {(review.what_i_liked ?? []).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-700">What I Didn't Like</p>
                  <ul className="mt-1 list-inside list-disc text-gray-600">
                    {(review.what_i_didnt_like ?? []).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {reviewsShown < reviews.length ? (
          <Button variant="secondary" className="mt-3" onClick={() => setReviewsShown((prev) => prev + 3)}>
            Load more
          </Button>
        ) : null}
        <Button variant="outline" className="mt-3 ml-2">Write a Review</Button>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">You might also like</h2>
        {similar.length === 0 ? (
          <EmptyState title="No similar colleges" description="Try browsing all colleges to discover alternatives." icon="compass" action={{ label: 'Browse Colleges', onClick: () => {} }} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <CollegeCard key={item.id} college={item} />
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link to="/colleges" className="text-sm font-medium text-orange-600">Browse all colleges</Link>
        </div>
      </section>
    </div>
  )
}
