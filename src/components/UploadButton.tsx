'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface UploadButtonProps {
  className?: string
}

export default function UploadButton({ className = '' }: UploadButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    // Simulate file upload action
    console.log('Upload video clicked!')
    // In a real app, this would open a file picker or upload modal
  }

  return (
    <div className={`fixed bottom-24 lg:bottom-8 right-4 z-40 ${className}`}>
      <div className="relative">
        <Button
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true)
            setShowTooltip(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            setShowTooltip(false)
          }}
          className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 transform ${
            isHovered ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
          } border-2 border-white/20`}
        >
          <span className="text-white text-2xl lg:text-3xl font-bold">
            +
          </span>
        </Button>

        {/* Floating Ring Animation */}
        <div className={`absolute inset-0 rounded-full border-2 border-teal-400/50 transition-all duration-500 ${
          isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
        }`}></div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/80 backdrop-blur-md text-white text-sm rounded-lg whitespace-nowrap transition-all duration-200 animate-in slide-in-from-bottom-2">
            Create Video
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/80"></div>
          </div>
        )}

        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping"></div>
      </div>

      {/* Secondary Actions - Show on hover */}
      <div className={`absolute bottom-full right-0 mb-4 space-y-3 transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* Go Live */}
        <Button
          onClick={() => console.log('Go Live clicked!')}
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <span className="text-white text-lg">📺</span>
        </Button>

        {/* Upload from Gallery */}
        <Button
          onClick={() => console.log('Gallery upload clicked!')}
          className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <span className="text-white text-lg">📸</span>
        </Button>

        {/* Templates */}
        <Button
          onClick={() => console.log('Templates clicked!')}
          className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <span className="text-white text-lg">📝</span>
        </Button>
      </div>
    </div>
  )
}