# 🚀 Installation Guide - Angular 19 Version

## ✨ What's Included

This is the **complete Birthday App** with:

✅ **Angular 19** with SSR (latest stable)
✅ **Standalone Components & Signals**
✅ **NestJS 10.4** Backend
✅ **MongoDB** Integration  
✅ **JWT Authentication**
✅ **Push Notifications**
✅ **Nx 20** Monorepo
✅ **Ready for Ionic/Capacitor**

---

## 📋 Prerequisites

Before installing, make sure you have:

### Required:
- **Node.js 20.x or 22.x** (Node 24 also works)
- **npm 10.x+**
- **MongoDB** (local or Atlas)
- **Git** (optional)

### Check Your Versions:

```cmd
node --version
:: Should show: v20.x.x, v22.x.x, or v24.x.x

npm --version
:: Should show: 10.x.x or higher

mongo --version
:: Or use MongoDB Atlas (cloud)
```

---

## 🔧 Step 1: Install Node.js (If Needed)

### Using nvm-windows (Recommended):

```cmd
:: Install nvm-windows 1.1.9 or 1.1.10
:: Download from: https://github.com/coreybutler/nvm-windows/releases

:: Install Node.js 20 LTS
nvm install 20.18.1
nvm use 20.18.1

:: Verify
node --version
npm --version
```

### Direct Download:

**Node.js 20 LTS:**
```
https://nodejs.org/dist/v20.18.1/node-v20.18.1-x64.msi
```

---

## 💾 Step 2: Setup MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Create account: https://www.mongodb.com/cloud/atlas/register
2. Create free M0 cluster
3. Get connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/birthday-app
   ```

### Option B: Local MongoDB

**Windows 7:**
- MongoDB 4.4.29: https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.29-signed.msi

**Windows 10/11:**
- Latest MongoDB: https://www.mongodb.com/try/download/community

**Start MongoDB:**
```cmd
net start MongoDB
```

---

## 📦 Step 3: Install the Project

### Extract and Navigate:

```cmd
:: Extract the ZIP file to your projects folder
:: Example: C:\Projects\birthday-app

cd C:\Projects\birthday-app
```

### Clean Install:

```cmd
:: Make sure you're using Node 20+
node --version

:: Clean npm cache
npm cache clean --force

:: Install all dependencies
npm install
```

**This should complete without errors!** ✅

---

## ⚙️ Step 4: Configure Environment

### Create .env file:

```cmd
:: Copy the example file
copy apps\api\.env.example apps\api\.env
```

### Edit `apps/api/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/birthday-app
# Or for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/birthday-app

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# VAPID Keys for Push Notifications (generate below)
VAPID_PUBLIC_KEY=your-generated-vapid-public-key
VAPID_PRIVATE_KEY=your-generated-vapid-private-key
VAPID_SUBJECT=mailto:your-email@example.com

# Server Port
PORT=3000
NODE_ENV=development
```

### Generate VAPID Keys:

```cmd
:: In your project directory, run:
node -e "console.log(require('web-push').generateVAPIDKeys())"

:: Copy the output and paste into .env file
```

---

## 🚀 Step 5: Run the Application

### Start Everything:

```cmd
npm run start:all
```

This starts both:
- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/docs

### Or Run Separately:

**Terminal 1 - Backend:**
```cmd
npm run start:api
```

**Terminal 2 - Frontend:**
```cmd
npm run start:web
```

---

## ✅ Step 6: Verify Installation

### Test the API:

Visit: http://localhost:3000/api/docs

You should see the Swagger documentation.

### Test the Frontend:

Visit: http://localhost:4200

You should see the login page.

### Create an Account:

1. Click "Register here"
2. Enter:
   - Name (optional)
   - Email
   - Password
3. Click "Register"
4. You're logged in!

### Add a Birthday:

1. Click "+ Add Birthday"
2. Enter:
   - Name: "John Doe"
   - Month: January
   - Day: 15
   - Year: 1990 (optional)
3. Click "Add"
4. See it in the list!

---

## 🏗️ Build for Production

### Build Both Apps:

```cmd
npm run build:web
npm run build:api
```

**Output:**
- Frontend: `dist/apps/web/`
- Backend: `dist/apps/api/`

---

## 🐛 Troubleshooting

### npm install fails

**Solution 1 - Update npm:**
```cmd
npm install -g npm@latest
npm install
```

**Solution 2 - Legacy peer deps:**
```cmd
npm install --legacy-peer-deps
```

**Solution 3 - Clear everything:**
```cmd
del package-lock.json
rmdir /s /q node_modules
npm cache clean --force
npm install
```

### lmdb errors

This shouldn't happen with Node 20+, but if it does:

```cmd
npm install --no-optional
```

### MongoDB connection fails

**Check MongoDB is running:**
```cmd
net start MongoDB
```

**Or use MongoDB Atlas** (no local install needed)

### Port 4200 or 3000 in use

**Change ports in:**
- Frontend: `apps/web/project.json` (line with `"port": 4200`)
- Backend: `apps/api/.env` (change `PORT=3000`)

---

## 📊 Package Versions

This project uses:

| Package | Version |
|---------|---------|
| Angular | 19.0.5 |
| Nx | 20.2.3 |
| NestJS | 10.4.15 |
| TypeScript | 5.6.3 |
| Node.js | 20.x / 22.x / 24.x |

All versions are **production-ready and stable**!

---

## 🎯 Quick Start Summary

```cmd
:: 1. Install Node.js 20+
nvm install 20.18.1
nvm use 20.18.1

:: 2. Extract project and navigate
cd C:\Projects\birthday-app

:: 3. Install dependencies
npm install

:: 4. Configure environment
copy apps\api\.env.example apps\api\.env
:: Edit .env with your settings

:: 5. Generate VAPID keys
node -e "console.log(require('web-push').generateVAPIDKeys())"

:: 6. Run the app
npm run start:all

:: 7. Visit http://localhost:4200
:: Done! 🎉
```

---

## 📚 Next Steps

- **Deploy to Production:** See `DEPLOYMENT_NETLIFY.md`
- **Add Mobile App:** See `README.md` section on Ionic
- **Customize:** Edit components in `apps/web/src/app/`
- **API Documentation:** http://localhost:3000/api/docs

---

## 🆘 Need Help?

- Check the `README.md` for full documentation
- Review `QUICKSTART.md` for quick tips
- Check `TODO.md` for enhancement ideas

---

**Enjoy your Birthday Reminder App!** 🎂🎉

Built with ❤️ using Angular 19, NestJS, MongoDB, and Nx
