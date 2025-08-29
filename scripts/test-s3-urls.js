const https = require('https');

const videoUrls = [
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/autumn-fuji-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/cherry-blossom-tree-on-volcano-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/japanese-town-cloudy-day-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/torii-gate-fuji-mountain-sakura-lake-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/winter-night-train-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/asuka-x-evangelion-unit-02-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/toyota-ae86-trueno-drifting-initial-d-moewalls-com.mp4",
  "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/minecraft-autumn-mountains-moewalls-com.mp4"
];

function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${url.split('/').pop()} - Accessible (${res.statusCode})`);
        resolve(true);
      } else {
        console.log(`❌ ${url.split('/').pop()} - Error (${res.statusCode})`);
        resolve(false);
      }
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${url.split('/').pop()} - Network Error: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log(`⏰ ${url.split('/').pop()} - Timeout`);
      req.destroy();
      resolve(false);
    });
  });
}

async function testAllUrls() {
  console.log('🔍 Testing S3 video URLs...\n');
  
  const results = await Promise.all(videoUrls.map(testUrl));
  const successCount = results.filter(Boolean).length;
  
  console.log(`\n📊 Results: ${successCount}/${videoUrls.length} videos accessible`);
  
  if (successCount === videoUrls.length) {
    console.log('🎉 All videos are accessible! Ready for deployment.');
  } else {
    console.log('⚠️  Some videos may have issues. Check the errors above.');
  }
}

testAllUrls();
