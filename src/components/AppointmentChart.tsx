import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Sept 1', 'Sept 2', 'Sept 3', 'Sept 4', 'Sept 5'],
  datasets: [
    {
      label: 'Appointments',
      data: [2, 5, 3, 4, 1],
      backgroundColor: '#3b82f6'
    }
  ]
}

export default function AppointmentChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Bar data={data} />
    </div>
  )
}