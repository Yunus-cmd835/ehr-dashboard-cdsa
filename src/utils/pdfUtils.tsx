import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportBillingPDF(bills: any[]) {
  const doc = new jsPDF()
  doc.text('Billing Report', 14, 20)

  const rows = bills.map((b) => [
    b.id,
    b.patientId,
    b.insurance,
    `₹${b.balance}`,
    b.status || 'Pending'
  ])

  doc.autoTable({
    head: [['ID', 'Patient ID', 'Insurance', 'Balance', 'Status']],
    body: rows,
    startY: 30
  })

  doc.save('billing_report.pdf')
}