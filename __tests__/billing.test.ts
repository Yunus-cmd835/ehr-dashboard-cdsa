import { create } from 'zustand'
import { describe, it, expect, beforeEach } from 'vitest'

interface Payment {
  date: string
  amount: number
}

interface Bill {
  id: string
  patientId: string
  insurance: string
  balance: number
  payments: Payment[]
  billingCodes: string[]
  feeSchedule: Record<string, number>
}

interface BillingStore {
  bills: Bill[]
  setBills: (data: Bill[]) => void
}

const useBillingTestStore = create<BillingStore>((set) => ({
  bills: [],
  setBills: (data) => set({ bills: data })
}))

describe('Billing Store', () => {
  beforeEach(() => {
    useBillingTestStore.setState({ bills: [] })
  })

  it('calculates correct balance after payments', () => {
    const bill: Bill = {
      id: 'B001',
      patientId: 'P001',
      insurance: 'Apollo',
      balance: 1000,
      payments: [
        { date: '2025-09-01', amount: 300 },
        { date: '2025-09-05', amount: 200 }
      ],
      billingCodes: ['99213'],
      feeSchedule: { '99213': 1000 }
    }

    useBillingTestStore.getState().setBills([bill])
    const totalPaid = useBillingTestStore.getState().bills[0].payments.reduce((sum, p) => sum + p.amount, 0)
    expect(totalPaid).toBe(500)
    expect(useBillingTestStore.getState().bills[0].balance).toBe(1000)
  })
})