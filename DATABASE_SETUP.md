# Database Setup for Production

## Quick Setup for MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

### Step 2: Get Connection String
1. In your Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `moodify` (or your preferred database name)

Example connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/moodify?retryWrites=true&w=majority
```

### Step 3: Set Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add a new variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string
   - **Environment**: Production, Preview, Development

### Step 4: Redeploy
1. Push your changes to GitHub
2. Vercel will automatically redeploy
3. Your todos will now persist in the database!

## How It Works

- **Local Development**: Uses in-memory storage (no database needed)
- **Production**: Uses MongoDB Atlas for persistent storage
- **Automatic Detection**: The app detects if `MONGODB_URI` is available

## Troubleshooting

### If todos still don't persist:
1. Check that `MONGODB_URI` is set in Vercel environment variables
2. Verify the connection string is correct
3. Check Vercel function logs for any database connection errors

### If you get connection errors:
1. Make sure your MongoDB Atlas cluster is running
2. Check that your IP address is whitelisted (or use 0.0.0.0/0 for all IPs)
3. Verify the username and password are correct
