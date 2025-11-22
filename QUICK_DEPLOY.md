# Quick Deployment Steps

Backend is live at: **https://department-elective.vercel.app** ✅

---

## 🚀 Next Steps

### 1. Deploy Assistant to Vercel (5 minutes)

```bash
# Make sure you're in the project root
cd Assistant
npm run build  # Test build locally (optional)
```

**On Vercel:**
1. Go to https://vercel.com/new
2. Import your repository
3. Root Directory: `Assistant`
4. Add environment variable:
   - `GOOGLE_GENERATIVE_AI_API_KEY` = `AIzaSyCkPvxvFQOLeTUPheJS2HH3PZH7Bcuzpjo`
5. Click Deploy
6. **Copy the URL** (e.g., `https://your-assistant.vercel.app`)

---

### 2. Deploy Frontend to Netlify (5 minutes)

```bash
# Test build locally (optional)
cd frontend
npm run build
```

**On Netlify:**
1. Go to https://app.netlify.com/start
2. Import your repository
3. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   ```
   VITE_API_URL=https://department-elective.vercel.app/api
   VITE_CHATBOT_URL=https://your-assistant.vercel.app
   ```
   (Replace `your-assistant.vercel.app` with actual URL from step 1)
5. Click Deploy

---

### 3. Update Local .env Files

**frontend/.env** (already done ✅):
```env
VITE_API_URL=https://department-elective.vercel.app/api
VITE_CHATBOT_URL=http://localhost:3000
```

For production testing, change to:
```env
VITE_API_URL=https://department-elective.vercel.app/api
VITE_CHATBOT_URL=https://your-assistant.vercel.app
```

---

## ✅ Verification

After deployment, test:

1. **Backend**: https://department-elective.vercel.app/api/auth/login
2. **Assistant**: https://your-assistant.vercel.app
3. **Frontend**: https://your-app.netlify.app

---

## 🔄 If You Need to Redeploy

### Frontend (after changing env vars)
- Netlify Dashboard → Deploys → Trigger deploy

### Assistant (after code changes)
- Just push to Git, Vercel auto-deploys

### Backend (after code changes)
- Just push to Git, Vercel auto-deploys

---

## 📱 Your Live URLs

- Backend: https://department-elective.vercel.app
- Assistant: `https://your-assistant.vercel.app` (deploy first)
- Frontend: `https://your-app.netlify.app` (deploy second)

---

That's it! Your full-stack app will be live in ~10 minutes. 🎉
