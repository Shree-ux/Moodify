// Spotify API configuration
export const SPOTIFY_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
  REDIRECT_URI: typeof window !== 'undefined' 
    ? `${window.location.origin}/spotify-callback` 
    : 'http://localhost:3001/spotify-callback',
  SCOPES: [
    'user-read-private',
    'user-read-email', 
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-playback-state',
    'user-modify-playback-state'
  ]
}

// Spotify API endpoints
export const SPOTIFY_ENDPOINTS = {
  AUTHORIZE: 'https://accounts.spotify.com/authorize',
  API_BASE: 'https://api.spotify.com/v1',
  ME: '/me',
  PLAYLISTS: '/me/playlists',
  PLAYLIST_TRACKS: (id: string) => `/playlists/${id}/tracks`,
  CURRENT_PLAYBACK: '/me/player',
  PLAY: '/me/player/play',
  PAUSE: '/me/player/pause',
  NEXT: '/me/player/next',
  PREVIOUS: '/me/player/previous'
}

// Helper function to get authorization URL
export function getSpotifyAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'token',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES.join(' '),
    show_dialog: 'false'
  })
  
  return `${SPOTIFY_ENDPOINTS.AUTHORIZE}?${params.toString()}`
}

// Helper function to check if user is authenticated
export function isSpotifyAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('spotify_access_token')
  return !!token
}

// Helper function to get access token
export function getSpotifyAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('spotify_access_token')
}

// Helper function to remove access token (logout)
export function removeSpotifyAccessToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('spotify_access_token')
}

// Helper function to make authenticated API calls
export async function spotifyApiCall(endpoint: string, options: RequestInit = {}) {
  const token = getSpotifyAccessToken()
  if (!token) {
    throw new Error('No Spotify access token found')
  }

  const response = await fetch(`${SPOTIFY_ENDPOINTS.API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      removeSpotifyAccessToken()
      throw new Error('Spotify authentication expired')
    }
    throw new Error(`Spotify API error: ${response.status}`)
  }

  return response.json()
}

// API functions
export const spotifyApi = {
  // Get user profile
  getProfile: () => spotifyApiCall(SPOTIFY_ENDPOINTS.ME),
  
  // Get user playlists
  getPlaylists: (limit = 20, offset = 0) => 
    spotifyApiCall(`${SPOTIFY_ENDPOINTS.PLAYLISTS}?limit=${limit}&offset=${offset}`),
  
  // Get playlist tracks
  getPlaylistTracks: (playlistId: string, limit = 50, offset = 0) =>
    spotifyApiCall(`${SPOTIFY_ENDPOINTS.PLAYLIST_TRACKS(playlistId)}?limit=${limit}&offset=${offset}`),
  
  // Get current playback state
  getCurrentPlayback: () => spotifyApiCall(SPOTIFY_ENDPOINTS.CURRENT_PLAYBACK),
  
  // Play music
  play: (contextUri?: string, uris?: string[]) => {
    const body: any = {}
    if (contextUri) body.context_uri = contextUri
    if (uris) body.uris = uris
    
    return spotifyApiCall(SPOTIFY_ENDPOINTS.PLAY, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  },
  
  // Pause music
  pause: () => spotifyApiCall(SPOTIFY_ENDPOINTS.PAUSE, { method: 'PUT' }),
  
  // Next track
  next: () => spotifyApiCall(SPOTIFY_ENDPOINTS.NEXT, { method: 'POST' }),
  
  // Previous track
  previous: () => spotifyApiCall(SPOTIFY_ENDPOINTS.PREVIOUS, { method: 'POST' })
}

