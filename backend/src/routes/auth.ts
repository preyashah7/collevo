import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()

interface RegisterInput {
  name: string
  email: string
  password: string
  phone?: string
  stream_preference?: string
  city?: string
}

interface LoginInput {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
  phone: string | null
  stream_preference: string | null
  city: string | null
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// POST /api/auth/register
router.post('/register', async (req: any, res: Response): Promise<any> => {
  try {
    const { name, email, password, phone, stream_preference, city } = req.body as RegisterInput

    // Validation
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      })
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      })
    }

    // Check if email already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const createUserSql = `
      INSERT INTO users (name, email, password_hash, phone, stream_preference, city)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, phone, stream_preference, city
    `
    const createUserRes = await query(createUserSql, [
      name,
      email.toLowerCase(),
      passwordHash,
      phone || null,
      stream_preference || null,
      city || null
    ])

    const user = createUserRes.rows[0] as User

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'collevo_secret_key_change_in_production_2026',
      { expiresIn: '7d' }
    )

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          stream_preference: user.stream_preference,
          city: user.city
        }
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      message: 'Registration failed'
    })
  }
})

// POST /api/auth/login
router.post('/login', async (req: any, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body as LoginInput

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      })
    }

    // Find user
    const userRes = await query(
      'SELECT id, name, email, phone, stream_preference, city, password_hash FROM users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (userRes.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const user = userRes.rows[0]

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'collevo_secret_key_change_in_production_2026',
      { expiresIn: '7d' }
    )

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          stream_preference: user.stream_preference,
          city: user.city
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Login failed'
    })
  }
})

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userRes = await query(
      'SELECT id, name, email, phone, stream_preference, city FROM users WHERE id = $1',
      [req.userId]
    )

    if (userRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const user = userRes.rows[0] as User

    return res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get user error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    })
  }
})

// POST /api/auth/logout (client-side only)
router.post('/logout', (req: any, res: Response): void => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})

export default router
