'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'teal' | 'white' | 'gray'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'teal', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4'
  }

  const colorClasses = {
    teal: 'border-teal-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Full screen loading component
export function FullScreenLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <LoadingSpinner size="xl" color="teal" />
      <p className="text-white mt-4 text-lg">{message}</p>
    </div>
  )
}

// Video loading placeholder
export function VideoLoadingPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-900 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center space-y-3">
        <LoadingSpinner size="lg" color="teal" />
        <p className="text-white/70 text-sm">Loading video...</p>
      </div>
    </div>
  )
}

// Infinite scroll loading
export function InfiniteScrollLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center space-x-3">
        <LoadingSpinner size="md" color="teal" />
        <span className="text-white/70 text-sm">Loading more videos...</span>
      </div>
    </div>
  )
}