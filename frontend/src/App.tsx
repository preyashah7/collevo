import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CompareProvider } from './context/CompareContext'
import { SavedProvider } from './context/SavedContext'
import { ToastProvider } from './context/ToastContext'
import CompareBar from './components/college/CompareBar'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import CollegeDetail from './pages/CollegeDetail'
import CollegeList from './pages/CollegeList'
import Compare from './pages/Compare'
import Home from './pages/Home'
import Saved from './pages/Saved'
import Predictor from './pages/Predictor'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CompareProvider>
            <SavedProvider>
              <div className="min-h-screen bg-gray-50 text-gray-900">
                <Navbar />
                <main className="pb-20">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/colleges" element={<CollegeList />} />
                    <Route path="/colleges/:slug" element={<CollegeDetail />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/predictor" element={<Predictor />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <CompareBar />
                <Footer />
              </div>
            </SavedProvider>
          </CompareProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
