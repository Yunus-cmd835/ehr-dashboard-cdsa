interface TimelineItem {
  date: string
  title: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    date: '2023-01-10',
    title: 'Diagnosis: Hypertension',
    description: 'Prescribed lifestyle changes and medication.'
  },
  {
    date: '2023-03-22',
    title: 'Follow-up Visit',
    description: 'Blood pressure improved. Continued medication.'
  },
  {
    date: '2023-06-05',
    title: 'Diagnosis: Migraine',
    description: 'Prescribed pain management and neurology referral.'
  },
  {
    date: '2023-09-18',
    title: 'Lab Results',
    description: 'Cholesterol levels slightly elevated.'
  }
]

export default function ClinicalTimeline() {
  return (
    <div className="bg-card border-card p-6 rounded-xl shadow-lg">
      <h2 className="text-heading text-xl font-bold mb-4">🧠 Clinical Timeline</h2>
      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6">
            <div className="absolute left-0 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <p className="text-muted text-sm">{item.date}</p>
            <h3 className="text-heading font-semibold">{item.title}</h3>
            <p className="text-subtle text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
