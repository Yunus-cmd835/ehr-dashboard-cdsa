import { useState, useEffect } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'
import { LexicalEditor } from '../components/LexicalEditor'

export default function ClinicalModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    patientId: '',
    diagnoses: [],
    medications: [],
    notes: ''
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        patientId: initialData.patientId || '',
        diagnoses: initialData.diagnoses || [],
        medications: initialData.medications || [],
        notes: initialData.notes || ''
      })
    } else {
      setForm({
        patientId: '',
        diagnoses: [],
        medications: [],
        notes: ''
      })
    }
  }, [initialData])

  const handleSubmit = () => {
    if (!form.patientId || form.diagnoses.length === 0) {
      toast.error('Patient ID and at least one diagnosis required')
      return
    }

    const payload = {
      ...form,
      id: initialData?.id || `C-${Date.now()}`
    }

    onSave(payload)
    toast.success(initialData ? 'Clinical record updated' : 'Clinical record added')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Clinical Record' : 'Add Clinical Record'}>
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Patient ID"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Diagnoses (comma-separated)"
          value={form.diagnoses.join(', ')}
          onChange={(e) =>
            setForm({ ...form, diagnoses: e.target.value.split(',').map(d => d.trim()) })
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
        <LexicalEditor
          value={form.notes}
          onChange={(val) => setForm({ ...form, notes: val })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {initialData ? 'Update Record' : 'Add Record'}
        </button>
      </div>
    </Modal>
  )
}