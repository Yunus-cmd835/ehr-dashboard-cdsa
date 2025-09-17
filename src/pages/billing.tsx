import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { getBillingData } from '../services/mockApi'
import BillingModal from '../components/BillingModal'
import { useBillingStore } from '../store/useBillingStore'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BillingPage() {
  const { bills, setBills, addBill, updateBill, deleteBill } = useBillingStore()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    toast.promise(getBillingData(), {
      loading: 'Loading billing data...',
      success: 'Billing data loaded!',
      error: 'Failed to load billing data'
    }).then((data) => {
      setBills(data)
      setLoading(false)
    })
  }, [])

  const handleSave = (data) => {
    if (selectedBill) {
      updateBill(data)
      toast.success('Bill updated!')
    } else {
      addBill(data)
      toast.success('Bill added!')
    }
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteBill(id)
    toast.success('Bill deleted!')
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">💰 Billing Dashboard</h1>

        <button
          onClick={() => {
            setSelectedBill(null)
            setIsOpen(true)
          }}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Bill
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold">
                <th className="px-4 py-2">Patient ID</th>
                <th className="px-4 py-2">Insurance</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6">
                    <Skeleton count={5} height={30} />
                  </td>
                </tr>
              ) : bills.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-sm text-gray-500">
                    No billing records found.
                  </td>
                </tr>
              ) : (
                bills.map((b) => (
                  <tr key={b.id} className="border-t text-sm">
                    <td className="px-4 py-2">{b.patientId}</td>
                    <td className="px-4 py-2">{b.insurance}</td>
                    <td className="px-4 py-2">₹{b.balance}</td>
                    <td className="px-4 py-2">{b.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBill(b)
                          setIsOpen(true)
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <BillingModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          initialData={selectedBill}
        />
      </div>
    </Layout>
  )
}