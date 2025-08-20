'use client'

import { useEffect, useMemo, useState } from 'react'
import TodoList from '@/components/TodoList'
import YouTubeMoodPlayer from '@/components/YouTubeMoodPlayer'
import CenterMenu from '@/components/CenterMenu'
import BackgroundSwitcher, { type BackgroundMode } from '@/components/BackgroundSwitcher'

// removed unused menuItems

export default function HomePage() {
  const [timeString, setTimeString] = useState(new Date().toLocaleTimeString())
  const [bgMode, setBgMode] = useState<BackgroundMode>('video')
  const [bgUrl, setBgUrl] = useState('/wallpaper/autumn-fuji-moewalls-com.mp4')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [showMusic, setShowMusic] = useState(false)
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
    const quoteTimer = setInterval(() => setQuoteIndex((i) => (i + 1) % quotes.length), 7000)
    
    return () => {
      clearInterval(clock)
      clearInterval(quoteTimer)
    }
  }, [quotes.length])

  // simple typewriter effect for the current quote
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

  const handleWallpaperChange = (url: string) => {
    console.log('Main page: Wallpaper change requested:', url)
    setBgUrl(url)
    setBgMode('video')
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {bgMode === 'video' && bgUrl ? (
        <video className="video-bg" autoPlay muted loop playsInline src={bgUrl} />
      ) : bgMode === 'image' && bgUrl ? (
        <img className="video-bg object-cover" src={bgUrl} alt="background" />
      ) : null}
      <div className="video-overlay" />

      {/* top title */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-block rounded-xl bg-white/10 border border-white/20 px-6 py-3 backdrop-blur">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.25em] uppercase text-white/90">Moodify</h1>
        </div>
      </div>

      {/* center content */}
      <div className="relative z-10 grid place-items-center min-h-screen px-4 text-center">
        <div className="space-y-6">
          <div>
            {(() => { const m = timeString.match(/(.*?)(?:\s*)(AM|PM|am|pm)$/); const main = m? m[1] : timeString; const suffix = m? m[2].toLowerCase() : ''; return (
              <div className="font-mono tabular-nums text-6xl md:text-8xl lg:text-9xl drop-shadow-sm text-white/90">
                {main}
                {suffix && <span className="ml-3 text-2xl align-baseline text-white/90">{suffix}</span>}
              </div>
            )})()}
          </div>
          <p className="mx-auto max-w-2xl text-white/90 text-lg md:text-2xl min-h-[1.5em]">{typed}</p>
        </div>
      </div>

      {/* bottom-centered menu */}
      <footer className="fixed inset-x-0 bottom-6 grid place-items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <CenterMenu onMusic={() => setShowMusic(true)} onWallpaperChange={handleWallpaperChange} />
        </div>
      </footer>

      {/* optional lists or widgets can live off-center – keeping tasks but without add bar */}
      <aside className="fixed left-6 bottom-28 hidden md:block z-10">
        <TodoList />
      </aside>

      {/* music player is hidden until requested */}
      {showMusic && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-4" onClick={()=>setShowMusic(false)}>
          <div className="w-full max-w-3xl" onClick={(e)=>e.stopPropagation()}>
            <YouTubeMoodPlayer />
            <div className="mt-3 flex justify-end">
              <button className="px-3 py-2 rounded bg-transparent hover:bg-white/10 text-white/90 hover:text-white border border-white/20 transition-colors" onClick={()=>setShowMusic(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-2 inset-x-0 flex items-center justify-center text-xs text-white/70 z-10">
        <span>4K Wallpapers / YouTube theme placeholders</span>
      </div>
    </main>
  )
}


