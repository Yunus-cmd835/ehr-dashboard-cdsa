import { NavLink } from 'react-router-dom'
import { FaHome, FaUser, FaCalendarAlt, FaFileInvoice, FaBrain } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">🩺 EHR Portal</div>
      <nav className="flex-1 p-4 space-y-4">
        <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold text-blue-400' : 'hover:text-blue-300'}>
          <FaHome className="inline mr-2" /> Dashboard
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => isActive ? 'font-semibold text-blue-400' : 'hover:text-blue-300'}>
          <FaUser className="inline mr-2" /> Patients
        </NavLink>
        <NavLink to="/appointments" className={({ isActive }) => isActive ? 'font-semibold text-blue-400' : 'hover:text-blue-300'}>
          <FaCalendarAlt className="inline mr-2" /> Appointments
        </NavLink>
        <NavLink to="/billing" className={({ isActive }) => isActive ? 'font-semibold text-blue-400' : 'hover:text-blue-300'}>
          <FaFileInvoice className="inline mr-2" /> Billing
        </NavLink>
        <NavLink to="/clinical" className={({ isActive }) => isActive ? 'font-semibold text-blue-400' : 'hover:text-blue-300'}>
          <FaBrain className="inline mr-2" /> Clinical
        </NavLink>
      </nav>
    </div>
  )
}