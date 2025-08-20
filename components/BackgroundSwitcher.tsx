'use client'

import { useEffect, useState } from 'react'

export type BackgroundMode = 'video' | 'image'

export default function BackgroundSwitcher({ onChange }: { onChange: (mode: BackgroundMode, url: string) => void }) {
  const [mode, setMode] = useState<BackgroundMode>('video')
  const [keyword, setKeyword] = useState('nature')

  useEffect(() => {
    if (mode === 'video') {
      // Default to autumn-fuji since swiss-alps doesn't exist
      onChange('video', '/wallpaper/autumn-fuji-moewalls-com.mp4')
    } else {
      onChange('image', `https://source.unsplash.com/1920x1080/?${encodeURIComponent(keyword)}`)
    }
  }, [mode, onChange])

  function applyKeyword(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (mode === 'image') {
      onChange('image', `https://source.unsplash.com/1920x1080/?${encodeURIComponent(keyword)}`)
    }
  }

  return (
    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
      <div className="flex gap-1">
        <button className={`px-2 py-1 rounded text-white/90 hover:text-white transition-colors border border-white/20 ${mode==='video'?'bg-white/10':'bg-transparent hover:bg-white/10'}`} onClick={() => setMode('video')}>Video</button>
        <button className={`px-2 py-1 rounded text-white/90 hover:text-white transition-colors border border-white/20 ${mode==='image'?'bg-white/10':'bg-transparent hover:bg-white/10'}`} onClick={() => setMode('image')}>Image</button>
      </div>
      <form onSubmit={applyKeyword} className="flex items-center gap-2">
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword for Unsplash"
          className="px-2 py-1 rounded bg-transparent border border-white/20 text-white/90 placeholder-white/50 focus:outline-none focus:border-white/40"
        />
        <button disabled={mode!=='image'} className="px-2 py-1 rounded bg-transparent hover:bg-white/10 text-white/90 hover:text-white border border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="submit">Apply</button>
      </form>
    </div>
  )
}


