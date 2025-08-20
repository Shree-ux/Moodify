# Moodify - Focus & Productivity App

A beautiful, minimalist focus and productivity application built with Next.js, featuring dynamic wallpapers, task management, and mood-based music integration.

## ✨ Features

- **Dynamic Wallpapers**: Switch between beautiful video and image backgrounds
- **Task Management**: Simple, distraction-free todo list
- **Music Integration**: YouTube-based mood music player
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Profile Management**: Save your personal settings locally
- **Real-time Clock**: Elegant time display with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (optional, for task persistence)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd moodify-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
Create a `.env.local` file in the root directory:
```env
# MongoDB Connection (optional)
MONGODB_URI=mongodb://localhost:27017/moodify
MONGODB_DB=moodify

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moodify
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Wallpaper System

The app includes a collection of high-quality video wallpapers:
- **Autumn Fuji**: Peaceful mountain landscape
- **Cherry Blossom**: Spring cherry blossoms on volcano
- **East Town**: Japanese urban atmosphere
- **Spring**: Torii gate with Fuji mountain
- **Winter Night**: Cozy winter train scene

You can also use Unsplash for custom image backgrounds by entering keywords.

## 🛠️ Built With

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - Database (optional)
- **Mongoose** - MongoDB ODM

## 📁 Project Structure

```
moodify-main/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── BackgroundSwitcher.tsx
│   ├── CenterMenu.tsx
│   ├── ProfileButton.tsx
│   ├── TodoList.tsx
│   └── YouTubeMoodPlayer.tsx
├── lib/                    # Utility libraries
│   └── mongodb.ts         # Database connection
├── models/                 # Data models
│   └── Todo.ts            # Todo schema
├── public/                 # Static assets
│   └── wallpaper/         # Video wallpapers
└── scripts/                # Build scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

## 🌟 Key Components

### BackgroundSwitcher
- Theme-based wallpaper selection
- Video/Image mode toggle
- Custom Unsplash keyword support

### TodoList
- Simple task management
- Local storage fallback
- Error handling and retry logic

### YouTubeMoodPlayer
- Pre-configured mood playlists
- Lo-Fi, Piano, and Rain themes
- Responsive iframe integration

## 🎯 Usage

1. **Change Wallpapers**: Use the BackgroundSwitcher in the top-right corner
2. **Manage Tasks**: View and manage tasks in the left sidebar
3. **Play Music**: Click the YouTube button in the center menu
4. **Profile Settings**: Access profile settings via the profile button

## 🐛 Troubleshooting

### Wallpapers Not Loading
- Ensure video files are in `public/wallpaper/` directory
- Check browser console for errors
- Verify file permissions

### Database Connection Issues
- Check MongoDB connection string in `.env.local`
- Ensure MongoDB service is running
- Verify network connectivity

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Video wallpapers from [MoeWalls](https://moewalls.com/)
- Icons from [Lucide](https://lucide.dev/)
- Design inspiration from modern productivity apps

---

**Moodify** - Transform your workspace, boost your focus. ✨
