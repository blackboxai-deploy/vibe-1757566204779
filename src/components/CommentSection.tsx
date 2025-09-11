'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Video, mockComments } from '@/lib/mockData'

interface CommentSectionProps {
  video: Video
  isOpen: boolean
  onClose: () => void
}

export default function CommentSection({ video, isOpen, onClose }: CommentSectionProps) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(mockComments[video.id] || [])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment = {
      id: `temp_${Date.now()}`,
      user: {
        id: 'current_user',
        username: 'yourusername',
        displayName: 'Your Name',
        avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8658b19e-ce8e-4034-9664-c432e080b4d8.png',
        followers: 0,
        following: 0,
        likes: 0,
        bio: '',
        isVerified: false,
        isFollowing: false
      },
      text: comment,
      timestamp: 'now',
      likes: 0
    }

    setComments(prev => [newComment, ...prev])
    setComment('')
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end lg:items-center lg:justify-center">
      {/* Mobile: Bottom sheet */}
      <div className="w-full lg:w-96 bg-black lg:rounded-lg lg:max-h-[80vh] h-[70vh] lg:h-auto flex flex-col border-t border-gray-800 lg:border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-white font-semibold text-lg">
            {formatNumber(video.comments)} comments
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white p-2"
          >
            ✕
          </Button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/60">No comments yet</p>
              <p className="text-white/40 text-sm mt-1">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.displayName} />
                  <AvatarFallback className="bg-teal-500 text-white text-xs">
                    {comment.user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-white/90 font-medium text-sm">
                      {comment.user.username}
                    </span>
                    {comment.user.isVerified && (
                      <div className="w-3 h-3 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                    <span className="text-white/50 text-xs">{comment.timestamp}</span>
                  </div>
                  
                  <p className="text-white/90 text-sm mt-1 break-words">
                    {comment.text}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white p-0 h-auto text-xs"
                    >
                      ❤️ {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white p-0 h-auto text-xs"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-800">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/24507072-d489-48d2-b0cc-fadce0f0120c.png" alt="Your profile" />
              <AvatarFallback className="bg-teal-500 text-white text-xs">
                YU
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 flex items-center space-x-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500"
              />
              
              <Button
                type="submit"
                disabled={!comment.trim()}
                className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed px-4"
              >
                Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}