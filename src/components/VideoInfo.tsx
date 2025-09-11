'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Video } from '@/lib/mockData'

interface VideoInfoProps {
  video: Video
  isFollowing: boolean
  onFollow: () => void
}

export default function VideoInfo({ video, isFollowing, onFollow }: VideoInfoProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
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
    <div className="space-y-3">
      {/* Username and Follow Button */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-white font-semibold text-lg">
            @{video.user.username}
          </span>
          {video.user.isVerified && (
            <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        
        {!isFollowing && (
          <Button
            onClick={onFollow}
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium border border-teal-400 transition-all duration-200"
          >
            Follow
          </Button>
        )}
      </div>

      {/* Video Title */}
      {video.title && (
        <h3 className="text-white font-medium text-base leading-tight">
          {video.title}
        </h3>
      )}

      {/* Description */}
      <div className="space-y-1">
        <p className="text-white/90 text-sm leading-relaxed">
          {showFullDescription 
            ? video.description 
            : truncateText(video.description, 100)
          }
          {video.description.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-2 text-white/70 hover:text-white transition-colors"
            >
              {showFullDescription ? 'Show less' : 'more'}
            </button>
          )}
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {video.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="text-teal-400 text-sm font-medium cursor-pointer hover:text-teal-300 transition-colors"
            >
              #{hashtag}
            </span>
          ))}
        </div>
      </div>

      {/* Music Info */}
      {video.music && (
        <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-2 max-w-fit">
          <div className="w-4 h-4 rounded-full bg-teal-500 animate-pulse"></div>
          <span className="text-white/80 text-xs">
            🎵 {video.music.title} - {video.music.artist}
          </span>
        </div>
      )}

      {/* Video Stats */}
      <div className="flex items-center space-x-4 text-white/60 text-xs">
        <span>{formatNumber(video.views)} views</span>
        <span>•</span>
        <span>{video.timestamp}</span>
      </div>
    </div>
  )
}