import { useCallback, useEffect, useMemo, useState } from 'react'
import { collegeApi } from '../services/api'
import type { College, CollegeFilters } from '../types'

interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

const defaultPagination: PaginationState = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0
}

export default function useColleges(initialFilters: CollegeFilters = {}) {
  const [filters, setFilters] = useState<CollegeFilters>({ page: 1, limit: 10, ...initialFilters })
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationState>(defaultPagination)

  const debouncedFilters = useMemo(() => filters, [filters])

  const fetchColleges = useCallback(async (nextFilters: CollegeFilters, replace = true): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const response = await collegeApi.getAll(nextFilters)
      const list = response.data.data ?? []
      const pager = response.data.pagination ?? defaultPagination
      setPagination({
        page: pager.page,
        limit: pager.limit,
        total: pager.total,
        totalPages: pager.totalPages
      })
      setColleges((prev) => (replace ? list : [...prev, ...list]))
    } catch {
      setError('Unable to fetch colleges. Please retry.')
      if (replace) setColleges([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchColleges({ ...debouncedFilters, page: debouncedFilters.page ?? 1 }, true)
    }, debouncedFilters.search ? 300 : 0)

    return () => window.clearTimeout(timer)
  }, [debouncedFilters, fetchColleges])

  const updateFilters = useCallback((next: CollegeFilters): void => {
    setFilters((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))
  }, [])

  const loadMore = useCallback(async (): Promise<void> => {
    if (loading) return
    if (pagination.page >= pagination.totalPages) return
    const nextPage = pagination.page + 1
    const nextFilters = { ...filters, page: nextPage }
    setFilters(nextFilters)
    await fetchColleges(nextFilters, false)
  }, [fetchColleges, filters, loading, pagination.page, pagination.totalPages])

  return {
    colleges,
    loading,
    error,
    pagination,
    filters,
    setFilters: updateFilters,
    fetchColleges,
    loadMore
  }
}
