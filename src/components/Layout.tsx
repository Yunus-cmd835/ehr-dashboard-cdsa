import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4">
          <h2 className="text-xl font-bold mb-6">🩺 EHR Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <Link href="/appointments">📅 Appointments</Link>
            <Link href="/clinical">🧠 Clinical Notes</Link>
            <Link href="/billing">💳 Billing</Link>
            <Link href="/analytics">📊 Analytics</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Welcome Benny 👋</h1>
            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Toggle {dark ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  )
}