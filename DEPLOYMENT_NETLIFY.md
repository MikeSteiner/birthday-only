# 🚀 Deploying to Netlify

This guide shows you how to deploy the Birthday App using your existing Netlify subscription.

## Architecture

- **Frontend (Angular 20 SSR)** → Netlify
- **Backend (NestJS API)** → Railway/Render/Heroku
- **Database** → MongoDB Atlas (Free)

## Part 1: Setup MongoDB Atlas (Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a cluster (M0 Free tier is sufficient)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/birthday-app`

## Part 2: Deploy Backend to Railway

Railway is recommended because it's simple and has a generous free tier.

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Make sure your code is in GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

3. **Setup on Railway**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect NestJS

4. **Configure Environment Variables**
   
   In Railway dashboard, add these variables:
   ```
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=your-super-secret-key-minimum-32-characters-long
   VAPID_PUBLIC_KEY=<generated-key>
   VAPID_PRIVATE_KEY=<generated-key>
   VAPID_SUBJECT=mailto:your-email@example.com
   PORT=3000
   NODE_ENV=production
   ```

   To generate VAPID keys:
   ```bash
   node -e "console.log(require('web-push').generateVAPIDKeys())"
   ```

5. **Configure Build Settings**
   
   In Railway, set:
   - **Build Command:** `npm install && npm run build:api`
   - **Start Command:** `node dist/apps/api/main.js`
   - **Root Directory:** `/`

6. **Get Your API URL**
   - Railway will provide a URL like: `https://your-app.up.railway.app`
   - Save this for the frontend configuration

### Alternative: Deploy Backend to Render

If you prefer Render:

1. Go to https://render.com
2. Create "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install && npm run build:api`
   - **Start Command:** `node dist/apps/api/main.js`
   - Add the same environment variables as above

## Part 3: Deploy Frontend to Netlify

### Option A: Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Update API URL**
   
   Edit `apps/web/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-app.up.railway.app' // Your Railway URL
   };
   ```

3. **Build the App**
   ```bash
   npm run build:web
   ```

4. **Deploy to Netlify**
   ```bash
   netlify login
   netlify deploy --prod
   ```

   When prompted:
   - **Publish directory:** `dist/apps/web/browser`
   - Follow the prompts to create a new site

### Option B: Netlify UI (Git Integration)

1. **Update API URL** (same as above)

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update API URL"
   git push
   ```

3. **Configure Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository
   - Configure build settings:
     - **Build command:** `npm run build:web`
     - **Publish directory:** `dist/apps/web/browser`
     - **Base directory:** `/`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

### Configure Netlify Settings

1. **Add Redirects File**
   
   Create `apps/web/src/_redirects`:
   ```
   /*    /index.html   200
   ```

   This enables client-side routing for Angular.

2. **Environment Variables (if needed)**
   
   In Netlify dashboard → Site settings → Environment variables:
   - Add any frontend-specific variables if needed

3. **Enable HTTPS**
   - Netlify automatically provides SSL
   - Force HTTPS in Site settings → Domain management

## Part 4: Configure CORS

Update your NestJS backend to allow requests from Netlify:

In `apps/api/src/main.ts`:
```typescript
app.enableCors({
  origin: [
    'http://localhost:4200',
    'https://your-netlify-site.netlify.app',  // Add your Netlify URL
    'https://your-custom-domain.com'          // Add custom domain if you have one
  ],
  credentials: true,
});
```

Redeploy backend after this change.

## Part 5: Test Everything

1. **Visit Your Netlify Site**
   - https://your-site.netlify.app

2. **Test Registration & Login**
   - Create a new account
   - Add some birthdays

3. **Verify API Connection**
   - Check browser console for any CORS errors
   - Ensure birthdays are being saved/loaded

4. **Test Push Notifications**
   - Allow notifications in browser
   - Send a test notification from your profile

## Part 6: Custom Domain (Optional)

### Add Custom Domain to Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Add your domain to CORS allowed origins in backend

### SSL/HTTPS

- Netlify automatically provides SSL for custom domains
- It may take a few minutes to provision

## Continuous Deployment

With this setup:
- Push to `main` branch → Netlify auto-deploys frontend
- Railway auto-deploys backend on push
- Changes go live automatically

## Monitoring & Logs

### Netlify Logs
- Site dashboard → Deploys → Click on a deploy → View logs

### Railway Logs  
- Project dashboard → View logs in real-time

### MongoDB Atlas Monitoring
- Atlas dashboard → Monitoring tab

## Cost Summary

This setup is **FREE** for small projects:

- **MongoDB Atlas:** Free tier (512MB storage)
- **Railway:** $5 credit/month (plenty for this app)
- **Netlify:** Free tier (100GB bandwidth, 300 build minutes)

Total: **$0/month** for small usage!

## Troubleshooting

### Frontend can't connect to backend
- Check API URL in `environment.prod.ts`
- Verify CORS settings in backend
- Check Railway/Render logs for errors

### Database connection fails
- Verify MongoDB Atlas connection string
- Check if IP address is whitelisted (use 0.0.0.0/0 for all)
- Ensure database user has correct permissions

### Builds fail on Netlify
- Check build logs in Netlify dashboard
- Verify all dependencies are in `package.json`
- Try clearing cache and rebuilding

## Next Steps

1. **Setup Monitoring:** Add error tracking (Sentry, LogRocket)
2. **Analytics:** Add Google Analytics or Plausible
3. **Backups:** Enable automated backups in MongoDB Atlas
4. **Custom Domain:** Add your own domain
5. **Mobile App:** Deploy Ionic/Capacitor version

---

**Need help?** Check the main [README.md](README.md) or create an issue on GitHub.
