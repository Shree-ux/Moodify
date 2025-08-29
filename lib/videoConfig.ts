export interface VideoTheme {
  key: string
  label: string
  url: string
  thumbnail: string
}

// S3 URLs for video wallpapers hosted on AWS
export const videoThemes: VideoTheme[] = [
  {
    key: "autumn-fuji",
    label: "Autumn Fuji",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/autumn-fuji-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/autumn-fuji-moewalls-com.mp4"
  },
  {
    key: "cherry-blossom",
    label: "Cherry Blossom",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/cherry-blossom-tree-on-volcano-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/cherry-blossom-tree-on-volcano-moewalls-com.mp4"
  },
  {
    key: "east-town",
    label: "East Town",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/japanese-town-cloudy-day-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/japanese-town-cloudy-day-moewalls-com.mp4"
  },
  {
    key: "spring",
    label: "Spring",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/torii-gate-fuji-mountain-sakura-lake-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/torii-gate-fuji-mountain-sakura-lake-moewalls-com.mp4"
  },
  {
    key: "winter-night",
    label: "Winter Night",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/winter-night-train-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/winter-night-train-moewalls-com.mp4"
  },
  {
    key: "evangelion",
    label: "Evangelion Unit-02",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/asuka-x-evangelion-unit-02-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/asuka-x-evangelion-unit-02-moewalls-com.mp4"
  },
  {
    key: "initial-d",
    label: "Initial D AE86",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/toyota-ae86-trueno-drifting-initial-d-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/toyota-ae86-trueno-drifting-initial-d-moewalls-com.mp4"
  },
  {
    key: "minecraft",
    label: "Minecraft Autumn",
    url: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/minecraft-autumn-mountains-moewalls-com.mp4",
    thumbnail: "https://mood-playlist-wallpapers.s3.eu-north-1.amazonaws.com/wallpaper/minecraft-autumn-mountains-moewalls-com.mp4"
  }
]
