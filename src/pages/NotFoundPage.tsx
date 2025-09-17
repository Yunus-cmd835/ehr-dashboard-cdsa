'use client';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/" passHref>
        <div className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
          Go back to Dashboard
        </div>
      </Link>
    </div>
  );
}