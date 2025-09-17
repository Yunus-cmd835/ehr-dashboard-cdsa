import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportClinicalPDF(records: any[]) {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text('Clinical Records Report', 14, 20)

  const tableData = records.map((r) => [
    r.patientId,
    (r.diagnoses || []).join(', '),
    (r.medications || []).join(', '),
    r.notes?.replace(/(<([^>]+)>)/gi, '') || '—'
  ])

  doc.autoTable({
    startY: 30,
    head: [['Patient ID', 'Diagnoses', 'Medications', 'Notes']],
    body: tableData,
    styles: { fontSize: 10, cellPadding: 2 }
  })

  doc.save('clinical_records.pdf')
}