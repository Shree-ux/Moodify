# Spotify Integration Setup Guide

This guide will help you connect your Spotify account to the Moodify application.

## Prerequisites

- A Spotify account (free or premium)
- Access to the Spotify Developer Dashboard

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: `Moodify` (or any name you prefer)
   - **App description**: `A mood-based wallpaper and music app`
   - **Website**: `http://localhost:3001` (for development)
   - **Redirect URI**: `http://localhost:3001/spotify-callback`
   - **Category**: Choose "Other"
5. Click "Save"

## Step 2: Get Your Client ID

1. After creating the app, you'll see your **Client ID**
2. Copy this Client ID - you'll need it for the next step

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Spotify Client ID:

```bash
# .env.local
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_actual_client_id_here
```

**Important**: Replace `your_actual_client_id_here` with the Client ID you copied from Step 2.

## Step 4: Update Redirect URI for Production

When you deploy your app to production, you'll need to:

1. Go back to the Spotify Developer Dashboard
2. Edit your app
3. Add your production domain to the Redirect URIs:
   - `https://yourdomain.com/spotify-callback`

## Step 5: Test the Integration

1. Restart your development server
2. Click the Spotify button in your app
3. You should see a "Connect to Spotify" screen
4. Click "Connect Spotify Account"
5. You'll be redirected to Spotify to authorize the app
6. After authorization, you'll be redirected back to your app
7. You should now see your actual Spotify playlists!

## Features

Once connected, you can:

- **View your playlists**: See all your Spotify playlists with cover art and track counts
- **Browse playlist tracks**: Click on any playlist to see all tracks with artist and album info
- **Play music**: Click on any track to play it (requires Spotify Premium and active device)
- **Disconnect**: Use the disconnect button to remove your Spotify connection

## Troubleshooting

### "Invalid Client ID" Error
- Make sure your `.env.local` file has the correct Client ID
- Restart your development server after updating environment variables

### "Redirect URI Mismatch" Error
- Ensure the redirect URI in your Spotify app matches exactly: `http://localhost:3001/spotify-callback`
- Check that there are no extra spaces or characters

### "No Playlists Found"
- Make sure you have playlists in your Spotify account
- Check that you granted the necessary permissions during authorization

### Playback Not Working
- Direct playback control requires Spotify Premium
- Make sure you have an active Spotify device (desktop app, mobile app, or web player)
- The app will fallback to opening tracks in Spotify if direct playback fails

## Security Notes

- Never commit your `.env.local` file to version control
- The Client ID is safe to expose publicly (it's designed to be visible in client-side code)
- Access tokens are stored locally and expire automatically
- Users can disconnect their account at any time

## API Scopes Used

The app requests these permissions from your Spotify account:
- `user-read-private`: Read your profile information
- `user-read-email`: Read your email address
- `playlist-read-private`: Read your private playlists
- `playlist-read-collaborative`: Read collaborative playlists
- `user-read-playback-state`: Read your current playback state
- `user-modify-playback-state`: Control playback (play, pause, skip)

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Ensure your Spotify app settings match the setup guide
4. Try disconnecting and reconnecting your Spotify account

