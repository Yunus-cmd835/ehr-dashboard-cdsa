import { useState, useEffect } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'

export default function PatientModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    contact: '',
    allergies: [],
    conditions: [],
    medications: [],
    immunizations: []
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        dob: initialData.dob || '',
        gender: initialData.gender || '',
        contact: initialData.contact || '',
        allergies: initialData.allergies || [],
        conditions: initialData.conditions || [],
        medications: initialData.medications || [],
        immunizations: initialData.immunizations || []
      })
    } else {
      setForm({
        name: '',
        dob: '',
        gender: '',
        contact: '',
        allergies: [],
        conditions: [],
        medications: [],
        immunizations: []
      })
    }
  }, [initialData])

  const handleSubmit = () => {
    if (!form.name || !form.dob || !form.gender || !form.contact) {
      toast.error('Please fill all required fields')
      return
    }

    const payload = {
      ...form,
      id: initialData?.id || `P-${Date.now()}`
    }

    onSave(payload)
    toast.success(initialData ? 'Patient updated' : 'Patient added')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Patient' : 'Add Patient'}>
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Date of Birth"
          type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
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
        <input
          className="w-full p-2 border rounded"
          placeholder="Allergies (comma-separated)"
          value={form.allergies.join(', ')}
          onChange={(e) =>
            setForm({ ...form, allergies: e.target.value.split(',').map(a => a.trim()) })
          }
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Conditions (comma-separated)"
          value={form.conditions.join(', ')}
          onChange={(e) =>
            setForm({ ...form, conditions: e.target.value.split(',').map(c => c.trim()) })
          }
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Medications (comma-separated)"
          value={form.medications.join(', ')}
          onChange={(e) =>
            setForm({ ...form, medications: e.target.value.split(',').map(m => m.trim()) })
          }
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Immunizations (comma-separated)"
          value={form.immunizations.join(', ')}
          onChange={(e) =>
            setForm({ ...form, immunizations: e.target.value.split(',').map(i => i.trim()) })
          }
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Save
        </button>
      </div>
    </Modal>
  )
}