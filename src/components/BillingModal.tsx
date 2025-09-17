import { useState, useEffect } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'

export default function BillingModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    patientId: '',
    insurance: '',
    balance: '',
    status: ''
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        patientId: initialData.patientId || '',
        insurance: initialData.insurance || '',
        balance: initialData.balance?.toString() || '',
        status: initialData.status || ''
      })
    } else {
      setForm({
        patientId: '',
        insurance: '',
        balance: '',
        status: ''
      })
    }
  }, [initialData])

  const handleSubmit = () => {
    if (!form.patientId || !form.insurance || !form.balance || !form.status) {
      toast.error('Please fill all fields')
      return
    }

    const payload = {
      ...form,
      id: initialData?.id || `B-${Date.now()}`,
      balance: parseFloat(form.balance)
    }

    onSave(payload)
    toast.success(initialData ? 'Bill updated' : 'Bill added')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Bill' : 'Add Bill'}>
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Patient ID"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Insurance Provider"
          value={form.insurance}
          onChange={(e) => setForm({ ...form, insurance: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Balance"
          type="number"
          value={form.balance}
          onChange={(e) => setForm({ ...form, balance: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Rejected">Rejected</option>
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