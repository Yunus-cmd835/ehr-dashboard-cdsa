import { useState } from 'react'
import { useClinicalStore } from '../store/useClinicalStore'
import { v4 as uuidv4 } from 'uuid'

export default function ClinicalNoteForm() {
  const { notes, setNotes } = useClinicalStore()
  const [form, setForm] = useState({
    patientId: '',
    notes: '',
    vitals: { bp: '', hr: 0 },
    labs: [],
    medications: [],
    diagnoses: [],
    procedures: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newNote = { ...form, id: uuidv4() }
    setNotes([...notes, newNote])
    setForm({
      patientId: '',
      notes: '',
      vitals: { bp: '', hr: 0 },
      labs: [],
      medications: [],
      diagnoses: [],
      procedures: []
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Patient ID" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} />
      <textarea placeholder="Clinical Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <input placeholder="BP" value={form.vitals.bp} onChange={(e) => setForm({ ...form, vitals: { ...form.vitals, bp: e.target.value } })} />
      <input type="number" placeholder="HR" value={form.vitals.hr} onChange={(e) => setForm({ ...form, vitals: { ...form.vitals, hr: Number(e.target.value) } })} />
      <button type="submit">Add Clinical Note</button>
    </form>
  )
}