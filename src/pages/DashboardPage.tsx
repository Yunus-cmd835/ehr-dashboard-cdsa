import CountUp from 'react-countup'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import dayjs from 'dayjs'
import {
  FaUser,
  FaCalendarAlt,
  FaFileInvoice,
  FaBrain
} from 'react-icons/fa'
import ClinicalTimeline from '../components/ClinicalTimeline'
import { useDashboardStore } from '../store/useDashboardStore'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
)

export default function DashboardPage() {
  const lastUpdated = dayjs().format('MMMM D, YYYY h:mm A')
  const {
    selectedDiagnosis,
    chartType,
    setDiagnosis,
    setChartType
  } = useDashboardStore()

  const allData = {
    Diabetes: 12,
    Asthma: 8,
    Hypertension: 15,
    Migraine: 5
  }

  const filteredData =
    selectedDiagnosis === 'All'
      ? allData
      : { [selectedDiagnosis]: allData[selectedDiagnosis] }

  const chartLabels = Object.keys(filteredData)
  const chartValues = Object.values(filteredData)

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Cases',
        data: chartValues,
        backgroundColor: chartLabels.map(() => '#3b82f6'),
        borderRadius: 6
      }
    ]
  }

  const pieData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          font: { size: 12 }
        }
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        ticks: { color: '#e2e8f0' },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#e2e8f0' },
        grid: { color: '#334155' }
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-white">📊 Dashboard Overview</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard icon={<FaUser />} label="Patients" value={120} />
        <MetricCard icon={<FaCalendarAlt />} label="Appointments" value={45} />
        <MetricCard icon={<FaFileInvoice />} label="Bills" value={78} />
        <MetricCard icon={<FaBrain />} label="Clinical Records" value={32} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedDiagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="All">All Diagnoses</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Asthma">Asthma</option>
          <option value="Hypertension">Hypertension</option>
          <option value="Migraine">Migraine</option>
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'bar' | 'pie')}
          className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 mb-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 text-white">Top Diagnoses</h2>
        {chartType === 'bar' ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Pie data={pieData} options={{ responsive: true }} />
        )}
      </div>

      {/* Clinical Timeline */}
      <div className="mt-8">
        <ClinicalTimeline />
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Last updated: {lastUpdated}
      </p>
    </div>
  )
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-4 border border-gray-700">
      <div className="text-blue-400 text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <h3 className="text-2xl font-bold text-white">
          <CountUp end={value} duration={1.5} />
        </h3>
      </div>
    </div>
  )
}