# 🚀 Quick Start Guide

Get the Birthday App running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd birthday-app
npm install
```

## Step 2: Start MongoDB

### Option A: Local MongoDB (Recommended for Development)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

### Option B: MongoDB Atlas (Cloud)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `.env` file (see Step 3)

## Step 3: Configure Environment

```bash
# Create .env file in apps/api/
cp apps/api/.env.example apps/api/.env

# Generate VAPID keys
node -e "console.log(require('web-push').generateVAPIDKeys())"

# Edit apps/api/.env and add:
# - Your MongoDB URI (default: mongodb://localhost:27017/birthday-app)
# - Generated VAPID keys
# - JWT secret (any random string)
```

## Step 4: Run the Application

```bash
# Option 1: Run both frontend and backend
npm run start:all

# Option 2: Run separately
# Terminal 1:
npm run start:api   # Backend at http://localhost:3000

# Terminal 2:
npm run start:web   # Frontend at http://localhost:4200
```

## Step 5: Create Account & Add Birthdays

1. Open http://localhost:4200
2. Click "Register here"
3. Create your account
4. Start adding birthdays!

## 🎉 You're Done!

The app is now running with:
- ✅ Frontend at http://localhost:4200
- ✅ Backend API at http://localhost:3000
- ✅ API Docs at http://localhost:3000/api/docs

## 📱 Next Steps

- **Enable Push Notifications:** Allow notifications in your browser
- **Test Notifications:** Use the API docs to test notifications
- **Add to Home Screen:** Install the PWA on your device
- **Deploy:** Follow the deployment guide in README.md

## 🐛 Troubleshooting

**MongoDB connection fails:**
- Check if MongoDB is running: `brew services list` (macOS)
- Verify connection string in `.env`

**Port already in use:**
- Change port in `apps/api/.env` (backend)
- Change port in `apps/web/project.json` (frontend)

**Dependencies installation fails:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 💡 Tips

- The app uses Angular Signals for reactive state
- Birthdays are automatically sorted by date
- Notifications run daily at 9 AM (configurable in `notifications.service.ts`)
- PWA works offline after first load

---

Need help? Check the full [README.md](README.md) for detailed documentation.
