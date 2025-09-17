import { useEffect, useState } from 'react'
import { create } from 'zustand'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface ClinicalRecord {
  id: string
  patientId: string
  diagnoses: string[]
  medications: string[]
  notes: string
}

const useClinicalStore = create((set) => ({
  clinical: [],
  setClinical: (data: ClinicalRecord[]) => set({ clinical: data }),
  addRecord: (newRecord: ClinicalRecord) =>
    set((state) => ({ clinical: [...state.clinical, newRecord] })),
  updateRecord: (updated: ClinicalRecord) =>
    set((state) => ({
      clinical: state.clinical.map((r) =>
        r.id === updated.id ? updated : r
      )
    })),
  deleteRecord: (id: string) =>
    set((state) => ({
      clinical: state.clinical.filter((r) => r.id !== id)
    }))
}))

const mockData: ClinicalRecord[] = [
  {
    id: 'C-001',
    patientId: 'P-1001',
    diagnoses: ['Diabetes', 'Hypertension'],
    medications: ['Metformin', 'Lisinopril'],
    notes: 'Patient is stable. Blood sugar under control.'
  },
  {
    id: 'C-002',
    patientId: 'P-1002',
    diagnoses: ['Asthma'],
    medications: ['Salbutamol'],
    notes: 'Prescribed inhaler. Monitor breathing rate.'
  }
]

export default function ClinicalPage() {
  const { clinical, setClinical, addRecord, updateRecord, deleteRecord } = useClinicalStore()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null)
  const [searchDiagnosis, setSearchDiagnosis] = useState('')
  const [searchPatient, setSearchPatient] = useState('')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    patientId: '',
    diagnoses: '',
    medications: '',
    notes: ''
  })

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setClinical(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSave = () => {
    const payload: ClinicalRecord = {
      id: selectedRecord?.id || `C-${Date.now()}`,
      patientId: form.patientId,
      diagnoses: form.diagnoses.split(',').map((d) => d.trim()),
      medications: form.medications.split(',').map((m) => m.trim()),
      notes: form.notes
    }

    if (selectedRecord) {
      updateRecord(payload)
      toast.success('Record updated!')
    } else {
      addRecord(payload)
      toast.success('Record added!')
    }

    setIsOpen(false)
    setSelectedRecord(null)
    setForm({ patientId: '', diagnoses: '', medications: '', notes: '' })
  }

  const handleDelete = (id: string) => {
    deleteRecord(id)
    toast.success('Record deleted!')
  }

  const filteredRecords = clinical.filter((r) =>
    (r.diagnoses || []).some((d) =>
      d.toLowerCase().includes(searchDiagnosis.toLowerCase())
    ) &&
    r.patientId?.toLowerCase().includes(searchPatient.toLowerCase())
  )

  const exportCSV = () => {
    const rows = clinical.map((r) => [
      r.patientId,
      r.diagnoses.join(', '),
      r.medications.join(', '),
      r.notes
    ])
    const csv = [
      ['Patient ID', 'Diagnoses', 'Medications', 'Notes'],
      ...rows
    ].map((row) => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clinical_records.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Clinical Records', 14, 16)
    doc.autoTable({
      head: [['Patient ID', 'Diagnoses', 'Medications', 'Notes']],
      body: clinical.map((r) => [
        r.patientId,
        r.diagnoses.join(', '),
        r.medications.join(', '),
        r.notes
      ])
    })
    doc.save('clinical_records.pdf')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">🧠 Clinical Dashboard</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="w-full sm:w-1/2 p-2 border rounded"
          placeholder="Search by diagnosis"
          value={searchDiagnosis}
          onChange={(e) => setSearchDiagnosis(e.target.value)}
        />
        <input
          className="w-full sm:w-1/2 p-2 border rounded"
          placeholder="Search by patient ID"
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => {
            setSelectedRecord(null)
            setForm({ patientId: '', diagnoses: '', medications: '', notes: '' })
            setIsOpen(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Clinical Record
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
            <th className="px-4 py-2">Patient ID</th>
            <th className="px-4 py-2">Diagnoses</th>
            <th className="px-4 py-2">Medications</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="px-4 py-6">
                <Skeleton count={5} height={30} />
              </td>
            </tr>
          ) : filteredRecords.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-sm text-gray-500">
                No matching clinical records found.
              </td>
            </tr>
          ) : (
            filteredRecords.map((r) => (
              <tr key={r.id} className="border-t text-sm">
                <td className="px-4 py-2">{r.patientId}</td>
                <td className="px-4 py-2">{r.diagnoses.join(', ')}</td>
                <td className="px-4 py-2">{r.medications.join(', ')}</td>
                <td className="px-4 py-2">{r.notes}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRecord(r)
                      setForm({
                        patientId: r.patientId,
                        diagnoses: r.diagnoses.join(', '),
                        medications: r.medications.join(', '),
                        notes: r.notes
                      })
                      setIsOpen(true)
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
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
              {selectedRecord ? 'Edit Clinical Record' : 'Add Clinical Record'}
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
                placeholder="Diagnoses (comma-separated)"
                value={form.diagnoses}
                onChange={(e) =>
                  setForm({ ...form, diagnoses: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Medications (comma-separated)"
                value={form.medications}
                onChange={(e) =>
                  setForm({ ...form, medications: e.target.value })
                }
              />
              <textarea
                className="w-full p-2 border rounded min-h-[100px]"
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
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
                  {selectedRecord ? 'Update Record' : 'Add Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}