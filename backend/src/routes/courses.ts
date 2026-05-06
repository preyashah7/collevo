import express, { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../types'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: [], message: 'Courses route placeholder' } as ApiResponse<unknown[]>)
  } catch (error) {
    next(error as Error)
  }
})

export default router
