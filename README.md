# 🎂 Birthday App - Nx Monorepo

A minimalistic birthday reminder application built with **Angular 19 (SSR)**, **NestJS**, and **MongoDB**, organized in an **Nx monorepo**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Adding Ionic for Mobile](#adding-ionic-for-mobile)
- [API Documentation](#api-documentation)

## ✨ Features

- ✅ User authentication (JWT)
- ✅ Add/Edit/Delete birthdays
- ✅ Upcoming birthdays view
- ✅ Daily push notifications at 9 AM
- ✅ Cross-device sync
- ✅ Server-Side Rendering (SSR)
- ✅ PWA support
- ✅ Responsive design
- ✅ MongoDB database

## 🛠 Tech Stack

### Frontend
- **Angular 19** with SSR
- **Standalone Components**
- **Signals** for reactive state
- **TypeScript**
- Ready for **Ionic/Capacitor** integration

### Backend
- **NestJS** (TypeScript)
- **MongoDB** with Mongoose
- **Passport.js** + **JWT** authentication
- **Web Push** notifications
- **Cron Jobs** for daily checks

## 📁 Project Structure

```
birthday-app/
├── apps/
│   ├── web/                  # Angular 18 SSR frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/     # Guards, interceptors
│   │   │   │   └── features/ # Auth, Birthdays modules
│   │   │   ├── environments/
│   │   │   └── main.ts
│   │   └── project.json
│   │
│   └── api/                  # NestJS backend
│       ├── src/
│       │   ├── app/
│       │   │   ├── auth/     # Authentication module
│       │   │   ├── users/    # Users module
│       │   │   ├── birthdays/# Birthdays module
│       │   │   └── notifications/  # Notifications + Cron
│       │   └── main.ts
│       └── project.json
│
├── libs/
│   └── shared/               # Shared DTOs and interfaces
│
└── package.json
```

## 📦 Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **Git**

## 🚀 Installation

### 1. Clone or Setup the Project

```bash
# Navigate to the project directory
cd birthday-app

# Install dependencies
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally (macOS)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# The connection string will be: mongodb://localhost:27017/birthday-app
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Get your connection string

### 3. Generate VAPID Keys (for Push Notifications)

```bash
# Run this in Node.js
node -e "console.log(require('web-push').generateVAPIDKeys())"
```

Copy the generated keys for the next step.

### 4. Configure Environment Variables

**Backend (.env file)**
```bash
# Create .env file in apps/api/
cp apps/api/.env.example apps/api/.env

# Edit apps/api/.env with your values:
MONGODB_URI=mongodb://localhost:27017/birthday-app
JWT_SECRET=your-super-secret-jwt-key-change-this
VAPID_PUBLIC_KEY=your-generated-vapid-public-key
VAPID_PRIVATE_KEY=your-generated-vapid-private-key
VAPID_SUBJECT=mailto:your-email@example.com
PORT=3000
```

**Frontend**

The Angular app uses `apps/web/src/environments/environment.ts` for development (already configured for localhost:3000).

For production, update `apps/web/src/environments/environment.prod.ts` with your deployed API URL.

## 🏃 Running the Application

### Development Mode

**Option 1: Run everything together**
```bash
npm run start:all
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
npm run start:api
# API runs on http://localhost:3000
# Swagger docs at http://localhost:3000/api/docs
```

Terminal 2 - Frontend:
```bash
npm run start:web
# App runs on http://localhost:4200
```

### Build for Production

```bash
# Build frontend
npm run build:web

# Build backend
npm run build:api
```

## 🌍 Environment Variables

### Backend (apps/api/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/birthday-app` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `VAPID_PUBLIC_KEY` | VAPID public key for push notifications | Generated key |
| `VAPID_PRIVATE_KEY` | VAPID private key for push notifications | Generated key |
| `VAPID_SUBJECT` | Contact email for push service | `mailto:you@example.com` |
| `PORT` | API server port | `3000` |

### Frontend (apps/web/src/environments/)

**environment.ts** (Development)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

**environment.prod.ts** (Production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com'
};
```

## 🚀 Deployment

### Option 1: Netlify (Frontend) + Railway/Render (Backend)

#### Deploy Backend to Railway

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Railway**
   - Go to https://railway.app
   - New Project → Deploy from GitHub
   - Select your repo
   - Add environment variables
   - Railway will auto-deploy

3. **Add MongoDB**
   - In Railway, add MongoDB plugin
   - Or use MongoDB Atlas and add connection string to environment variables

#### Deploy Frontend to Netlify

1. **Update API URL**
   Edit `apps/web/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-railway-backend.railway.app'
   };
   ```

2. **Build**
   ```bash
   npm run build:web
   ```

3. **Deploy to Netlify**
   - Go to https://netlify.com
   - New site from Git
   - Select your repo
   - Build command: `npm run build:web`
   - Publish directory: `dist/apps/web/browser`
   - Deploy!

4. **Configure Redirects**
   Create `apps/web/src/_redirects`:
   ```
   /* /index.html 200
   ```

### Option 2: Single Server Deployment (DigitalOcean/AWS/Heroku)

Use a process manager like PM2:

```bash
# Install PM2
npm install -g pm2

# Start backend
pm2 start dist/apps/api/main.js --name birthday-api

# Serve frontend with a web server (nginx/apache)
# Or use serve package
npm install -g serve
pm2 start "serve -s dist/apps/web/browser -p 4200" --name birthday-web
```

## 📱 Adding Ionic for Mobile

### 1. Install Ionic & Capacitor

```bash
npm install @ionic/angular @ionic/angular-toolkit @capacitor/core @capacitor/cli @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar @capacitor/push-notifications @capacitor/local-notifications
```

### 2. Create Mobile App

```bash
# Generate Ionic app in Nx
nx g @nx/angular:app mobile --routing --style=scss --standalone

# Initialize Capacitor
cd apps/mobile
npx cap init birthday-app com.yourcompany.birthdayapp
```

### 3. Update Mobile App to Use Ionic

**apps/mobile/src/main.ts**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
  ],
});
```

**apps/mobile/src/app/app.component.ts**
```typescript
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {}
```

### 4. Share Code Between Web & Mobile

Create shared components in `libs/shared/ui/` and import them in both web and mobile apps.

### 5. Add Platform-Specific Features

**Push Notifications (Mobile)**
```typescript
import { PushNotifications } from '@capacitor/push-notifications';

// Request permission and register
await PushNotifications.requestPermissions();
await PushNotifications.register();
```

### 6. Build and Run

```bash
# Build Angular app
nx build mobile

# Sync Capacitor
cd apps/mobile
npx cap sync

# Run on Android
npx cap open android

# Run on iOS  
npx cap open ios
```

## 📚 API Documentation

Once the backend is running, access Swagger documentation at:

```
http://localhost:3000/api/docs
```

### Key Endpoints

**Authentication**
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login

**Birthdays**
- GET `/birthdays` - Get all birthdays
- GET `/birthdays/upcoming?days=30` - Get upcoming birthdays
- POST `/birthdays` - Create birthday
- PUT `/birthdays/:id` - Update birthday
- DELETE `/birthdays/:id` - Delete birthday

**Notifications**
- GET `/notifications/vapid-public-key` - Get VAPID public key
- POST `/notifications/test` - Send test notification

**Users**
- GET `/users/profile` - Get user profile
- POST `/users/push-subscription` - Save push subscription

## 🧪 Testing

```bash
# Run all tests
nx test

# Test specific app
nx test web
nx test api
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📝 License

MIT

## 🙏 Support

For issues or questions, please create an issue in the GitHub repository.

---

**Made with ❤️ using Nx, Angular, NestJS, and MongoDB**
