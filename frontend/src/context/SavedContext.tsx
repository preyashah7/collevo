import React, { createContext, useContext } from 'react'
import useSaved from '../hooks/useSaved'

type SavedContextValue = ReturnType<typeof useSaved>

const SavedContext = createContext<SavedContextValue | null>(null)

interface SavedProviderProps {
  children: React.ReactNode
}

export function SavedProvider({ children }: SavedProviderProps): JSX.Element {
  const value = useSaved()
  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
}

export function useSavedContext(): SavedContextValue {
  const context = useContext(SavedContext)
  if (!context) {
    throw new Error('useSavedContext must be used within SavedProvider')
  }
  return context
}
