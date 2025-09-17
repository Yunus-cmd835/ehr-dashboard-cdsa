import { useState, useEffect } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'

export default function AppointmentModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    patientId: '',
    provider: '',
    date: '',
    status: ''
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        patientId: initialData.patientId || '',
        provider: initialData.provider || '',
        date: initialData.date || '',
        status: initialData.status || ''
      })
    } else {
      setForm({
        patientId: '',
        provider: '',
        date: '',
        status: ''
      })
    }
  }, [initialData])

  const handleSubmit = () => {
    if (!form.patientId || !form.provider || !form.date || !form.status) {
      toast.error('Please fill all fields')
      return
    }

    const payload = {
      ...form,
      id: initialData?.id || `A-${Date.now()}`
    }

    onSave(payload)
    toast.success(initialData ? 'Appointment updated' : 'Appointment added')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Appointment' : 'Add Appointment'}>
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Patient ID"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Provider"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
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