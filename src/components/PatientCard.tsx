import { useState } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'
import PatientTabs from './PatientTabs'

export default function PatientCard({ patient }) {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({ ...patient })

  const handleUpdate = () => {
    // TODO: update patient in store
    toast.success('Patient info updated')
    setIsOpen(false)
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">{patient.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Age: {patient.age}</p>

        {/* Tabbed Info Section */}
        <PatientTabs patient={patient} />

        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 text-blue-600 dark:text-blue-400 underline"
        >
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Patient">
        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
            placeholder="Age"
          />
          <textarea
            className="w-full p-2 border rounded"
            value={form.allergies.join(', ')}
            onChange={(e) =>
              setForm({
                ...form,
                allergies: e.target.value.split(',').map((a) => a.trim())
              })
            }
            placeholder="Allergies (comma-separated)"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  )
}