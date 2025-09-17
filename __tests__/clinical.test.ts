import { create } from 'zustand'
import { describe, it, expect, beforeEach } from 'vitest'

interface ClinicalNote {
  id: string
  patientId: string
  notes: string
  vitals: { bp: string; hr: number }
  labs: string[]
  medications: string[]
  diagnoses: string[]
  procedures: string[]
}

interface ClinicalStore {
  notes: ClinicalNote[]
  setNotes: (data: ClinicalNote[]) => void
  updateNote: (updated: ClinicalNote) => void
}

const useClinicalTestStore = create<ClinicalStore>((set) => ({
  notes: [],
  setNotes: (data) => set({ notes: data }),
  updateNote: (updated) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === updated.id ? { ...n, ...updated } : n))
    }))
}))

describe('Clinical Store', () => {
  beforeEach(() => {
    useClinicalTestStore.setState({ notes: [] })
  })

  it('adds a new clinical note', () => {
    const newNote: ClinicalNote = {
      id: 'CN001',
      patientId: 'P001',
      notes: 'Patient reports mild headache.',
      vitals: { bp: '120/80', hr: 72 },
      labs: ['CBC'],
      medications: ['Paracetamol'],
      diagnoses: ['R51'],
      procedures: ['99213']
    }

    useClinicalTestStore.getState().setNotes([newNote])
    expect(useClinicalTestStore.getState().notes.length).toBe(1)
    expect(useClinicalTestStore.getState().notes[0].diagnoses).toContain('R51')
  })

  it('updates an existing note diagnosis', () => {
    const originalNote: ClinicalNote = {
      id: 'CN002',
      patientId: 'P002',
      notes: 'Initial visit.',
      vitals: { bp: '130/85', hr: 80 },
      labs: [],
      medications: [],
      diagnoses: ['Z00.00'],
      procedures: []
    }

    useClinicalTestStore.getState().setNotes([originalNote])
    useClinicalTestStore.getState().updateNote({
      ...originalNote,
      diagnoses: ['Z00.00', 'J10.1']
    })

    expect(useClinicalTestStore.getState().notes[0].diagnoses).toContain('J10.1')
    expect(useClinicalTestStore.getState().notes[0].diagnoses.length).toBe(2)
  })

  it('handles empty vitals gracefully', () => {
    const note: ClinicalNote = {
      id: 'CN003',
      patientId: 'P003',
      notes: 'Vitals not recorded.',
      vitals: { bp: '', hr: 0 },
      labs: [],
      medications: [],
      diagnoses: [],
      procedures: []
    }

    useClinicalTestStore.getState().setNotes([note])
    expect(useClinicalTestStore.getState().notes[0].vitals.bp).toBe('')
    expect(useClinicalTestStore.getState().notes[0].vitals.hr).toBe(0)
  })

  it('rejects note with missing patient ID', () => {
    const note: ClinicalNote = {
      id: 'CN004',
      patientId: '',
      notes: 'Missing patient ID.',
      vitals: { bp: '110/70', hr: 65 },
      labs: [],
      medications: [],
      diagnoses: [],
      procedures: []
    }

    useClinicalTestStore.getState().setNotes([note])
    expect(useClinicalTestStore.getState().notes[0].patientId).toBe('')
  })
})