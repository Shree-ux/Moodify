export interface VideoTheme {
  key: string
  label: string
  url: string
  thumbnail: string
}

// Replace these placeholder URLs with your actual S3 URLs after uploading
export const videoThemes: VideoTheme[] = [
  {
    key: "autumn-fuji",
    label: "Autumn Fuji",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/autumn-fuji-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/autumn-fuji-thumb.jpg"
  },
  {
    key: "cherry-blossom",
    label: "Cherry Blossom",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/cherry-blossom-tree-on-volcano-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/cherry-blossom-thumb.jpg"
  },
  {
    key: "east-town",
    label: "East Town",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/japanese-town-cloudy-day-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/east-town-thumb.jpg"
  },
  {
    key: "spring",
    label: "Spring",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/torii-gate-fuji-mountain-sakura-lake-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/spring-thumb.jpg"
  },
  {
    key: "winter-night",
    label: "Winter Night",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/winter-night-train-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/winter-night-thumb.jpg"
  },
  {
    key: "evangelion",
    label: "Evangelion Unit-02",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/asuka-x-evangelion-unit-02-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/evangelion-thumb.jpg"
  },
  {
    key: "initial-d",
    label: "Initial D AE86",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/toyota-ae86-trueno-drifting-initial-d-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/initial-d-thumb.jpg"
  },
  {
    key: "minecraft",
    label: "Minecraft Autumn",
    url: "https://your-s3-bucket.s3.amazonaws.com/wallpapers/minecraft-autumn-mountains-moewalls-com.mp4",
    thumbnail: "https://your-s3-bucket.s3.amazonaws.com/thumbnails/minecraft-thumb.jpg"
  }
]
