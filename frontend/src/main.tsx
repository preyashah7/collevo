import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { CompareProvider } from './context/CompareContext'
import { SavedProvider } from './context/SavedContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SavedProvider>
      <CompareProvider>
        <App />
      </CompareProvider>
    </SavedProvider>
  </React.StrictMode>
)
