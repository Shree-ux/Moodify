'use client'

import { useState, useRef } from 'react'

interface Track {
  id: string
  name: string
  artist: string
  album: string
  duration: string
  audioUrl: string
}

interface Playlist {
  id: string
  name: string
  description: string
  image: string
  tracks: Track[]
}

// Sample playlists with working audio URLs
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    description: 'Relaxing ambient sounds',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center',
    tracks: [
      {
        id: '1',
        name: 'Peaceful Morning',
        artist: 'Ambient Sounds',
        album: 'Nature Collection',
        duration: '3:45',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '2',
        name: 'Ocean Waves',
        artist: 'Nature Sounds',
        album: 'Ocean Collection',
        duration: '4:20',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '3',
        name: 'Forest Birds',
        artist: 'Wildlife Audio',
        album: 'Forest Collection',
        duration: '3:15',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ]
  },
  {
    id: '2',
    name: 'Focus Flow',
    description: 'Deep work and concentration',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop&crop=center',
    tracks: [
      {
        id: '4',
        name: 'Deep Focus',
        artist: 'Concentration Music',
        album: 'Productivity',
        duration: '5:30',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '5',
        name: 'Study Session',
        artist: 'Academic Sounds',
        album: 'Learning',
        duration: '4:15',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '6',
        name: 'Creative Flow',
        artist: 'Inspiration Music',
        album: 'Creativity',
        duration: '6:00',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ]
  }
]

export default function MiniSpotifyPlayer({ onClose }: { onClose: () => void }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
    setCurrentTrack(null)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const playTrack = async (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Same track, pause it
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    } else {
      // New track or resume current
      setCurrentTrack(track)
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl
        try {
          await audioRef.current.play()
        } catch (error) {
          console.error('Error playing audio:', error)
          // Fallback: try to play with user interaction
          setIsPlaying(false)
        }
      }
    }
  }

  const togglePlayPause = async () => {
    if (!currentTrack) return
    
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    } else {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Error playing audio:', error)
        }
      }
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-gray-900 rounded-xl border border-gray-700 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Mini Player</h2>
              <p className="text-gray-400 text-xs">Click tracks to play</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!selectedPlaylist ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white mb-3">Playlists</h3>
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistSelect(playlist)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
              >
                <img 
                  src={playlist.image} 
                  alt={playlist.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{playlist.name}</h4>
                  <p className="text-xs text-gray-400">{playlist.description}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => setSelectedPlaylist(null)}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm mb-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            
            <div className="text-center mb-3">
              <img 
                src={selectedPlaylist.image} 
                alt={selectedPlaylist.name}
                className="w-20 h-20 rounded-lg mx-auto mb-2 object-cover"
              />
              <h3 className="text-lg font-bold text-white mb-1">{selectedPlaylist.name}</h3>
              <p className="text-xs text-gray-400">{selectedPlaylist.description}</p>
            </div>

            {/* Mini Player */}
            {currentTrack && (
              <div className="bg-gray-800 rounded-lg p-3 mb-3">
                <div className="text-center mb-2">
                  <h4 className="font-medium text-white text-xs">{currentTrack.name}</h4>
                  <p className="text-xs text-gray-400">{currentTrack.artist}</p>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Play/Pause Button */}
                <div className="flex justify-center">
                  <button
                    onClick={togglePlayPause}
                    className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Track List */}
            <div className="max-h-32 overflow-y-auto">
              <div className="space-y-1">
                {selectedPlaylist.tracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`w-full flex items-center gap-2 p-1.5 rounded text-xs transition-colors ${
                      currentTrack?.id === track.id
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium truncate text-xs">{track.name}</div>
                      <div className="text-xs text-gray-400 truncate">{track.artist}</div>
                    </div>
                    <div className="text-xs text-gray-500 flex-shrink-0">
                      {track.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={handleTimeUpdate}
          onError={(e) => {
            console.error('Audio error:', e)
            setIsPlaying(false)
          }}
        />
      </div>
    </div>
  )
}
