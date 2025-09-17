import { useThemeStore } from '../store/useThemeStore'

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore()

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm shadow hover:scale-[1.03] transition"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}