'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface BottomNavigationProps {
  className?: string
}

export default function BottomNavigation({ className = '' }: BottomNavigationProps) {
  const [activeTab, setActiveTab] = useState('home')

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      activeIcon: '🏠'
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: '🔍',
      activeIcon: '🔍'
    },
    {
      id: 'create',
      label: 'Create',
      icon: '➕',
      activeIcon: '➕',
      special: true
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: '💬',
      activeIcon: '💬',
      hasNotification: true
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      activeIcon: '👤',
      isProfile: true
    }
  ]

  return (
    <div className={`bg-black border-t border-gray-800 ${className}`}>
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id
          
          if (item.special) {
            // Special Create Button
            return (
              <Button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative w-12 h-8 bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105"
              >
                <span className="text-white text-lg font-bold">+</span>
              </Button>
            )
          }

          if (item.isProfile) {
            // Profile Avatar
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              >
                <div className={`relative ${
                  isActive ? 'ring-2 ring-teal-500 rounded-full' : ''
                }`}>
                  <Avatar className="w-6 h-6">
                    <AvatarImage 
                      src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/45dbe22e-8428-4776-a08a-2a0b4b7b566d.png" 
                      alt="Profile" 
                    />
                    <AvatarFallback className="bg-teal-500 text-white text-xs">
                      YU
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className={`text-xs transition-colors duration-200 ${
                  isActive ? 'text-teal-400 font-medium' : 'text-white/60'
                }`}>
                  {item.label}
                </span>
              </Button>
            )
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 relative"
            >
              <div className="relative">
                <span className={`text-xl transition-all duration-200 ${
                  isActive ? 'text-teal-400 transform scale-110' : 'text-white/70'
                }`}>
                  {isActive ? item.activeIcon : item.icon}
                </span>
                
                {/* Notification Badge */}
                {item.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                )}
              </div>
              
              <span className={`text-xs transition-colors duration-200 ${
                isActive ? 'text-teal-400 font-medium' : 'text-white/60'
              }`}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}