'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import Timer from '@/components/Timer'
import TodoList from '@/components/TodoList'
import YouTubeMoodPlayer from '@/components/YouTubeMoodPlayer'
import CenterMenu from '@/components/CenterMenu'
import BackgroundSwitcher, { type BackgroundMode } from '@/components/BackgroundSwitcher'
import ProfileButton from '@/components/ProfileButton'

const menuItems = [
  { key: 'home', label: 'Home' },
  { key: 'games', label: 'Games' },
  { key: 'chat', label: 'Chat' },
  { key: 'search', label: 'Search' },
  { key: 'profile', label: 'Profile' },
]

export default function HomePage() {
  const [timeString, setTimeString] = useState('')
  const [bgMode, setBgMode] = useState<BackgroundMode>('video')
  const [bgUrl, setBgUrl] = useState('/wallpaper/swiss-alps-moewalls-com.mp4')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isSlideshowEnabled, setIsSlideshowEnabled] = useState(false)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const [themes, setThemes] = useState<any[]>([])
  
  // Stabilize the onChange function to prevent BackgroundSwitcher from resetting
  const handleBackgroundChange = useCallback((mode: BackgroundMode, url: string) => {
    setBgMode(mode)
    setBgUrl(url)
  }, [])

  // Handle slideshow toggle
  const handleSlideshowToggle = useCallback((enabled: boolean) => {
    setIsSlideshowEnabled(enabled)
    if (enabled) {
      console.log('🎬 Slideshow enabled - backgrounds will cycle automatically')
    } else {
      console.log('⏸️ Slideshow disabled - background stays static')
    }
  }, [])

  const quotes = useMemo(
    () => [
      'Small steps every day.',
      'Focus is a skill. Practice it.',
      'You become what you repeat.',
      'Deep work beats shallow busyness.',
      'Consistency compounds.',
    ],
    []
  )

  // Load themes for slideshow
  useEffect(() => {
    fetch('/wallpaper/themes.json')
      .then(res => res.json())
      .then((data) => {
        setThemes(data.themes)
        setCurrentThemeIndex(data.themes.findIndex((t: any) => t.key === data.defaultKey))
      })
      .catch(err => console.error('Failed to load themes for slideshow:', err))
  }, [])

  // Slideshow effect
  useEffect(() => {
    if (!isSlideshowEnabled || themes.length === 0) return

    const slideshowInterval = setInterval(() => {
      setCurrentThemeIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % themes.length
        const nextTheme = themes[nextIndex]
        
        // Update background
        setBgMode(nextTheme.type)
        setBgUrl(nextTheme.url)
        
        console.log(`🎬 Slideshow: Switched to ${nextTheme.label}`)
        return nextIndex
      })
    }, 8000) // Change every 8 seconds

    return () => clearInterval(slideshowInterval)
  }, [isSlideshowEnabled, themes])

  useEffect(() => {
    // Set mounted state to prevent hydration mismatch
    setIsMounted(true)
    // Set initial time
    setTimeString(new Date().toLocaleTimeString())
    
    const clock = setInterval(() => setTimeString(new Date().toLocaleTimeString()), 1000)
    const quoteTimer = setInterval(
      () => setQuoteIndex((i) => (i + 1) % quotes.length),
      6000
    )
    return () => {
      clearInterval(clock)
      clearInterval(quoteTimer)
    }
  }, [quotes.length])

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {bgMode === 'video' ? (
        <video className="video-bg" autoPlay muted loop playsInline src={bgUrl} />
      ) : (
        <img className="video-bg object-cover" src={bgUrl} alt="background" />
      )}
      <div className="video-overlay" />

      <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto]">
        <header className="p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="text-sm tracking-wider uppercase text-white/80">Moodboard</div>
            <div className="flex items-center gap-3">
              <span className="text-white/90 font-mono text-lg" aria-label="Current time">
                {isMounted ? timeString : ''}
              </span>
              <BackgroundSwitcher 
                onChange={handleBackgroundChange} 
                onSlideshowToggle={handleSlideshowToggle}
              />
              <ProfileButton />
            </div>
          </div>
        </header>

        <section className="flex items-center justify-center px-4">
          <CenterMenu />
        </section>

        <section className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          <Timer />
          <YouTubeMoodPlayer />
          <TodoList />
        </section>

        <footer className="grid place-items-center gap-2 pb-6">
          <div className="h-7 overflow-hidden">
            <p key={quoteIndex} className="px-4 text-center text-white/90 animate-fadeSlide will-change-transform">
              {quotes[quoteIndex]}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>4K Wallpapers / YouTube theme placeholders</span>
          </div>
        </footer>
      </div>
    </main>
  )
}


