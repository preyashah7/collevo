import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '../services/api'

export interface User {
  id: string
  name: string
  email: string
  phone: string | null
  stream_preference: string | null
  city: string | null
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  stream_preference?: string
  city?: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('collevo_token')
    if (storedToken) {
      setToken(storedToken)
      // Validate token
      validateToken(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async (token: string): Promise<void> => {
    try {
      const response = await authApi.me(token)
      if (response.data.success) {
        setUser(response.data.data as User)
      } else {
        localStorage.removeItem('collevo_token')
        setToken(null)
      }
    } catch {
      localStorage.removeItem('collevo_token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      const response = await authApi.login(email, password)
      if (response.data.success && response.data.data) {
        const { token: newToken, user: newUser } = response.data.data
        localStorage.setItem('collevo_token', newToken)
        setToken(newToken)
        setUser(newUser as User)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const register = async (data: RegisterData): Promise<void> => {
    try {
      setError(null)
      const response = await authApi.register(data)
      if (response.data.success && response.data.data) {
        const { token: newToken, user: newUser } = response.data.data
        localStorage.setItem('collevo_token', newToken)
        setToken(newToken)
        setUser(newUser as User)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const logout = (): void => {
    localStorage.removeItem('collevo_token')
    setToken(null)
    setUser(null)
  }

  const clearError = (): void => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user && !!token,
        login,
        register,
        logout,
        loading,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
