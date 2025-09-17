import { describe, it, expect } from 'vitest'
import { useAppointmentStore } from '../src/store/useAppointmentStore'

describe('Appointment Store', () => {
  it('detects conflict for same provider and time', () => {
    const store = useAppointmentStore.getState()
    store.setAppointments([
      { id: '1', patientId: 'P001', provider: 'Dr. Nair', date: '2025-09-17T10:00', status: 'Scheduled' }
    ])
    const conflict = store.hasConflict('2025-09-17T10:00', 'Dr. Nair')
    expect(conflict).toBe(true)
  })

  it('allows booking if provider is available', () => {
    const store = useAppointmentStore.getState()
    const available = store.isProviderAvailable('2025-09-17T11:00')
    expect(available).toBe(true)
  })

  it('blocks booking outside working hours', () => {
    const store = useAppointmentStore.getState()
    const available = store.isProviderAvailable('2025-09-17T20:00')
    expect(available).toBe(false)
  })
})