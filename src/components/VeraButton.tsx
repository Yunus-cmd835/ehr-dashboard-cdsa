export default function VeraButton({ label, variant = 'primary', onClick }) {
  const base = 'px-4 py-2 rounded-xl font-semibold shadow-md hover:scale-[1.03] transition-all duration-200'
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
    ghost: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
  }

  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {label}
    </button>
  )
}