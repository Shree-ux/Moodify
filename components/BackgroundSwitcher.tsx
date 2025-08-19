'use client'

import { useEffect, useState, useCallback } from 'react'

export type BackgroundMode = 'video' | 'image'

interface Theme {
  key: string
  label: string
  type: BackgroundMode
  url: string
  category: string
}

interface ThemesConfig {
  defaultKey: string
  themes: Theme[]
}

export default function BackgroundSwitcher({ 
  onChange, 
  onSlideshowToggle 
}: { 
  onChange: (mode: BackgroundMode, url: string) => void
  onSlideshowToggle: (enabled: boolean) => void
}) {
  const [themes, setThemes] = useState<ThemesConfig | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null)
  const [isSlideshowEnabled, setIsSlideshowEnabled] = useState(false)

  // Stabilize the onChange function to prevent useEffect from running repeatedly
  const stableOnChange = useCallback(onChange, [onChange])

  useEffect(() => {
    // Load themes from the JSON file
    fetch('/wallpaper/themes.json')
      .then(res => res.json())
      .then((data: ThemesConfig) => {
        setThemes(data)
        setSelectedTheme(data.defaultKey)
        // Apply default theme only once
        const defaultTheme = data.themes.find(t => t.key === data.defaultKey)
        if (defaultTheme) {
          stableOnChange(defaultTheme.type, defaultTheme.url)
        }
      })
      .catch(err => console.error('Failed to load themes:', err))
  }, [stableOnChange])

  const handleThemeChange = (themeKey: string) => {
    const theme = themes?.themes.find(t => t.key === themeKey)
    if (theme) {
      setSelectedTheme(themeKey)
      stableOnChange(theme.type, theme.url)
      setIsOpen(false)
    }
  }

  const handleSlideshowToggle = () => {
    const newState = !isSlideshowEnabled
    setIsSlideshowEnabled(newState)
    onSlideshowToggle(newState)
  }

  const getCurrentTheme = () => {
    return themes?.themes.find(t => t.key === selectedTheme)
  }

  if (!themes) {
    return (
      <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
        <div className="animate-pulse text-white/60">Loading themes...</div>
      </div>
    )
  }

  const currentTheme = getCurrentTheme()

  return (
    <div className="relative">
      <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
        {/* Current Background Preview */}
        <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-white/20">
          {currentTheme?.type === 'video' ? (
            <video 
              src={currentTheme.url} 
              className="w-full h-full object-cover"
              muted 
              loop 
              autoPlay
            />
          ) : (
            <img 
              src={currentTheme?.url} 
              alt={currentTheme?.label}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Slideshow Toggle Switch */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/70 font-medium">Slideshow</span>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-medium transition-colors duration-300 ${
              !isSlideshowEnabled ? 'text-white' : 'text-white/40'
            }`}>OFF</span>
            <button
              onClick={handleSlideshowToggle}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                isSlideshowEnabled 
                  ? 'bg-white/30' 
                  : 'bg-white/10'
              }`}
              title={isSlideshowEnabled ? 'Disable Slideshow' : 'Enable Slideshow'}
            >
              {/* Toggle Thumb */}
              <div 
                className={`absolute top-1 w-4 h-4 bg-white/80 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                  isSlideshowEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                {/* Dots pattern on thumb */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5 w-2.5 h-2.5">
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                  </div>
                </div>
              </div>
            </button>
            <span className={`text-xs font-medium transition-colors duration-300 ${
              isSlideshowEnabled ? 'text-white' : 'text-white/40'
            }`}>ON</span>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
          >
            <span>{currentTheme?.label || 'Select Theme'}</span>
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full mt-1 right-0 bg-black/90 border border-white/20 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto min-w-64">
              {themes.themes.map(theme => (
                <button
                  key={theme.key}
                  onClick={() => handleThemeChange(theme.key)}
                  onMouseEnter={() => setHoveredTheme(theme)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  className={`w-full text-left px-3 py-2 hover:bg-white/20 transition-colors ${
                    selectedTheme === theme.key ? 'bg-white/20 text-white' : 'text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Theme Preview */}
                    <div className="relative w-10 h-6 rounded overflow-hidden border border-white/20 flex-shrink-0">
                      {theme.type === 'video' ? (
                        <video 
                          src={theme.url} 
                          className="w-full h-full object-cover"
                          muted 
                          loop 
                          autoPlay
                        />
                      ) : (
                        <img 
                          src={theme.url} 
                          alt={theme.label}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    
                    <span className="capitalize">{theme.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}



