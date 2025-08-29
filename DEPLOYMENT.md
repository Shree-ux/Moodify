# Moodify Deployment Guide

## Overview
This guide will help you deploy your Moodify app to Vercel and set up AWS S3 for hosting the wallpaper videos.

## Why AWS S3 for Videos?
- Your wallpaper videos are large (21MB - 163MB each)
- They're currently in `.gitignore` and won't be uploaded to GitHub
- Vercel builds from GitHub, so local files won't be available in production
- AWS S3 + CloudFront provides cost-effective video hosting

## Step 1: Prepare for GitHub Push

### 1.1 Remove Local Video Files
```bash
# Remove the wallpaper files from your local directory
rm -rf public/wallpaper/*.mp4
rm -rf public/wallpaper/*.DS_Store

# Keep the .keep file and themes.json
```

### 1.2 Commit and Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment: remove local videos, add S3 config"
git push origin main
```

## Step 2: Set Up AWS S3

### 2.1 Create S3 Bucket
1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click "Create bucket"
3. Choose a unique bucket name (e.g., `moodify-wallpapers-2024`)
4. Select your preferred region
5. Keep default settings for now

### 2.2 Configure Bucket for Public Access
1. Select your bucket
2. Go to "Permissions" tab
3. Click "Edit" under "Block public access"
4. Uncheck all boxes and save
5. Add this bucket policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

### 2.3 Upload Videos
1. Create folders: `wallpapers/` and `thumbnails/`
2. Upload your MP4 files to `wallpapers/`
3. Create thumbnail images (JPG/PNG) for each video and upload to `thumbnails/`

### 2.4 Get Video URLs
After uploading, get the public URLs:
- Format: `https://YOUR-BUCKET-NAME.s3.REGION.amazonaws.com/wallpapers/FILENAME.mp4`
- Example: `https://moodify-wallpapers-2024.s3.us-east-1.amazonaws.com/wallpapers/autumn-fuji-moewalls-com.mp4`

## Step 3: Update Video Configuration

### 3.1 Edit `lib/videoConfig.ts`
Replace the placeholder URLs with your actual S3 URLs:

```typescript
export const videoThemes: VideoTheme[] = [
  {
    key: "autumn-fuji",
    label: "Autumn Fuji",
    url: "https://YOUR-BUCKET-NAME.s3.REGION.amazonaws.com/wallpapers/autumn-fuji-moewalls-com.mp4",
    thumbnail: "https://YOUR-BUCKET-NAME.s3.REGION.amazonaws.com/thumbnails/autumn-fuji-thumb.jpg"
  },
  // ... update all other entries
]
```

### 3.2 Commit and Push Changes
```bash
git add .
git commit -m "Update video URLs with S3 links"
git push origin main
```

## Step 4: Deploy to Vercel

### 4.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository

### 4.2 Configure Build Settings
- Framework Preset: Next.js
- Root Directory: `./` (default)
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)

### 4.3 Environment Variables (if needed)
Add any environment variables your app needs:
- `MONGODB_URI` (if using MongoDB)

### 4.4 Deploy
Click "Deploy" and wait for the build to complete.

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Test the wallpaper functionality
3. Verify videos load from S3
4. Check that thumbnails display correctly

## Optional: Set Up CloudFront CDN

For better performance globally:

1. Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Create a distribution
3. Origin: Your S3 bucket
4. Default behavior: Allow all HTTP methods
5. Update your video URLs to use CloudFront domain

## Cost Estimation

### S3 Storage (per month):
- 8 videos × ~100MB average = ~800MB
- Cost: ~$0.02/month

### S3 Data Transfer (per month):
- 1000 video views × 100MB = 100GB
- Cost: ~$9.00/month

### Total estimated cost: ~$9-15/month

## Troubleshooting

### Videos Not Loading
- Check S3 bucket permissions
- Verify URLs are correct
- Check browser console for CORS errors

### Build Failures
- Ensure all imports are correct
- Check TypeScript compilation
- Verify environment variables

### Performance Issues
- Consider video compression
- Use CloudFront CDN
- Implement lazy loading

## Next Steps

1. Monitor your S3 costs
2. Set up CloudWatch alerts
3. Consider video compression for smaller file sizes
4. Implement analytics to track video usage
