import React, { createContext, useContext } from 'react'
import useCompare from '../hooks/useCompare'

type CompareContextValue = ReturnType<typeof useCompare>

const CompareContext = createContext<CompareContextValue | null>(null)

interface CompareProviderProps {
  children: React.ReactNode
}

export function CompareProvider({ children }: CompareProviderProps): JSX.Element {
  const value = useCompare()
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompareContext(): CompareContextValue {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompareContext must be used within CompareProvider')
  }
  return context
}
