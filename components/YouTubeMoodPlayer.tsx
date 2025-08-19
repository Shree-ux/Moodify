'use client'

import { useState } from 'react'

const presets = [
  { key: 'lofi', label: 'Lo-Fi', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=0' },
  { key: 'piano', label: 'Piano', url: 'https://www.youtube.com/embed/MN3x-kAbgEU?autoplay=0&mute=0' },
  { key: 'rain', label: 'Rain', url: 'https://www.youtube.com/embed/ScgVQUB7Aj8?autoplay=0&mute=0' },
]

export default function YouTubeMoodPlayer() {
  const [current, setCurrent] = useState(presets[0])
  return (
    <div className="bg-white/10 border border-white/10 rounded-xl p-3 w-full max-w-2xl">
      <div className="flex gap-2 mb-2">
        {presets.map((p) => (
          <button key={p.key} className={`px-3 py-1 rounded ${current.key === p.key ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`} onClick={() => setCurrent(p)}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          className="w-full h-full"
          src={current.url}
          title="YouTube player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}


