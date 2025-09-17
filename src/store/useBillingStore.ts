import { create } from 'zustand'

interface Bill {
  id: string
  patientId: string
  insurance: string
  balance: number
  status: string
}

interface BillingStore {
  bills: Bill[]
  setBills: (data: Bill[]) => void
  addBill: (newBill: Bill) => void
  updateBill: (updated: Bill) => void
  deleteBill: (id: string) => void
}

export const useBillingStore = create<BillingStore>((set) => ({
  bills: [],
  setBills: (data) => set({ bills: data }),
  addBill: (newBill) =>
    set((state) => ({ bills: [...state.bills, newBill] })),
  updateBill: (updated) =>
    set((state) => ({
      bills: state.bills.map((b) =>
        b.id === updated.id ? updated : b
      )
    })),
  deleteBill: (id) =>
    set((state) => ({
      bills: state.bills.filter((b) => b.id !== id)
    }))
}))