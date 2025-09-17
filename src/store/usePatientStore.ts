import { create } from 'zustand'

export interface Patient {
  id: string
  name: string
  dob: string
  gender: string
  contact: string
  allergies: string[]
  conditions: string[]
  medications: string[]
  immunizations: string[]
}

interface PatientStore {
  patients: Patient[]
  setPatients: (data: Patient[]) => void
  addPatient: (newPatient: Patient) => void
  updatePatient: (updated: Patient) => void
  deletePatient: (id: string) => void
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],

  setPatients: (data) => set({ patients: data }),

  addPatient: (newPatient) =>
    set((state) => ({
      patients: [...state.patients, newPatient],
    })),

  updatePatient: (updated) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === updated.id ? updated : p
      ),
    })),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),
}))