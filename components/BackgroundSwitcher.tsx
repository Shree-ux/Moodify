'use client'

import { useEffect, useState } from 'react'

export type BackgroundMode = 'video' | 'image'

interface Theme {
  key: string
  label: string
  type: 'video' | 'image'
  url: string
  category: string
}

interface ThemesData {
  defaultKey: string
  themes: Theme[]
}

export default function BackgroundSwitcher({ onChange }: { onChange: (mode: BackgroundMode, url: string) => void }) {
  const [mode, setMode] = useState<BackgroundMode>('video')
  const [keyword, setKeyword] = useState('nature')
  const [themes, setThemes] = useState<ThemesData | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>('autumn')

  useEffect(() => {
    // Load themes from themes.json
    fetch('/wallpaper/themes.json')
      .then(res => res.json())
      .then((data: ThemesData) => {
        setThemes(data)
        setSelectedTheme(data.defaultKey)
        // Set initial background
        const defaultTheme = data.themes.find(t => t.key === data.defaultKey)
        if (defaultTheme) {
          onChange(defaultTheme.type as BackgroundMode, defaultTheme.url)
        }
      })
      .catch(err => {
        console.error('Failed to load themes:', err)
        // Fallback to hardcoded theme
        onChange('video', '/wallpaper/autumn-fuji-moewalls-com.mp4')
      })
  }, [])

  useEffect(() => {
    if (themes && selectedTheme) {
      const theme = themes.themes.find(t => t.key === selectedTheme)
      if (theme) {
        setMode(theme.type as BackgroundMode)
        onChange(theme.type as BackgroundMode, theme.url)
      }
    }
  }, [selectedTheme, themes])

  function applyKeyword(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (mode === 'image') {
      onChange('image', `https://source.unsplash.com/1920x1080/?${encodeURIComponent(keyword)}`)
    }
  }

  if (!themes) {
    return <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
      <div className="text-sm text-white/70">Loading themes...</div>
    </div>
  }

  return (
    <div className="flex flex-col gap-3 bg-white/10 border border-white/10 rounded-xl p-3">
      {/* Theme selector */}
      <div className="flex flex-wrap gap-2">
        {themes.themes.map((theme) => (
          <button
            key={theme.key}
            className={`px-3 py-2 rounded text-sm ${
              selectedTheme === theme.key 
                ? 'bg-white/20 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
            onClick={() => setSelectedTheme(theme.key)}
          >
            {theme.label}
          </button>
        ))}
      </div>
      
      {/* Mode toggle and custom image */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <button 
            className={`px-2 py-1 rounded text-sm ${mode==='video'?'bg-white/20':'bg-white/10 hover:bg-white/20'}`} 
            onClick={() => setMode('video')}
          >
            Video
          </button>
          <button 
            className={`px-2 py-1 rounded text-sm ${mode==='image'?'bg-white/20':'bg-white/10 hover:bg-white/20'}`} 
            onClick={() => setMode('image')}
          >
            Image
          </button>
        </div>
        <form onSubmit={applyKeyword} className="flex items-center gap-2">
          <input 
            disabled={mode!=='image'} 
            value={keyword} 
            onChange={(e)=>setKeyword(e.target.value)} 
            placeholder="unsplash keyword" 
            className="bg-black/30 border border-white/20 rounded px-2 py-1 outline-none text-sm w-32" 
          />
          <button 
            disabled={mode!=='image'} 
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-sm" 
            type="submit"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  )
}


