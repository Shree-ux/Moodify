"use client"

import { useEffect, useState } from 'react'

type Profile = { name: string; email: string }

type ProfileButtonProps = {
  renderTrigger?: (open: () => void) => React.ReactNode
}

export default function ProfileButton({ renderTrigger }: ProfileButtonProps) {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' })

  useEffect(() => {
    try {
      const raw = localStorage.getItem('profile')
      if (raw) setProfile(JSON.parse(raw))
    } catch {}
  }, [])

  function save() {
    localStorage.setItem('profile', JSON.stringify(profile))
    setOpen(false)
  }

  return (
    <>
      {renderTrigger ? (
        renderTrigger(() => setOpen(true))
      ) : (
        <button className="rounded-full bg-transparent hover:bg-white/10 border border-white/20 px-3 py-1 text-sm text-white/90 hover:text-white transition-colors" onClick={() => setOpen(true)}>Profile</button>
      )}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="w-full max-w-sm bg-zinc-900 text-white rounded-xl border border-white/10 p-4">
            <h3 className="text-lg mb-3">Profile settings</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-white/80">Name</label>
                <input value={profile.name} onChange={(e)=>setProfile(p=>({...p, name:e.target.value}))} className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-white/80">Email</label>
                <input value={profile.email} onChange={(e)=>setProfile(p=>({...p, email:e.target.value}))} className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 outline-none" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-3 py-2 rounded bg-transparent hover:bg-white/10 text-white/90 hover:text-white border border-white/20 transition-colors" onClick={()=>setOpen(false)}>Cancel</button>
              <button className="px-3 py-2 rounded bg-transparent hover:bg-white/10 text-white/90 hover:text-white border border-white/20 transition-colors" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


