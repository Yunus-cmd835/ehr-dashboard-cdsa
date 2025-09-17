import { create } from 'zustand'

interface Appointment {
  id: string
  patientId: string
  provider: string
  date: string // ISO format
  status: string
}

interface AppointmentStore {
  appointments: Appointment[]
  setAppointments: (data: Appointment[]) => void
  addAppointment: (newAppt: Appointment) => void
  updateAppointment: (updated: Appointment) => void
  deleteAppointment: (id: string) => void
  hasConflict: (date: string, provider: string) => boolean
  isProviderAvailable: (date: string, provider?: string) => boolean
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],

  setAppointments: (data) => set({ appointments: data }),

  addAppointment: (newAppt) =>
    set((state) => ({
      appointments: [...state.appointments, newAppt],
    })),

  updateAppointment: (updated) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === updated.id ? updated : a
      ),
    })),

  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
    })),

  hasConflict: (date, provider) => {
    return get().appointments.some(
      (appt) => appt.date === date && appt.provider === provider
    )
  },

  isProviderAvailable: (date, provider = '') => {
    const hour = new Date(date).getHours()
    const isWithinHours = hour >= 9 && hour <= 17 // 9 AM to 5 PM
    const conflict = get().appointments.some(
      (appt) => appt.date === date && appt.provider === provider
    )
    return isWithinHours && !conflict
  },
}))