import { useEffect, useState } from 'react'
import { create } from 'zustand'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Appointment {
  id: string
  patientId: string
  date: string
  time: string
  reason: string
}

const useAppointmentStore = create((set) => ({
  appointments: [],
  setAppointments: (data: Appointment[]) => set({ appointments: data }),
  addAppointment: (newAppt: Appointment) =>
    set((state) => ({ appointments: [...state.appointments, newAppt] })),
  updateAppointment: (updated: Appointment) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === updated.id ? updated : a
      )
    })),
  deleteAppointment: (id: string) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id)
    }))
}))

const mockAppointments: Appointment[] = [
  {
    id: 'A-001',
    patientId: 'P-1001',
    date: '2025-09-17',
    time: '10:30',
    reason: 'Routine check-up'
  },
  {
    id: 'A-002',
    patientId: 'P-1002',
    date: '2025-09-18',
    time: '14:00',
    reason: 'Follow-up for asthma'
  }
]

export default function AppointmentsPage() {
  const {
    appointments,
    setAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointmentStore()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [form, setForm] = useState({
    patientId: '',
    date: '',
    time: '',
    reason: ''
  })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setAppointments(mockAppointments)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSave = () => {
    const payload: Appointment = {
      id: selected?.id || `A-${Date.now()}`,
      patientId: form.patientId,
      date: form.date,
      time: form.time,
      reason: form.reason
    }

    if (selected) {
      updateAppointment(payload)
      toast.success('Appointment updated!')
    } else {
      addAppointment(payload)
      toast.success('Appointment added!')
    }

    setIsOpen(false)
    setSelected(null)
    setForm({ patientId: '', date: '', time: '', reason: '' })
  }

  const handleDelete = (id: string) => {
    deleteAppointment(id)
    toast.success('Appointment deleted!')
  }

  const exportCSV = () => {
    const rows = appointments.map((a) => [
      a.id,
      a.patientId,
      a.date,
      a.time,
      a.reason
    ])
    const csv = [['ID', 'Patient ID', 'Date', 'Time', 'Reason'], ...rows]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'appointments.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Appointment Records', 14, 16)
    doc.autoTable({
      head: [['ID', 'Patient ID', 'Date', 'Time', 'Reason']],
      body: appointments.map((a) => [
        a.id,
        a.patientId,
        a.date,
        a.time,
        a.reason
      ])
    })
    doc.save('appointments.pdf')
  }

  const filtered = appointments.filter(
    (a) =>
      a.patientId.toLowerCase().includes(search.toLowerCase()) ||
      a.date.includes(search)
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">📅 Appointment Scheduler</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="w-full sm:w-1/2 p-2 border rounded"
          placeholder="Search by patient ID or date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => {
            setSelected(null)
            setForm({ patientId: '', date: '', time: '', reason: '' })
            setIsOpen(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Appointment
        </button>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Export PDF
        </button>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Patient ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Reason</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="px-4 py-6">
                <Skeleton count={5} height={30} />
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-sm text-gray-500">
                No matching appointments found.
              </td>
            </tr>
          ) : (
            filtered.map((a) => (
              <tr key={a.id} className="border-t text-sm">
                <td className="px-4 py-2">{a.id}</td>
                <td className="px-4 py-2">{a.patientId}</td>
                <td className="px-4 py-2">{a.date}</td>
                <td className="px-4 py-2">{a.time}</td>
                <td className="px-4 py-2">{a.reason}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelected(a)
                      setForm({
                        patientId: a.patientId,
                        date: a.date,
                        time: a.time,
                        reason: a.reason
                      })
                      setIsOpen(true)
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {selected ? 'Edit Appointment' : 'Add Appointment'}
            </h2>
                        <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Patient ID"
                value={form.patientId}
                onChange={(e) =>
                  setForm({ ...form, patientId: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Reason"
                value={form.reason}
                onChange={(e) =>
                  setForm({ ...form, reason: e.target.value })
                }
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {selected ? 'Update Appointment' : 'Add Appointment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}