'use client'

import { useEffect, useMemo, useState } from 'react'
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
  const [timeString, setTimeString] = useState(new Date().toLocaleTimeString())
  const [bgMode, setBgMode] = useState<BackgroundMode>('video')
  const [bgUrl, setBgUrl] = useState('/wallpaper/swiss-alps-moewalls-com.mp4')
  const [quoteIndex, setQuoteIndex] = useState(0)
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

  useEffect(() => {
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
        <header className="flex items-center justify-between p-4">
          <div className="text-sm tracking-wider uppercase text-white/80">Moodboard</div>
          <div className="flex items-center gap-3">
            <span className="text-white/90 font-mono text-lg" aria-label="Current time">{timeString}</span>
            <BackgroundSwitcher onChange={(mode, url)=>{ setBgMode(mode); setBgUrl(url) }} />
            <ProfileButton />
          </div>
        </header>

        <section className="flex items-center justify-center">
          <CenterMenu />
        </section>

        <section className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
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
            <span>Unsplash / 4K Wallpapers / YouTube theme placeholders</span>
          </div>
        </footer>
      </div>
    </main>
  )
}


