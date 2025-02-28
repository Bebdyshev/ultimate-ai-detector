'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="border p-4">
      <div className="text-red-700 font-medium">Error: {error.message}</div>
      <div className="flex items-center mt-2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-red-800 hover:text-red-900"
        >
          Please try again. If you encounter the same error, contact us.
        </a>
      </div>
    </div>
  )
}
