import { useEffect, useState } from 'react'
import { getClinicalData } from '../services/mockApi'

export default function ClinicalHistory({ patientId }) {
  const [records, setRecords] = useState([])

  useEffect(() => {
    getClinicalData().then((data) => {
      const filtered = data.filter((r) => r.patientId === patientId)
      setRecords(filtered)
    })
  }, [patientId])

  if (records.length === 0) return <p>No clinical records found.</p>

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold">
          <th className="px-4 py-2">Diagnoses</th>
          <th className="px-4 py-2">Medications</th>
          <th className="px-4 py-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id} className="border-t text-sm">
            <td className="px-4 py-2">{r.diagnoses.join(', ')}</td>
            <td className="px-4 py-2">{r.medications.join(', ')}</td>
            <td className="px-4 py-2">{r.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}