'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Video } from '@/lib/mockData'

interface ShareModalProps {
  video: Video
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ video, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => handleShare('whatsapp')
    },
    {
      name: 'Instagram',
      icon: '📷',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      action: () => handleShare('instagram')
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => handleShare('twitter')
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => handleShare('facebook')
    },
    {
      name: 'Snapchat',
      icon: '👻',
      color: 'bg-yellow-400 hover:bg-yellow-500',
      action: () => handleShare('snapchat')
    },
    {
      name: 'TikTok',
      icon: '🎵',
      color: 'bg-black hover:bg-gray-800',
      action: () => handleShare('tiktok')
    },
    {
      name: 'Messages',
      icon: '💬',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => handleShare('messages')
    },
    {
      name: 'Email',
      icon: '📧',
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => handleShare('email')
    }
  ]

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}:`, video.title)
    
    const shareUrl = `${window.location.origin}/video/${video.id}`
    const shareText = `Check out this video: ${video.title} by @${video.user.username}`

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
        break
      case 'instagram':
        // Instagram doesn't allow direct sharing, so copy to clipboard
        copyToClipboard()
        break
      default:
        copyToClipboard()
    }
  }

  const copyToClipboard = async () => {
    const shareUrl = `${window.location.origin}/video/${video.id}`
    
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end lg:items-center lg:justify-center">
      {/* Mobile: Bottom sheet, Desktop: Center modal */}
      <div className="w-full lg:w-96 bg-black lg:rounded-lg border-t border-gray-800 lg:border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-white font-semibold text-lg">Share to</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white p-2"
          >
            ✕
          </Button>
        </div>

        {/* Share Options Grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                onClick={option.action}
                className={`flex flex-col items-center p-4 h-auto ${option.color} text-white transition-all duration-200 hover:scale-105`}
              >
                <span className="text-2xl mb-2">{option.icon}</span>
                <span className="text-xs font-medium">{option.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Copy Link</h4>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={`${window.location.origin}/video/${video.id}`}
                readOnly
                className="flex-1 bg-gray-800/50 border-gray-700 text-white text-sm"
              />
              <Button
                onClick={copyToClipboard}
                className={`px-4 transition-all duration-200 ${
                  copied 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-teal-500 hover:bg-teal-600'
                }`}
              >
                {copied ? '✓' : 'Copy'}
              </Button>
            </div>
            {copied && (
              <p className="text-green-400 text-sm">Link copied to clipboard!</p>
            )}
          </div>

          {/* More Options */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                className="flex items-center justify-center space-x-2 p-3 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
              >
                <span>📱</span>
                <span className="text-sm">Send via SMS</span>
              </Button>
              
              <Button
                variant="ghost"
                className="flex items-center justify-center space-x-2 p-3 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
              >
                <span>📋</span>
                <span className="text-sm">Copy Text</span>
              </Button>
              
              <Button
                variant="ghost"
                className="flex items-center justify-center space-x-2 p-3 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
              >
                <span>💾</span>
                <span className="text-sm">Save Video</span>
              </Button>
              
              <Button
                variant="ghost"
                className="flex items-center justify-center space-x-2 p-3 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
              >
                <span>🚫</span>
                <span className="text-sm">Report</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}