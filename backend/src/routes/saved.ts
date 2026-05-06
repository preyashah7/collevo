import express, { Request, Response, NextFunction } from 'express'
import { query } from '../db/client'
import { ApiResponse } from '../types'

const router = express.Router()

router.get('/:sessionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = String(req.params.sessionId)
    if (!sessionId) {
      return res.status(400).json({ success: false, data: [], message: 'Missing session id' } as ApiResponse<unknown[]>)
    }

    const result = await query(
      `SELECT c.*
       FROM saved_colleges s
       JOIN colleges c ON c.id = s.college_id
       WHERE s.session_id = $1
       ORDER BY s.created_at DESC`,
      [sessionId]
    )

    res.json({ success: true, data: result.rows } as ApiResponse<unknown[]>)
  } catch (error) {
    next(error as Error)
  }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = String(req.body.session_id ?? '')
    const collegeId = String(req.body.college_id ?? '')

    if (!sessionId || !collegeId) {
      return res.status(400).json({ success: false, data: null, message: 'session_id and college_id are required' })
    }

    await query(
      `INSERT INTO saved_colleges (session_id, college_id)
       VALUES ($1, $2)
       ON CONFLICT (session_id, college_id) DO NOTHING`,
      [sessionId, collegeId]
    )

    res.json({ success: true, data: null } as ApiResponse<null>)
  } catch (error) {
    next(error as Error)
  }
})

router.delete('/:sessionId/:collegeId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = String(req.params.sessionId)
    const collegeId = String(req.params.collegeId)

    await query('DELETE FROM saved_colleges WHERE session_id = $1 AND college_id = $2', [sessionId, collegeId])
    res.json({ success: true, data: null } as ApiResponse<null>)
  } catch (error) {
    next(error as Error)
  }
})

export default router
