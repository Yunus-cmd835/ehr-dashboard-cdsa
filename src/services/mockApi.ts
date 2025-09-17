import patients from '../mock/patients.json'
import appointments from '../mock/appointments.json'
import clinical from '../mock/clinical.json'
import billing from '../mock/billing.json'

/**
 * Simulate network delay
 */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Patient Records
 */
export const getPatients = async () => {
  await delay(300)
  return patients
}

export const getPatientsById = async (id: string) => {
  await delay(200)
  return patients.find((p) => p.id === id)
}

/**
 * Appointment Records
 */
export const getAppointments = async () => {
  await delay(300)
  return appointments
}

/**
 * Billing Records
 */
export const getBillingData = async () => {
  await delay(300)
  return billing
}

export const getBills = getBillingData

/**
 * Clinical Records
 */
let clinicalData = [...clinical] // mutable in-memory copy

export const getClinicalData = async () => {
  await delay(300)
  return clinicalData
}

export const addClinicalRecord = async (newRecord: any) => {
  await delay(200)
  clinicalData.push(newRecord)
  return newRecord
}

export const updateClinicalRecord = async (id: string, updated: any) => {
  await delay(200)
  const index = clinicalData.findIndex((r) => r.id === id)
  if (index !== -1) {
    clinicalData[index] = { ...clinicalData[index], ...updated }
    return clinicalData[index]
  }
  return null
}

export const deleteClinicalRecord = async (id: string) => {
  await delay(200)
  clinicalData = clinicalData.filter((r) => r.id !== id)
  return true
}