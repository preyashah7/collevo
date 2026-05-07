import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AuthRequest extends Request {
  userId?: string
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'collevo_secret_key_change_in_production_2026') as { userId: string }
    req.userId = decoded.userId
    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export const optionalAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'collevo_secret_key_change_in_production_2026') as { userId: string }
      req.userId = decoded.userId
    } catch {
      // Token invalid, continue without auth
    }
  }
  next()
}
