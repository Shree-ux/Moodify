#!/bin/bash

echo "🚀 Preparing Moodify for deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📁 Cleaning up local video files..."

# Remove video files but keep the directory structure
rm -f public/wallpaper/*.mp4
rm -f public/wallpaper/*.DS_Store

# Keep important files
echo "✅ Kept .keep and themes.json files"

echo "📝 Checking git status..."
git status

echo ""
echo "🎯 Next steps:"
echo "1. Review the changes above"
echo "2. Set up AWS S3 bucket and upload your videos"
echo "3. Update lib/videoConfig.ts with your S3 URLs"
echo "4. Commit and push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo "5. Deploy to Vercel"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
