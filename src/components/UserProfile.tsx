"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/mockData";

interface UserProfileProps {
  user: User;
  isFollowing: boolean;
  onFollow: () => void;
  size?: "small" | "medium" | "large";
  showStats?: boolean;
  className?: string;
}

export default function UserProfile({
  user,
  isFollowing,
  onFollow,
  size = "medium",
  showStats = false,
  className = "",
}: UserProfileProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const buttonSizes = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-base px-4 py-2",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Avatar with verification badge */}
      <div className="relative">
        <Avatar className={`${sizeClasses[size]} border-2 border-white/20 ring-2 ring-teal-500/30`}>
          <AvatarImage src={user.avatar} alt={user.displayName} />
          <AvatarFallback className="bg-teal-500 text-white font-bold">
            {user.displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Verification Badge */}
        {user.isVerified && (
          <div className={`absolute -bottom-1 -right-1 ${
            size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-5 h-5' : 'w-6 h-6'
          } bg-teal-500 rounded-full flex items-center justify-center border-2 border-black`}>
            <svg className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} text-white`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className={`${textSizes[size]} font-semibold text-white truncate`}>
            {user.displayName}
          </h4>
        </div>
        
        <p className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-gray-400 truncate`}>
          @{user.username}
        </p>

        {/* User Stats */}
        {showStats && (
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1">
              <span className={`${size === 'small' ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                {formatNumber(user.followers)}
              </span>
              <span className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-gray-400`}>
                followers
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`${size === 'small' ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                {formatNumber(user.likes)}
              </span>
              <span className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-gray-400`}>
                likes
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Follow/Following Button */}
      {!isFollowing ? (
        <Button
          onClick={onFollow}
          size={size === 'small' ? 'sm' : 'default'}
          className={`${buttonSizes[size]} bg-teal-500 hover:bg-teal-600 text-white border border-teal-400 rounded-full font-medium transition-all duration-200 hover:scale-105`}
        >
          Follow
        </Button>
      ) : (
        <Button
          onClick={onFollow}
          variant="outline"
          size={size === 'small' ? 'sm' : 'default'}
          className={`${buttonSizes[size]} border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-full font-medium transition-all duration-200`}
        >
          Following
        </Button>
      )}
    </div>
  );
}