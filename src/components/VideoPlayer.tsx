"use client";

import { Video } from "@/lib/mockData";
import { RefObject } from "react";

interface VideoPlayerProps {
  video: Video;
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
}

export default function VideoPlayer({ 
  video, 
  videoRef, 
  isPlaying, 
  isMuted, 
  onPlayPause 
}: VideoPlayerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Video Element - Hidden since we're using placeholder */}
      <video
        ref={videoRef}
        className="hidden"
        loop
        playsInline
        muted={isMuted}
        poster={video.thumbnailUrl}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>

      {/* Placeholder Video Display */}
      <div 
        className="relative w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.7), rgba(20,184,166,0.1)), url('${video.thumbnailUrl}')`
        }}
      >
        {/* Video placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for failed image loading
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Play/Pause Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-teal-500/80 rounded-full p-6 backdrop-blur-sm">
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1"></div>
              </div>
            </div>
          </div>
        )}

        {/* Video Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
          <div 
            className="h-full bg-teal-500 transition-all duration-1000 ease-linear"
            style={{
              width: isPlaying ? '100%' : '0%',
              transitionDuration: isPlaying ? '30s' : '0s' // Simulate 30s video
            }}
          />
        </div>

        {/* Mute/Unmute Indicator */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // onToggleMute(); // This would be handled by parent
            }}
            className="bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Video Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
        
        {/* Teal Accent Border */}
        <div className="absolute inset-0 border-2 border-teal-500/20 pointer-events-none" />
      </div>
    </div>
  );
}