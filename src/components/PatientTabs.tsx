import { useState } from 'react'

export default function PatientTabs({ patient }) {
  const tabs = ['Allergies', 'Conditions', 'Medications', 'Immunizations']
  const [activeTab, setActiveTab] = useState('Allergies')

  const tabData = {
    Allergies: patient.allergies,
    Conditions: patient.conditions,
    Medications: patient.medications,
    Immunizations: patient.immunizations
  }

  return (
    <div className="mt-4">
      {/* Tab Buttons */}
      <div className="flex gap-2 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
        {tabData[activeTab].length > 0 ? (
          <ul className="list-disc pl-5">
            {tabData[activeTab].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No {activeTab.toLowerCase()} recorded.</p>
        )}
      </div>
    </div>
  )
}