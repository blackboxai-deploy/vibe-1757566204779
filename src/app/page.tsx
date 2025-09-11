'use client'

import { useState, useEffect } from 'react'
import VideoCard from '@/components/VideoCard'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import BottomNavigation from '@/components/BottomNavigation'
import UploadButton from '@/components/UploadButton'
import { mockVideos } from '@/lib/mockData'

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [videos, setVideos] = useState(mockVideos.slice(0, 5))
  const [loading, setLoading] = useState(false)

  // Infinite scroll simulation
  const loadMoreVideos = () => {
    if (loading) return
    setLoading(true)
    
    setTimeout(() => {
      const newVideos = mockVideos.slice(videos.length, videos.length + 3)
      setVideos(prev => [...prev, ...newVideos])
      setLoading(false)
    }, 1000)
  }

  // Handle scroll to load more videos
  useEffect(() => {
    if (currentVideoIndex >= videos.length - 2) {
      loadMoreVideos()
    }
  }, [currentVideoIndex])

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1)
    } else if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1)
    }
  }

  return (
    <main className="relative h-full w-full bg-black overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-20">
        <Sidebar />
      </div>
      
      {/* Top Bar */}
      <div className="fixed top-0 left-0 lg:left-64 right-0 z-30">
        <TopBar />
      </div>

      {/* Main Video Feed */}
      <div className="relative h-full lg:ml-64">
        <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              className="snap-start h-screen relative"
            >
              <VideoCard
                video={video}
                isActive={index === currentVideoIndex}
                onScroll={handleScroll}
              />
            </div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <div className="h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <UploadButton />
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
        <BottomNavigation />
      </div>
    </main>
  )
}