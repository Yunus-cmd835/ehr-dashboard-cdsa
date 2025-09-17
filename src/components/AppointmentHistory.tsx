import { useEffect, useState } from 'react'
import { getAppointments } from '../services/mockApi'

export default function AppointmentHistory({ patientId }: { patientId: string }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then((data) => {
      const filtered = data.filter((a) => a.patientId === patientId)
      setAppointments(filtered)
    })
  }, [patientId])

  if (appointments.length === 0) return <p>No appointments found.</p>

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold">
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">Reason</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={a.id} className="border-t text-sm">
            <td className="px-4 py-2">{a.date}</td>
            <td className="px-4 py-2">{a.time}</td>
            <td className="px-4 py-2">{a.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}