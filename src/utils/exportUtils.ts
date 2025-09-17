export function exportClinicalCSV(filename: string, records: any[]) {
  const headers = ['Patient ID', 'Diagnoses', 'Medications', 'Notes']
  const csv = [
    headers.join(','),
    ...records.map((r) =>
      [
        r.patientId,
        (r.diagnoses || []).join('; '),
        (r.medications || []).join('; '),
        `"${r.notes?.replace(/"/g, '""') || ''}"`
      ].join(',')
    )
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}