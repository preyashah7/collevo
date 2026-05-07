import express, { Request, Response, NextFunction } from 'express'
import {
  getColleges,
  getCollegeBySlug,
  getCoursesByCollege,
  getReviewsByCollege,
  getPlacementsByCollege,
  compareColleges
} from '../services/colleges'
import { ApiResponse } from '../types'

const router = express.Router()

// GET /api/colleges - list with filters + pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, search, state, city, type, rating_min, fees_max, sort } = req.query

    const parseNumberParam = (value: unknown): number | undefined => {
      if (value === undefined || value === null || value === '') return undefined
      const parsed = Number(value)
      return Number.isFinite(parsed) ? parsed : undefined
    }

    const filters = {
      page: parseNumberParam(page),
      limit: parseNumberParam(limit),
      search: search ? String(search) : undefined,
      state: state ? String(state) : undefined,
      city: city ? String(city) : undefined,
      type: type ? String(type) : undefined,
      rating_min: parseNumberParam(rating_min),
      fees_max: parseNumberParam(fees_max),
      sort: sort ? (String(sort) as any) : undefined
    }

    const { colleges, total } = await getColleges(filters)

    const currentPage: number = filters.page ?? 1
    const rawLimit = filters.limit ?? colleges.length
    const limitValue: number = rawLimit && rawLimit > 0 ? rawLimit : 1

    const data: ApiResponse<typeof colleges> = {
      success: true,
      data: colleges,
      pagination: {
        page: currentPage,
        limit: limitValue,
        total,
        totalPages: Math.ceil(total / limitValue)
      }
    }

    res.json(data)
  } catch (error) {
    next(error as Error)
  }
})

// GET /api/colleges/search?q=term
router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.query.q ? String(req.query.q) : ''
    const { colleges } = await getColleges({ search: q, limit: 20 })
    const data: ApiResponse<typeof colleges> = { success: true, data: colleges }
    res.json(data)
  } catch (error) {
    next(error as Error)
  }
})

// GET /api/colleges/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug)
    if (!slug) return res.status(400).json({ success: false, data: null, message: 'Missing slug' })
    const college = await getCollegeBySlug(slug)
    if (!college) return res.status(404).json({ success: false, data: null, message: 'College not found' })
    const data: ApiResponse<typeof college> = { success: true, data: college }
    res.json(data)
  } catch (error) {
    next(error as Error)
  }
})

// GET /api/colleges/:slug/courses
router.get('/:slug/courses', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug)
    const college = await getCollegeBySlug(slug)
    if (!college) return res.status(404).json({ success: false, data: null, message: 'College not found' })
    const courses = await getCoursesByCollege(college.id)
    res.json({ success: true, data: courses } as ApiResponse<typeof courses>)
  } catch (error) {
    next(error as Error)
  }
})

// GET /api/colleges/:slug/reviews
router.get('/:slug/reviews', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug)
    const college = await getCollegeBySlug(slug)
    if (!college) return res.status(404).json({ success: false, data: null, message: 'College not found' })
    const reviews = await getReviewsByCollege(college.id)
    res.json({ success: true, data: reviews } as ApiResponse<typeof reviews>)
  } catch (error) {
    next(error as Error)
  }
})

// GET /api/colleges/:slug/placements
router.get('/:slug/placements', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug)
    const college = await getCollegeBySlug(slug)
    if (!college) return res.status(404).json({ success: false, data: null, message: 'College not found' })
    const placements = await getPlacementsByCollege(college.id)
    res.json({ success: true, data: placements } as ApiResponse<typeof placements>)
  } catch (error) {
    next(error as Error)
  }
})

// POST /api/colleges/compare { slugs: ['iit-bombay','iim-ahmedabad'] }
router.post('/compare', express.json(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slugs = Array.isArray(req.body.slugs) ? req.body.slugs.map(String) : []
    if (slugs.length === 0) return res.status(400).json({ success: false, data: null, message: 'Provide slugs array' })
    const result = await compareColleges(slugs)
    res.json({ success: true, data: result } as ApiResponse<typeof result>)
  } catch (error) {
    next(error as Error)
  }
})

export default router
