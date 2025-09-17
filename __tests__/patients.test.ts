import { describe, it, expect, beforeEach } from 'vitest'
import { usePatientStore } from '../src/store/usePatientStore'

describe('Patient Store', () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    usePatientStore.setState({ patients: [] })
  })

  it('adds a new patient', () => {
    const store = usePatientStore.getState()

    const newPatient = {
      id: 'P001',
      name: 'Arjun Rao',
      dob: '1983-05-12',
      gender: 'Male',
      contact: '9876543210',
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Amlodipine'],
      immunizations: ['COVID-19']
    }

    store.addPatient(newPatient)

    const patients = usePatientStore.getState().patients
    expect(patients.length).toBe(1)
    expect(patients[0].name).toBe('Arjun Rao')
  })

  it('updates patient info', () => {
    const store = usePatientStore.getState()

    const originalPatient = {
      id: 'P001',
      name: 'Arjun Rao',
      dob: '1983-05-12',
      gender: 'Male',
      contact: '9876543210',
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Amlodipine'],
      immunizations: ['COVID-19']
    }

    store.addPatient(originalPatient)

    const updatedPatient = {
      ...originalPatient,
      immunizations: ['COVID-19', 'Hepatitis B']
    }

    store.updatePatient(updatedPatient)

    const patients = usePatientStore.getState().patients
    expect(patients[0].immunizations).toContain('Hepatitis B')
  })

  it('deletes a patient', () => {
    const store = usePatientStore.getState()

    const patient = {
      id: 'P001',
      name: 'Arjun Rao',
      dob: '1983-05-12',
      gender: 'Male',
      contact: '9876543210',
      allergies: ['Penicillin'],
      conditions: ['Hypertension'],
      medications: ['Amlodipine'],
      immunizations: ['COVID-19']
    }

    store.addPatient(patient)
    store.deletePatient('P001')

    const patients = usePatientStore.getState().patients
    expect(patients.length).toBe(0)
  })
})