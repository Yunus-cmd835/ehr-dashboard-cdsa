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
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#f9f9f9',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h3>Add Billing Record</h3>
      <input
        placeholder="Patient ID"
        value={form.patientId}
        onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        required
      />
      <input
        placeholder="Insurance"
        value={form.insurance}
        onChange={(e) => setForm({ ...form, insurance: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Balance"
        value={form.balance}
        onChange={(e) => setForm({ ...form, balance: Number(e.target.value) })}
        required
      />
      <button type="submit">Add Billing</button>
    </form>
  )
}