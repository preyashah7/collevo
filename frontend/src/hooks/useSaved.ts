import { useCallback, useEffect, useMemo, useState } from 'react'
import type { College } from '../types'
import { savedApi } from '../services/api'
import { getSessionId } from '../utils/helpers'

const SAVED_IDS_KEY = 'collevo_saved_ids'

const readLocalSaved = (): string[] => {
  try {
    const raw = localStorage.getItem(SAVED_IDS_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

const writeLocalSaved = (ids: string[]): void => {
  localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(ids))
}

export default function useSaved() {
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set(readLocalSaved()))
  const [savedColleges, setSavedColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sessionId = useMemo(() => getSessionId(), [])

  useEffect(() => {
    const loadSaved = async (): Promise<void> => {
      setLoading(true)
      setError(null)
      try {
        const response = await savedApi.getAll(sessionId)
        const colleges = response.data.data ?? []
        setSavedColleges(colleges)
        const ids = colleges.map((college) => college.id)
        setSavedSet(new Set(ids))
        writeLocalSaved(ids)
      } catch {
        const localIds = readLocalSaved()
        setSavedSet(new Set(localIds))
      } finally {
        setLoading(false)
      }
    }

    void loadSaved()
  }, [sessionId])

  const isSaved = useCallback((collegeId: string) => savedSet.has(collegeId), [savedSet])

  const toggleSave = useCallback(
    async (college: College): Promise<void> => {
      const currentlySaved = savedSet.has(college.id)
      const next = new Set(savedSet)
      if (currentlySaved) next.delete(college.id)
      else next.add(college.id)

      setSavedSet(next)
      writeLocalSaved(Array.from(next))
      setSavedColleges((prev) => {
        if (currentlySaved) return prev.filter((item) => item.id !== college.id)
        return [college, ...prev.filter((item) => item.id !== college.id)]
      })

      try {
        if (currentlySaved) await savedApi.remove(sessionId, college.id)
        else await savedApi.save(sessionId, college.id)
      } catch {
        setError('Failed to sync saved colleges with server')
        const rollback = new Set(savedSet)
        setSavedSet(rollback)
        writeLocalSaved(Array.from(rollback))
        setSavedColleges((prev) => {
          if (currentlySaved) return [college, ...prev.filter((item) => item.id !== college.id)]
          return prev.filter((item) => item.id !== college.id)
        })
      }
    },
    [savedSet, sessionId]
  )

  return {
    isSaved,
    toggleSave,
    savedCount: savedSet.size,
    savedIds: Array.from(savedSet),
    savedColleges,
    loading,
    error
  }
}
