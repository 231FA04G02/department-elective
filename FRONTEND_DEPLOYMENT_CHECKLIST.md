# Frontend Deployment Checklist ✅

## Current Status

### ✅ What's Already Done:
- [x] Backend deployed: `https://department-elective.vercel.app`
- [x] Assistant deployed: `https://department-elective-b8o7.vercel.app`
- [x] Environment variables configured in `.env`
- [x] All API calls use environment variables
- [x] Build test passed successfully
- [x] `netlify.toml` configuration created
- [x] `.gitignore` properly configured

### 📋 Frontend Configuration Summary:

**Environment Variables (.env):**
```env
VITE_API_URL=https://department-elective.vercel.app/api
VITE_CHATBOT_URL=https://department-elective-b8o7.vercel.app
```

**Files Using Environment Variables:**
- ✅ `src/api/api.js` - Main API client
- ✅ `src/components/login/Login.jsx` - Login API calls
- ✅ `src/components/register/Register.jsx` - Register API calls
- ✅ `src/components/chat/ChatbotWidget.jsx` - Chatbot iframe
- ✅ `src/App.jsx` - Chatbot iframe

**Build Configuration:**
- ✅ `netlify.toml` - Netlify deployment config
- ✅ `vite.config.js` - Vite build config
- ✅ `package.json` - Dependencies and scripts

---

## 🚀 Deploy to Netlify - Step by Step

### 1. Push Latest Changes to GitHub

```bash
# Make sure netlify.toml is committed
git add frontend/netlify.toml
git commit -m "Add Netlify configuration"
git push origin main
```

### 2. Deploy on Netlify

1. **Go to**: https://app.netlify.com/start
2. **Click**: "Import an existing project"
3. **Connect**: Your GitHub account (if not already)
4. **Select**: Repository `231FA04G02/department-elective`
5. **Configure Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main`

### 3. Add Environment Variables

**IMPORTANT**: Before deploying, add these environment variables:

1. Click **"Show advanced"** or go to **"Site settings"** → **"Environment variables"**
2. Add the following:

```
Key: VITE_API_URL
Value: https://department-elective.vercel.app/api

Key: VITE_CHATBOT_URL
Value: https://department-elective-b8o7.vercel.app
```

### 4. Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (usually 1-2 minutes)
3. Copy your site URL (e.g., `https://your-app.netlify.app`)

---

## 🧪 Testing After Deployment

### Test Backend Connection
1. Open your Netlify site
2. Open browser DevTools (F12) → Network tab
3. Try to login/register
4. Verify API calls go to: `https://department-elective.vercel.app/api`

### Test Chatbot Integration
1. Click the chatbot button on your site
2. Verify the iframe loads: `https://department-elective-b8o7.vercel.app`
3. Send a test message
4. Verify you get a response

### Check for Errors
1. Open browser Console (F12)
2. Look for any CORS errors
3. Check for 404 or 500 errors
4. Verify all assets load correctly

---

## 🔧 Local Development

Your `.env` file is already configured for production URLs. If you want to test locally:

### Option 1: Use Production APIs (Current Setup)
```bash
cd frontend
npm run dev
# Uses production backend and assistant
```

### Option 2: Use Local Backend
Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CHATBOT_URL=http://localhost:3000
```

`.env.local` overrides `.env` for local development.

---

## 📝 Important Notes

### Environment Variables in Vite
- Must start with `VITE_` prefix
- Available at build time via `import.meta.env.VITE_*`
- Changes require rebuild/redeploy

### Netlify Redirects
The `netlify.toml` includes:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
This ensures React Router works correctly (all routes redirect to index.html).

### Build Warnings
The build shows a warning about chunk size (894 KB). This is normal for React apps but consider:
- Code splitting for better performance
- Lazy loading routes
- Tree shaking unused dependencies

---

## 🆘 Troubleshooting

### Build Fails on Netlify
- Check build logs for specific errors
- Verify `package.json` has all dependencies
- Make sure Node version is compatible (set to 18 in netlify.toml)

### API Calls Fail
- Verify environment variables are set in Netlify
- Check CORS is enabled on backend (already done ✅)
- Verify backend is running: https://department-elective.vercel.app

### Chatbot Not Loading
- Check `VITE_CHATBOT_URL` is correct
- Verify Assistant is accessible: https://department-elective-b8o7.vercel.app
- Check browser console for iframe errors

### Blank Page After Deploy
- Check browser console for errors
- Verify base path in vite.config.js
- Check Netlify deploy logs

---

## ✅ Final Checklist

Before deploying:
- [ ] Commit and push `netlify.toml`
- [ ] Verify `.env` has correct URLs
- [ ] Test build locally (`npm run build`)
- [ ] Backend is accessible
- [ ] Assistant is accessible

During deployment:
- [ ] Set `VITE_API_URL` in Netlify
- [ ] Set `VITE_CHATBOT_URL` in Netlify
- [ ] Base directory set to `frontend`
- [ ] Publish directory set to `dist`

After deployment:
- [ ] Test login/register
- [ ] Test chatbot
- [ ] Check browser console for errors
- [ ] Verify all pages work

---

## 🎉 Your Deployment URLs

- **Backend**: https://department-elective.vercel.app
- **Assistant**: https://department-elective-b8o7.vercel.app
- **Frontend**: `https://your-app.netlify.app` (after deployment)

---

**Everything is ready! Just push the netlify.toml and deploy on Netlify.** 🚀
