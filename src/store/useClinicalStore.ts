import { create } from 'zustand'

interface ClinicalRecord {
  id: string
  patientId: string
  diagnoses: string[]
  medications: string[]
  notes: string
}

interface ClinicalStore {
  clinical: ClinicalRecord[]
  setClinical: (data: ClinicalRecord[]) => void
  addRecord: (newRecord: ClinicalRecord) => void
  updateRecord: (updated: ClinicalRecord) => void
  deleteRecord: (id: string) => void
}

export const useClinicalStore = create<ClinicalStore>((set) => ({
  clinical: [],
  setClinical: (data) => set({ clinical: data }),
  addRecord: (newRecord) =>
    set((state) => ({ clinical: [...state.clinical, newRecord] })),
  updateRecord: (updated) =>
    set((state) => ({
      clinical: state.clinical.map((r) =>
        r.id === updated.id ? updated : r
      )
    })),
  deleteRecord: (id) =>
    set((state) => ({
      clinical: state.clinical.filter((r) => r.id !== id)
    }))
}))