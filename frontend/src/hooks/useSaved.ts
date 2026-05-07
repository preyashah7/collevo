import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import type { College } from '../types'
import { savedApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const savedIdsKey = (userId: string): string => `collevo_saved_ids_${userId}`

const readLocalSaved = (userId: string): string[] => {
  try {
    const raw = localStorage.getItem(savedIdsKey(userId))
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

const writeLocalSaved = (userId: string, ids: string[]): void => {
  localStorage.setItem(savedIdsKey(userId), JSON.stringify(ids))
}

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message
    if (typeof apiMessage === 'string' && apiMessage.trim()) {
      return apiMessage
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

export default function useSaved() {
  const { user, isLoggedIn, loading: authLoading } = useAuth()
  const { addToast } = useToast()
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set())
  const [savedColleges, setSavedColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSaved = async (): Promise<void> => {
      if (!isLoggedIn || !user) {
        setSavedSet(new Set())
        setSavedColleges([])
        setError(null)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const cachedIds = readLocalSaved(user.id)
        if (cachedIds.length > 0) {
          setSavedSet(new Set(cachedIds))
        }

        const response = await savedApi.getAll()
        const colleges = response.data.data ?? []
        setSavedColleges(colleges)
        const ids = colleges.map((college) => college.id)
        setSavedSet(new Set(ids))
        writeLocalSaved(user.id, ids)
      } catch {
        const localIds = readLocalSaved(user.id)
        setSavedSet(new Set(localIds))
        setSavedColleges([])
      } finally {
        setLoading(false)
      }
    }

    void loadSaved()
  }, [isLoggedIn, user])

  useEffect(() => {
    if (!isLoggedIn) {
      setSavedSet(new Set())
      setSavedColleges([])
      setError(null)
    }
  }, [isLoggedIn])

  const isSaved = useCallback((collegeId: string) => savedSet.has(collegeId), [savedSet])

  const toggleSave = useCallback(
    async (college: College): Promise<void> => {
      if (!isLoggedIn || !user) {
        const message = 'Sign in to save colleges'
        setError(message)
        addToast(message, 'error')
        return
      }

      const currentlySaved = savedSet.has(college.id)
      const next = new Set(savedSet)
      if (currentlySaved) next.delete(college.id)
      else next.add(college.id)

      setSavedSet(next)
      writeLocalSaved(user.id, Array.from(next))
      setSavedColleges((prev) => {
        if (currentlySaved) return prev.filter((item) => item.id !== college.id)
        return [college, ...prev.filter((item) => item.id !== college.id)]
      })

      try {
        if (currentlySaved) await savedApi.remove(college.id)
        else await savedApi.save(college.id)
      } catch (error) {
        const message = getErrorMessage(error, 'Failed to sync saved colleges with server')
        setError(message)
        addToast(message, 'error')
        const rollback = new Set(savedSet)
        setSavedSet(rollback)
        writeLocalSaved(user.id, Array.from(rollback))
        setSavedColleges((prev) => {
          if (currentlySaved) return [college, ...prev.filter((item) => item.id !== college.id)]
          return prev.filter((item) => item.id !== college.id)
        })
      }
    },
    [addToast, isLoggedIn, savedSet, user]
  )

  return {
    isSaved,
    toggleSave,
    savedCount: savedSet.size,
    savedIds: Array.from(savedSet),
    savedColleges,
    loading: loading || authLoading,
    error
  }
}
