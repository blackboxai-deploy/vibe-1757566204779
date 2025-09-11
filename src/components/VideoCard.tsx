"use client";

import { useState, useRef, useEffect } from "react";
import { Video } from "@/lib/mockData";
import VideoPlayer from "@/components/VideoPlayer";
import VideoControls from "@/components/VideoControls";
import VideoInfo from "@/components/VideoInfo";
import UserProfile from "@/components/UserProfile";
import CommentSection from "@/components/CommentSection";
import ShareModal from "@/components/ShareModal";

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onScroll?: (direction: 'up' | 'down') => void;
}

export default function VideoCard({ video, isActive, onScroll }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play when video becomes active
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, likely due to browser policy
      });
      setIsPlaying(true);
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleComment = () => {
    setShowComments(true);
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDoubleClick = () => {
    handleLike();
  };

  // Touch handlers for mobile swipe
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!onScroll) return;
    
    const deltaY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        onScroll('down');
      } else {
        onScroll('up');
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      {/* Video Player */}
      <VideoPlayer
        video={video}
        videoRef={videoRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPlayPause={togglePlayPause}
      />

      {/* Floating Heart Animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="text-6xl text-red-500 animate-ping">
            ❤️
          </div>
        </div>
      )}

      {/* User Profile (Top Left - Desktop) */}
      <div className="absolute top-4 left-4 z-20 hidden lg:block">
        <UserProfile
          user={video.user}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          size="small"
        />
      </div>

      {/* Video Controls (Right Side) */}
      <div className="absolute right-4 bottom-20 lg:bottom-32 z-20">
        <VideoControls
          video={video}
          isLiked={isLiked}
          isFollowing={isFollowing}
          onLike={handleLike}
          onFollow={handleFollow}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>

      {/* Video Info (Bottom) */}
      <div className="absolute bottom-4 left-4 right-20 lg:right-24 z-20">
        <VideoInfo 
          video={video} 
          isFollowing={isFollowing}
          onFollow={handleFollow}
        />
      </div>

      {/* Play/Pause overlay for desktop */}
      <div 
        className="absolute inset-0 flex items-center justify-center lg:cursor-pointer"
        onClick={togglePlayPause}
      >
        {!isPlaying && (
          <div className="bg-black/30 rounded-full p-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
            </div>
          </div>
        )}
      </div>

      {/* Comments Modal */}
      <CommentSection
        video={video}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />

      {/* Share Modal */}
      <ShareModal
        video={video}
        isOpen={showShare}
        onClose={() => setShowShare(false)}
      />
    </div>
  );
}