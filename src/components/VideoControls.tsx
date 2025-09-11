'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Video } from '@/lib/mockData'

interface VideoControlsProps {
  video: Video
  isLiked: boolean
  isFollowing: boolean
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onFollow: () => void
}

export default function VideoControls({
  video,
  isLiked,
  isFollowing,
  onLike,
  onComment,
  onShare,
  onFollow
}: VideoControlsProps) {
  const [showLikeAnimation, setShowLikeAnimation] = useState(false)

  const handleLike = () => {
    onLike()
    setShowLikeAnimation(true)
    setTimeout(() => setShowLikeAnimation(false), 600)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* User Avatar */}
      <div className="relative">
        <Avatar className="w-12 h-12 border-2 border-white ring-2 ring-teal-500">
          <AvatarImage src={video.user.avatar} alt={video.user.displayName} />
          <AvatarFallback className="bg-teal-500 text-white">
            {video.user.displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Follow Button */}
        {!isFollowing && (
          <Button
            onClick={onFollow}
            size="sm"
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-teal-500 hover:bg-teal-600 border-2 border-white p-0 text-xs font-bold"
          >
            +
          </Button>
        )}
      </div>

      {/* Like Button */}
      <div className="flex flex-col items-center">
        <Button
          onClick={handleLike}
          variant="ghost"
          size="sm"
          className={`p-3 rounded-full transition-all duration-200 ${
            isLiked 
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
              : 'bg-black/40 text-white hover:bg-white/20'
          } ${showLikeAnimation ? 'scale-125' : 'scale-100'}`}
        >
          <div className="relative">
            <span className={`text-2xl transition-all duration-200 ${
              isLiked ? 'animate-pulse' : ''
            }`}>
              {isLiked ? '❤️' : '🤍'}
            </span>
          </div>
        </Button>
        <span className="text-white text-xs font-medium mt-1">
          {formatNumber(video.likes + (isLiked ? 1 : 0))}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center">
        <Button
          onClick={onComment}
          variant="ghost"
          size="sm"
          className="p-3 rounded-full bg-black/40 text-white hover:bg-white/20 transition-all duration-200"
        >
          <span className="text-2xl">💬</span>
        </Button>
        <span className="text-white text-xs font-medium mt-1">
          {formatNumber(video.comments)}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center">
        <Button
          onClick={onShare}
          variant="ghost"
          size="sm"
          className="p-3 rounded-full bg-black/40 text-white hover:bg-white/20 transition-all duration-200"
        >
          <span className="text-2xl">➤</span>
        </Button>
        <span className="text-white text-xs font-medium mt-1">
          {formatNumber(video.shares)}
        </span>
      </div>

      {/* More Options */}
      <Button
        variant="ghost"
        size="sm"
        className="p-3 rounded-full bg-black/40 text-white hover:bg-white/20 transition-all duration-200"
      >
        <span className="text-xl">⋯</span>
      </Button>

      {/* Rotating Music Disc */}
      <div className="relative mt-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 animate-spin-slow flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
      </div>
    </div>
  )
}