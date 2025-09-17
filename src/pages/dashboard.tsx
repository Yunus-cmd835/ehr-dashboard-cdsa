import { useEffect, useState } from 'react'
import {
  getPatients,
  getAppointments,
  getClinicalData
} from '../services/mockApi'
import { Pie, Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function DashboardPage() {
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [clinical, setClinical] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      toast.promise(getPatients(), {
        loading: 'Loading patients...',
        success: 'Patients loaded!',
        error: 'Failed to load patients'
      }),
      toast.promise(getAppointments(), {
        loading: 'Loading appointments...',
        success: 'Appointments loaded!',
        error: 'Failed to load appointments'
      }),
      toast.promise(getClinicalData(), {
        loading: 'Loading clinical data...',
        success: 'Clinical data loaded!',
        error: 'Failed to load clinical data'
      })
    ])
      .then(([p, a, c]) => {
        setPatients(p)
        setAppointments(a)
        setClinical(c)
      })
      .finally(() => setLoading(false))
  }, [])

  const genderStats = {
    Male: patients.filter((p) => p.gender === 'Male').length,
    Female: patients.filter((p) => p.gender === 'Female').length,
    Other: patients.filter((p) => !['Male', 'Female'].includes(p.gender)).length
  }

  const ageGroups = {
    '0-18': patients.filter((p) => p.age <= 18).length,
    '19-35': patients.filter((p) => p.age > 18 && p.age <= 35).length,
    '36-60': patients.filter((p) => p.age > 35 && p.age <= 60).length,
    '60+': patients.filter((p) => p.age > 60).length
  }

  const diagnosisCount = clinical.reduce((acc, record) => {
    record.diagnoses?.forEach((d) => {
      acc[d] = (acc[d] || 0) + 1
    })
    return acc
  }, {})

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">📊 EHR Dashboard Summary</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">👨‍⚕️ Total Patients</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? <Skeleton height={40} /> : patients.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">📅 Appointments</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? <Skeleton height={40} /> : appointments.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">🧠 Diagnoses</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? (
              <Skeleton height={40} />
            ) : (
              Object.keys(diagnosisCount).length
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
          {loading ? (
            <Skeleton height={200} />
          ) : (
            <div className="overflow-x-auto">
              <Pie
                data={{
                  labels: Object.keys(genderStats),
                  datasets: [
                    {
                      data: Object.values(genderStats),
                      backgroundColor: ['#3b82f6', '#ef4444', '#10b981']
                    }
                  ]
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Age Groups</h2>
          {loading ? (
            <Skeleton height={200} />
          ) : (
            <div className="overflow-x-auto">
              <Bar
                data={{
                  labels: Object.keys(ageGroups),
                  datasets: [
                    {
                      label: 'Patients',
                      data: Object.values(ageGroups),
                      backgroundColor: '#6366f1'
                    }
                  ]
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}