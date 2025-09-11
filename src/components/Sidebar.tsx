'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const [activeTab, setActiveTab] = useState('foryou')

  const menuItems = [
    {
      id: 'foryou',
      label: 'For You',
      icon: '🏠',
      active: true
    },
    {
      id: 'following',
      label: 'Following',
      icon: '👥',
      active: false
    },
    {
      id: 'live',
      label: 'LIVE',
      icon: '🔴',
      active: false
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: '🔍',
      active: false
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      active: false
    }
  ]

  const discoverItems = [
    { label: 'Trending', icon: '🔥' },
    { label: 'Music', icon: '🎵' },
    { label: 'Gaming', icon: '🎮' },
    { label: 'Food', icon: '🍕' },
    { label: 'Travel', icon: '✈️' },
    { label: 'Fitness', icon: '💪' },
    { label: 'Art', icon: '🎨' },
    { label: 'Comedy', icon: '😂' }
  ]

  const followingUsers = [
    {
      id: '1',
      username: 'sarah_creates',
      displayName: 'Sarah Creates',
      avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a37ee209-e8dd-49af-953f-bd16b29dddb1.png',
      isLive: false
    },
    {
      id: '2',
      username: 'mike_travels',
      displayName: 'Mike Chen',
      avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6a4bc6f-ce17-4f7b-acf8-3f19367204f0.png',
      isLive: true
    },
    {
      id: '3',
      username: 'chef_anna',
      displayName: 'Chef Anna',
      avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4fd7228f-6e59-432c-b67e-c53cde549020.png',
      isLive: false
    }
  ]

  return (
    <div className={`w-64 h-full bg-black border-r border-gray-800 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-white font-bold text-xl">TikTok</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={`w-full justify-start p-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'text-white/70 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Discover Section */}
        <div className="px-4 py-2">
          <h3 className="text-white/60 text-sm font-medium mb-3 px-3">Discover</h3>
          <div className="space-y-1">
            {discoverItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg text-white/70 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <span className="text-base mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Following Section */}
        <div className="px-4 py-2">
          <h3 className="text-white/60 text-sm font-medium mb-3 px-3">Following</h3>
          <div className="space-y-2">
            {followingUsers.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                className="w-full justify-start p-3 rounded-lg text-white/70 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <div className="relative mr-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.avatar} alt={user.displayName} />
                    <AvatarFallback className="bg-teal-500 text-white text-xs">
                      {user.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {user.isLive && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm">{user.displayName}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start p-3 rounded-lg text-white/70 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
        >
          <Avatar className="w-8 h-8 mr-3">
            <AvatarImage src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1d06d646-e15c-4ac0-8ea8-1a0b11e994c1.png" alt="Profile" />
            <AvatarFallback className="bg-teal-500 text-white">
              YU
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium">Your Account</div>
            <div className="text-xs text-white/50">@yourusername</div>
          </div>
        </Button>
      </div>
    </div>
  )
}