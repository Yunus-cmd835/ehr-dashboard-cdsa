import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { useMemo } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function BillingPieChart({ bills }) {
  const chartData = useMemo(() => {
    const totals = {}
    bills.forEach((bill) => {
      const provider = bill.insurance || 'Unknown'
      totals[provider] = (totals[provider] || 0) + (bill.balance || 0)
    })

    const labels = Object.keys(totals)
    const data = Object.values(totals)

    return {
      labels,
      datasets: [
        {
          label: 'Billing Balance',
          data,
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6',
            '#ec4899'
          ],
          borderWidth: 1
        }
      ]
    }
  }, [bills])

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">💸 Billing Breakdown by Insurance</h2>
      <Pie data={chartData} />
    </div>
  )
}