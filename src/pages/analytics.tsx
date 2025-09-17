import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { getPatients, getAppointments, getBillingData, getClinicalData } from '../services/mockApi'
import AppointmentChart from '../components/AppointmentChart'
import BillingPieChart from '../components/BillingPieChart'

export default function AnalyticsPage() {
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [bills, setBills] = useState([])
  const [clinical, setClinical] = useState([])

  useEffect(() => {
    getPatients().then(setPatients)
    getAppointments().then(setAppointments)
    getBillingData().then(setBills)
    getClinicalData().then(setClinical)
  }, [])

  const today = new Date().toISOString().slice(0, 10)
  const appointmentsToday = appointments.filter((a) => a.date.startsWith(today)).length

  const totalBilling = bills.reduce((sum, b) => sum + (b.balance || 0), 0)

  const diagnosisCount = clinical.reduce((acc, record) => {
    record.diagnoses?.forEach((code) => {
      acc[code] = (acc[code] || 0) + 1
    })
    return acc
  }, {})

  const topDiagnoses = Object.entries(diagnosisCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">🧑 Total Patients</h2>
            <p className="text-3xl mt-2">{patients.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">📅 Appointments Today</h2>
            <p className="text-3xl mt-2">{appointmentsToday}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">💰 Total Billing Balance</h2>
            <p className="text-3xl mt-2">₹{totalBilling}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">🧠 Top Diagnoses</h2>
            <ul className="mt-2 space-y-1">
              {topDiagnoses.map(([code, count]) => (
                <li key={code} className="text-sm">
                  {code} — {count} cases
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-10 mb-4">📈 Appointments Overview</h2>
        <AppointmentChart appointments={appointments} />

        <h2 className="text-xl font-bold mt-10 mb-4">💸 Billing Breakdown</h2>
        <BillingPieChart bills={bills} />
      </div>
    </Layout>
  )
}