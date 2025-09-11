'use client'

import { useRef, useState, useEffect } from 'react'

export interface UseVideoPlayerProps {
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

export interface UseVideoPlayerReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>
  isPlaying: boolean
  isMuted: boolean
  progress: number
  duration: number
  currentTime: number
  isLoading: boolean
  togglePlay: () => void
  toggleMute: () => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  volume: number
}

export function useVideoPlayer({
  autoPlay = true,
  muted = true,
  loop = true
}: UseVideoPlayerProps = {}): UseVideoPlayerReturn {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [volume, setVolumeState] = useState(0.8)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const current = video.currentTime
      const total = video.duration || 0
      setCurrentTime(current)
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }

    const handleDurationChange = () => {
      setDuration(video.duration || 0)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay was prevented, that's okay
        })
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (loop) {
        video.currentTime = 0
        video.play().catch(() => {
          // Play was prevented, that's okay
        })
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    // Set initial properties
    video.muted = muted
    video.loop = loop
    video.volume = volume

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [autoPlay, muted, loop, volume])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(() => {
        // Play was prevented, that's okay
      })
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const newMutedState = !isMuted
    video.muted = newMutedState
    setIsMuted(newMutedState)
  }

  const seekTo = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = time
  }

  const setVolume = (newVolume: number) => {
    const video = videoRef.current
    if (!video) return

    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    video.volume = clampedVolume
    setVolumeState(clampedVolume)
  }

  return {
    videoRef,
    isPlaying,
    isMuted,
    progress,
    duration,
    currentTime,
    isLoading,
    togglePlay,
    toggleMute,
    seekTo,
    setVolume,
    volume
  }
}