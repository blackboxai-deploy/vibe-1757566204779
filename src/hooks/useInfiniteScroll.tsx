'use client'

import { useState, useEffect, useRef } from 'react'

export interface UseInfiniteScrollProps<T> {
  items: T[]
  loadMore: () => Promise<T[]> | T[]
  threshold?: number
  hasMore?: boolean
}

export interface UseInfiniteScrollReturn<T> {
  items: T[]
  loading: boolean
  hasMore: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

export function useInfiniteScroll<T>({
  items: initialItems,
  loadMore,
  threshold = 100,
  hasMore: initialHasMore = true
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>(initialItems)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = async () => {
      if (isLoadingRef.current || !hasMore) return

      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < threshold

      if (isNearBottom) {
        isLoadingRef.current = true
        setLoading(true)

        try {
          const newItems = await loadMore()
          
          if (Array.isArray(newItems)) {
            if (newItems.length === 0) {
              setHasMore(false)
            } else {
              setItems(prevItems => [...prevItems, ...newItems])
            }
          }
        } catch (error) {
          console.error('Error loading more items:', error)
        } finally {
          setLoading(false)
          isLoadingRef.current = false
        }
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!container) return
      
      const videoHeight = window.innerHeight
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      const targetIndex = Math.max(0, Math.min(items.length - 1, currentIndex + scrollDirection))
      
      if (targetIndex !== currentIndex) {
        setCurrentIndex(targetIndex)
        container.scrollTo({
          top: targetIndex * videoHeight,
          behavior: 'smooth'
        })
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [hasMore, threshold, loadMore, items.length, currentIndex])

  // Update current index based on scroll position
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScrollUpdate = () => {
      const videoHeight = window.innerHeight
      const scrollTop = container.scrollTop
      const newIndex = Math.round(scrollTop / videoHeight)
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
        setCurrentIndex(newIndex)
      }
    }

    container.addEventListener('scroll', handleScrollUpdate, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScrollUpdate)
    }
  }, [currentIndex, items.length])

  return {
    items,
    loading,
    hasMore,
    containerRef,
    currentIndex,
    setCurrentIndex
  }
}