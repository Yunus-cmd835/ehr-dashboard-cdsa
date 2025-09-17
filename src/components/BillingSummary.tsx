import { useState } from 'react'
import { useBillingStore } from '../store/useBillingStore'
import { v4 as uuidv4 } from 'uuid'

export default function BillingForm() {
  const { bills, setBills } = useBillingStore()
  const [form, setForm] = useState({
    patientId: '',
    insurance: '',
    balance: 0,
    payments: [],
    billingCodes: [],
    feeSchedule: {}
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBill = { ...form, id: uuidv4() }
    setBills([...bills, newBill])
    setForm({
      patientId: '',
      insurance: '',
      balance: 0,
      payments: [],
      billingCodes: [],
      feeSchedule: {}
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Patient ID" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} />
      <input placeholder="Insurance" value={form.insurance} onChange={(e) => setForm({ ...form, insurance: e.target.value })} />
      <input type="number" placeholder="Balance" value={form.balance} onChange={(e) => setForm({ ...form, balance: Number(e.target.value) })} />
      <button type="submit">Add Billing Record</button>
    </form>
  )
}