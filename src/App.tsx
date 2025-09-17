import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PatientsPage from './pages/PatientsPage'
import DashboardPage from './pages/DashboardPage'
import AppointmentsPage from './pages/AppointmentsPage'
import BillingPage from './pages/BillingPage'
import ClinicalPage from './pages/ClinicalPage'
import NotFoundPage from './pages/NotFoundPage'
import Sidebar from './components/Sidebar'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

export default function App() {
  const { darkMode } = useThemeStore()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/clinical" element={<ClinicalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  )
}