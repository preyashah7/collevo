import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CompareBar from './components/college/CompareBar'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import CollegeDetail from './pages/CollegeDetail'
import CollegeList from './pages/CollegeList'
import Compare from './pages/Compare'
import Home from './pages/Home'
import Saved from './pages/Saved'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colleges" element={<CollegeList />} />
            <Route path="/colleges/:slug" element={<CollegeDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <CompareBar />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
