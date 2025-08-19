'use client'

import { useEffect, useState } from 'react'

export type BackgroundMode = 'video' | 'image'

export default function BackgroundSwitcher({ onChange }: { onChange: (mode: BackgroundMode, url: string) => void }) {
  const [mode, setMode] = useState<BackgroundMode>('video')
  const [keyword, setKeyword] = useState('nature')

  useEffect(() => {
    if (mode === 'video') {
      onChange('video', '/wallpaper/swiss-alps-moewalls-com.mp4')
    } else {
      onChange('image', `https://source.unsplash.com/1920x1080/?${encodeURIComponent(keyword)}`)
    }
  }, [mode])

  function applyKeyword(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (mode === 'image') {
      onChange('image', `https://source.unsplash.com/1920x1080/?${encodeURIComponent(keyword)}`)
    }
  }

  return (
    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
      <div className="flex gap-1">
        <button className={`px-2 py-1 rounded ${mode==='video'?'bg-white/20':'bg-white/10 hover:bg-white/20'}`} onClick={() => setMode('video')}>Video</button>
        <button className={`px-2 py-1 rounded ${mode==='image'?'bg-white/20':'bg-white/10 hover:bg-white/20'}`} onClick={() => setMode('image')}>Image</button>
      </div>
      <form onSubmit={applyKeyword} className="flex items-center gap-2">
        <input disabled={mode!=='image'} value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="unsplash keyword" className="bg-black/30 border border-white/20 rounded px-2 py-1 outline-none" />
        <button disabled={mode!=='image'} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20" type="submit">Apply</button>
      </form>
    </div>
  )
}


