'use client'

import { useEffect, useRef, useState } from 'react'

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  useEffect(() => {
    if (secondsLeft === 0 && running) setRunning(false)
  }, [secondsLeft, running])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-2">
      <span className="font-mono tabular-nums text-2xl">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20" onClick={() => setRunning((v) => !v)}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20" onClick={() => { setRunning(false); setSecondsLeft(25*60) }}>
          Reset
        </button>
      </div>
    </div>
  )
}


