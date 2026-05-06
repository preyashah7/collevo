import { useCallback, useEffect, useState } from 'react'
import type { College } from '../types'

const COMPARE_KEY = 'collevo_compare'

const readCompare = (): College[] => {
  try {
    const raw = sessionStorage.getItem(COMPARE_KEY)
    return raw ? (JSON.parse(raw) as College[]) : []
  } catch {
    return []
  }
}

export default function useCompare() {
  const [compareList, setCompareList] = useState<College[]>([])

  useEffect(() => {
    setCompareList(readCompare())
  }, [])

  useEffect(() => {
    sessionStorage.setItem(COMPARE_KEY, JSON.stringify(compareList))
  }, [compareList])

  const addToCompare = useCallback((college: College): void => {
    setCompareList((prev) => {
      if (prev.some((item) => item.id === college.id)) return prev
      if (prev.length >= 3) return prev
      return [...prev, college]
    })
  }, [])

  const removeFromCompare = useCallback((collegeId: string): void => {
    setCompareList((prev) => prev.filter((item) => item.id !== collegeId))
  }, [])

  const clearCompare = useCallback((): void => {
    setCompareList([])
  }, [])

  const isInCompare = useCallback((collegeId: string): boolean => compareList.some((item) => item.id === collegeId), [compareList])

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    canAddMore: compareList.length < 3,
    compareCount: compareList.length
  }
}
