import { useEffect, useState } from 'react'
import { create } from 'zustand'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import ClinicalHistory from '../components/ClinicalHistory'
import AppointmentHistory from '../components/AppointmentHistory'

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  contact: string
}

const usePatientStore = create((set) => ({
  patients: [],
  setPatients: (data: Patient[]) => set({ patients: data }),
  addPatient: (newPatient: Patient) =>
    set((state) => ({ patients: [...state.patients, newPatient] })),
  updatePatient: (updated: Patient) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === updated.id ? updated : p
      )
    })),
  deletePatient: (id: string) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id)
    }))
}))

const mockPatients: Patient[] = [
  { id: 'P-1001', name: 'Arjun Reddy', age: 32, gender: 'Male', contact: '9876543210' },
  { id: 'P-1002', name: 'Meera Nair', age: 28, gender: 'Female', contact: '9123456780' }
]

export default function PatientsPage() {
  const { patients, setPatients, addPatient, updatePatient, deletePatient } = usePatientStore()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Patient | null>(null)
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' })
  const [search, setSearch] = useState('')
  const [historyPatientId, setHistoryPatientId] = useState<string | null>(null)
  const [appointmentPatientId, setAppointmentPatientId] = useState<string | null>(null)

  useEffect(() => {
    setPatients(mockPatients)
  }, [])

  const handleSave = () => {
    const payload: Patient = {
      id: selected?.id || `P-${Date.now()}`,
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      contact: form.contact
    }

    selected ? updatePatient(payload) : addPatient(payload)
    setIsOpen(false)
    setSelected(null)
    setForm({ name: '', age: '', gender: '', contact: '' })
  }

  const exportCSV = () => {
    const rows = patients.map((p) => [p.id, p.name, p.age, p.gender, p.contact])
    const csv = [['ID', 'Name', 'Age', 'Gender', 'Contact'], ...rows]
      .map((row) => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'patients.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Patient Records', 14, 16)
    doc.autoTable({
      head: [['ID', 'Name', 'Age', 'Gender', 'Contact']],
      body: patients.map((p) => [p.id, p.name, p.age, p.gender, p.contact])
    })
    doc.save('patients.pdf')
  }

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">👨‍⚕️ Patient Management</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="w-full sm:w-1/2 p-2 border rounded"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => {
            setSelected(null)
            setForm({ name: '', age: '', gender: '', contact: '' })
            setIsOpen(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Patient
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
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t text-sm">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.age}</td>
              <td className="px-4 py-2">{p.gender}</td>
              <td className="px-4 py-2">{p.contact}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => {
                    setSelected(p)
                    setForm({
                      name: p.name,
                      age: String(p.age),
                      gender: p.gender,
                      contact: p.contact
                    })
                    setIsOpen(true)
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePatient(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setHistoryPatientId(p.id)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  View History
                </button>
                <button
                  onClick={() => setAppointmentPatientId(p.id)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                >
                  View Appointments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {selected ? 'Edit Patient' : 'Add Patient'}
            </h2>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Age"
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Gender"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Contact"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                             />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {selected ? 'Update Patient' : 'Add Patient'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {historyPatientId && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">🧠 Clinical History for {historyPatientId}</h2>
          <ClinicalHistory patientId={historyPatientId} />
        </div>
      )}

      {appointmentPatientId && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">📅 Appointments for {appointmentPatientId}</h2>
          <AppointmentHistory patientId={appointmentPatientId} />
        </div>
      )}
    </div>
  )
}