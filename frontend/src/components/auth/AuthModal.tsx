import React, { useState } from 'react'
import { useAuth, RegisterData } from '../../context/AuthContext'
import Button from '../ui/Button'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps): JSX.Element | null {
  const { login, register, error, clearError } = useAuth()
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab)
  const [loading, setLoading] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Register form state
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirm, setRegisterConfirm] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerStream, setRegisterStream] = useState('')
  const [registerCity, setRegisterCity] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak')

  const calculatePasswordStrength = (pwd: string): 'weak' | 'medium' | 'strong' => {
    if (pwd.length < 8) return 'weak'
    if (pwd.length >= 12 && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 'strong'
    return 'medium'
  }

  const handleLoginSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)

    try {
      await login(loginEmail, loginPassword)
      onClose()
      setLoginEmail('')
      setLoginPassword('')
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setRegisterError('')

    if (registerPassword !== registerConfirm) {
      setRegisterError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const registerData: RegisterData = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        phone: registerPhone || undefined,
        stream_preference: registerStream || undefined,
        city: registerCity || undefined
      }
      await register(registerData)
      onClose()
      // Reset form
      setRegisterName('')
      setRegisterEmail('')
      setRegisterPassword('')
      setRegisterConfirm('')
      setRegisterPhone('')
      setRegisterStream('')
      setRegisterCity('')
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex min-h-[100dvh] items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div
        className="relative my-auto w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                setTab('login')
                clearError()
                setLoginError('')
                setRegisterError('')
              }}
              className={`flex-1 border-b-2 py-4 text-sm font-semibold transition ${
                tab === 'login'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register')
                clearError()
                setLoginError('')
                setRegisterError('')
              }}
              className={`flex-1 border-b-2 py-4 text-sm font-semibold transition ${
                tab === 'register'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-xs text-orange-600 hover:text-orange-700">
                  Forgot password?
                </a>
              </div>
              {loginError && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{loginError}</div>}
              {error && tab === 'login' && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => {
                    setRegisterPassword(e.target.value)
                    setPasswordStrength(calculatePasswordStrength(e.target.value))
                  }}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  minLength={8}
                />
                <div className="mt-2 flex gap-1">
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      passwordStrength === 'weak' ? 'bg-red-500' : 'bg-gray-200'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-amber-500' : 'bg-gray-200'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {passwordStrength === 'weak'
                    ? 'Password must be at least 8 characters'
                    : passwordStrength === 'medium'
                      ? 'Good password'
                      : 'Strong password'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={registerConfirm}
                  onChange={(e) => setRegisterConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input
                  type="tel"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stream (Optional)</label>
                <select
                  value={registerStream}
                  onChange={(e) => setRegisterStream(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select stream</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Management">Management</option>
                  <option value="Medical">Medical</option>
                  <option value="Law">Law</option>
                  <option value="Design">Design</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Architecture">Architecture</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City (Optional)</label>
                <input
                  type="text"
                  value={registerCity}
                  onChange={(e) => setRegisterCity(e.target.value)}
                  placeholder="Your city"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {registerError && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{registerError}</div>}
              {error && tab === 'register' && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-4 text-center text-sm text-gray-600">
          {tab === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('register')}
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
