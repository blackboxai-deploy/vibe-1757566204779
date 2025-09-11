'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TopBarProps {
  className?: string
}

export default function TopBar({ className = '' }: TopBarProps) {
  const [activeTab, setActiveTab] = useState('foryou')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const tabs = [
    { id: 'foryou', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'live', label: 'LIVE' }
  ]

  return (
    <div className={`bg-black/80 backdrop-blur-md border-b border-gray-800/50 ${className}`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo (Mobile) */}
        <div className="flex items-center lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-white font-bold text-xl">TikTok</span>
          </div>
        </div>

        {/* Center Section - Navigation Tabs */}
        <div className="hidden lg:flex items-center space-x-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-teal-500 bg-transparent hover:bg-transparent rounded-none'
                  : 'text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg'
              }`}
            >
              {tab.label}
              {tab.id === 'live' && (
                <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </Button>
          ))}
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden items-center space-x-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              size="sm"
              className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-teal-400 bg-teal-500/20 border border-teal-500/30 rounded-full'
                  : 'text-white/70 hover:text-white hover:bg-gray-800/50 rounded-full'
              }`}
            >
              {tab.label}
              {tab.id === 'live' && (
                <div className="ml-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </Button>
          ))}
        </div>

        {/* Right Section - Search and Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="hidden md:block relative">
            {showSearch ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(false)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="p-2 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
              >
                <span className="text-xl">🔍</span>
              </Button>
            )}
          </div>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
          >
            <span className="text-lg">🔍</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
          >
            <span className="text-xl">🔔</span>
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </Button>

          {/* Messages */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:block p-2 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
          >
            <span className="text-xl">💬</span>
          </Button>

          {/* More Options */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-white/70 hover:text-white hover:bg-gray-800/50 rounded-lg"
          >
            <span className="text-xl">⋯</span>
          </Button>
        </div>
      </div>
    </div>
  )
}