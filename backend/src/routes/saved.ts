import express, { Response, NextFunction } from 'express'
import { query } from '../db/client'
import { ApiResponse } from '../types'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ success: false, data: [], message: 'Authentication required' } as ApiResponse<unknown[]>)
    }

    const result = await query(
      `SELECT c.*
       FROM saved_colleges s
       JOIN colleges c ON c.id = s.college_id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [userId]
    )

    res.json({ success: true, data: result.rows } as ApiResponse<unknown[]>)
  } catch (error) {
    next(error as Error)
  }
})

router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const collegeId = String(req.body.college_id ?? '')

    if (!userId || !collegeId) {
      return res.status(400).json({ success: false, data: null, message: 'college_id is required' })
    }

    await query(
      `INSERT INTO saved_colleges (user_id, session_id, college_id)
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [userId, userId, collegeId]
    )

    res.json({ success: true, data: null } as ApiResponse<null>)
  } catch (error) {
    console.error('Save college error:', error)
    return res.status(500).json({
      success: false,
      data: null,
      message: 'We could not save this college right now. Please try again.'
    } as ApiResponse<null>)
  }
})

router.delete('/:collegeId', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const collegeId = String(req.params.collegeId)

    if (!userId) {
      return res.status(401).json({ success: false, data: null, message: 'Authentication required' } as ApiResponse<null>)
    }

    await query('DELETE FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [userId, collegeId])
    res.json({ success: true, data: null } as ApiResponse<null>)
  } catch (error) {
    console.error('Remove saved college error:', error)
    return res.status(500).json({
      success: false,
      data: null,
      message: 'We could not remove this college right now. Please try again.'
    } as ApiResponse<null>)
  }
})

export default router
