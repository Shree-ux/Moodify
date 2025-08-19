'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import Timer from '@/components/Timer'
import TodoList from '@/components/TodoList'
import YouTubeMoodPlayer from '@/components/YouTubeMoodPlayer'
import CenterMenu from '@/components/CenterMenu'
import BackgroundSwitcher, { type BackgroundMode } from '@/components/BackgroundSwitcher'

// merged states and effects
export default function HomePage() {
  const [timeString, setTimeString] = useState('')
  const [bgMode, setBgMode] = useState<BackgroundMode>('video')
  const [bgUrl, setBgUrl] = useState('/wallpaper/swiss-alps-moewalls-com.mp4')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [showMusic, setShowMusic] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSlideshowEnabled, setIsSlideshowEnabled] = useState(false)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const [themes, setThemes] = useState<any[]>([])

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
    const timestamp = Date.now()
    fetch(`/wallpaper/themes.json?t=${timestamp}`)
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
    const quoteTimer = setInterval(() => setQuoteIndex((i) => (i + 1) % quotes.length), 7000)
    return () => {
      clearInterval(clock)
      clearInterval(quoteTimer)
    }
  }, [quotes.length])

  // Typewriter effect for quote
  useEffect(() => {
    setTyped('')
    const target = quotes[quoteIndex]
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(target.slice(0, i))
      if (i >= target.length) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [quoteIndex, quotes])

  // Stabilize background change
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
            </div>
          </div>
        </header>
      </div>

      {/* center content */}
      <div className="relative z-10 grid place-items-center min-h-screen px-4 text-center">
        <div className="space-y-6">
          <div className="inline-block rounded-xl bg-white/10 border border-white/20 px-6 py-3 backdrop-blur">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[0.25em] uppercase">Moodify</h1>
          </div>
          <div>
            {(() => { const m = timeString.match(/(.*?)(?:\s*)(AM|PM|am|pm)$/); const main = m? m[1] : timeString; const suffix = m? m[2].toLowerCase() : ''; return (
              <div className="font-mono tabular-nums text-6xl md:text-8xl lg:text-9xl drop-shadow-sm">
                {main}
                {suffix && <span className="ml-3 text-2xl align-baseline">{suffix}</span>}
              </div>
            )})()}
          </div>
          <p className="mx-auto max-w-2xl text-white/90 text-lg md:text-2xl min-h-[1.5em]">{typed}</p>
        </div>
      </div>

      {/* bottom-centered menu */}
      <footer className="fixed inset-x-0 bottom-6 grid place-items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <CenterMenu onMusic={() => setShowMusic(true)} />
        </div>
      </footer>

      {/* optional lists or widgets */}
      <aside className="fixed left-6 bottom-28 hidden md:block z-10">
        <TodoList />
      </aside>

      {/* music player is hidden until requested */}
      {showMusic && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-4" onClick={() => setShowMusic(false)}>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <YouTubeMoodPlayer />
            <div className="mt-3 flex justify-end">
              <button className="px-3 py-2 rounded bg-white/10 hover:bg-white/20" onClick={() => setShowMusic(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-2 inset-x-0 flex items-center justify-center text-xs text-white/70 z-10">
        <span>Unsplash / 4K Wallpapers / YouTube theme placeholders</span>
      </div>
    </main>
  )
}
