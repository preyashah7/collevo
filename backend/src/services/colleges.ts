import { query } from '../db/client'
import { College, CollegeFilters, Course, Review, Placement } from '../types'

export const getColleges = async (filters: CollegeFilters): Promise<{ colleges: College[]; total: number }> => {
  const conditions: string[] = []
  const params: unknown[] = []
  let idx = 1

  if (filters.search) {
    conditions.push(`(name ILIKE $${idx} OR city ILIKE $${idx} OR state ILIKE $${idx})`)
    params.push(`%${filters.search}%`)
    idx++
  }

  if (filters.state) {
    conditions.push(`state = $${idx}`)
    params.push(filters.state)
    idx++
  }

  if (filters.city) {
    conditions.push(`city = $${idx}`)
    params.push(filters.city)
    idx++
  }

  if (filters.type) {
    conditions.push(`type = $${idx}`)
    params.push(filters.type)
    idx++
  }

  if (filters.rating_min !== undefined) {
    conditions.push(`overall_rating >= $${idx}`)
    params.push(filters.rating_min)
    idx++
  }

  if (filters.fees_max !== undefined) {
    conditions.push(`(SELECT COALESCE(AVG(fees_per_year), 0) FROM courses WHERE college_id = colleges.id) <= $${idx}`)
    params.push(filters.fees_max * 100000)
    idx++
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const page = filters.page && filters.page > 0 ? filters.page : 1
  const limit = filters.limit && filters.limit > 0 ? filters.limit : 20
  const offset = (page - 1) * limit

  let order = 'ORDER BY is_featured DESC, overall_rating DESC NULLS LAST'
  if (filters.sort === 'fees_asc') order = 'ORDER BY placement_avg_package_lpa ASC NULLS LAST'
  if (filters.sort === 'fees_desc') order = 'ORDER BY placement_avg_package_lpa DESC NULLS LAST'
  if (filters.sort === 'ranking') order = 'ORDER BY nirf_ranking ASC NULLS LAST'

  const sql = `SELECT * FROM colleges ${where} ${order} LIMIT $${idx} OFFSET $${idx + 1}`
  params.push(limit, offset)

  const countSql = `SELECT COUNT(*)::int FROM colleges ${where}`

  const res = await query(sql, params)
  const countRes = await query(countSql, params.slice(0, params.length - 2))

  const colleges: College[] = res.rows || []
  const total: number = countRes.rows[0] ? parseInt(String(countRes.rows[0].count), 10) : 0

  return { colleges, total }
}

export const getCollegeBySlug = async (slug: string): Promise<College | null> => {
  const res = await query('SELECT * FROM colleges WHERE slug = $1 LIMIT 1', [slug])
  return res.rows[0] ?? null
}

export const getCoursesByCollege = async (collegeId: string): Promise<Course[]> => {
  const sql = `SELECT c.*, COALESCE(array_agg(ce.exam_name) FILTER (WHERE ce.exam_name IS NOT NULL), ARRAY[]::text[]) AS exams
    FROM courses c
    LEFT JOIN course_exams ce ON ce.course_id = c.id
    WHERE c.college_id = $1
    GROUP BY c.id`
  const res = await query(sql, [collegeId])
  return res.rows as Course[]
}

export const getReviewsByCollege = async (collegeId: string): Promise<Review[]> => {
  const res = await query('SELECT * FROM reviews WHERE college_id = $1 ORDER BY created_at DESC', [collegeId])
  return res.rows as Review[]
}

export const getPlacementsByCollege = async (collegeId: string): Promise<Placement[]> => {
  const res = await query('SELECT * FROM placements WHERE college_id = $1 ORDER BY year DESC LIMIT 3', [collegeId])
  return res.rows as Placement[]
}

export const compareColleges = async (slugs: string[]): Promise<any[]> => {
  if (!Array.isArray(slugs) || slugs.length === 0) return []
  const res = await query(
    `SELECT col.*, p.year, p.avg_package_lpa, p.highest_package_cr, p.placement_percent
     FROM colleges col
     LEFT JOIN LATERAL (
       SELECT * FROM placements p2 WHERE p2.college_id = col.id ORDER BY year DESC LIMIT 1
     ) p ON true
     WHERE col.slug = ANY($1)
  `,
    [slugs]
  )
  return res.rows
}
