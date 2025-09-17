import { useState } from 'react'
import { useAppointmentStore } from '../store/useAppointmentStore'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

export default function AppointmentForm() {
  const { addAppointment, hasConflict, isProviderAvailable } = useAppointmentStore()
  const [patientId, setPatientId] = useState('')
  const [provider, setProvider] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState<'Scheduled' | 'Completed' | 'Cancelled'>('Scheduled')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!patientId || !provider || !date) {
      toast.error('All fields are required')
      return
    }

    if (!isProviderAvailable(date)) {
      toast.error('Provider unavailable at selected time')
      return
    }

    if (hasConflict(date, provider)) {
      toast.error('Appointment conflict detected')
      return
    }

    const newAppt = {
      id: uuidv4(),
      patientId,
      provider,
      date,
      status
    }

    addAppointment(newAppt)
    toast.success('Appointment added successfully')

    setPatientId('')
    setProvider('')
    setDate('')
    setStatus('Scheduled')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
      <input placeholder="Provider" value={provider} onChange={(e) => setProvider(e.target.value)} />
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  )
}


  