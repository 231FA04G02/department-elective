# Deployment Configuration Guide

Your backend is deployed at: **https://department-elective.vercel.app**

---

## 🎨 Frontend Configuration (Netlify)

### Local Development
Your `frontend/.env` file is already configured:
```env
VITE_API_URL=https://department-elective.vercel.app/api
VITE_CHATBOT_URL=http://localhost:3000
```

### Deploy to Netlify

1. **Go to Netlify Dashboard**
2. **Import your repository**
3. **Configure build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables** (IMPORTANT):
   - Go to: **Site settings** → **Environment variables** → **Add a variable**
   - Add these:
     ```
     VITE_API_URL=https://department-elective.vercel.app/api
     VITE_CHATBOT_URL=https://your-assistant.vercel.app
     ```
   - ⚠️ You'll update `VITE_CHATBOT_URL` after deploying the Assistant

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Copy your frontend URL (e.g., `https://your-app.netlify.app`)

---

## 🤖 Assistant Configuration (Vercel)

### Local Development
Your `Assistant/.env.local` is already set up with your Google AI key.

### Deploy to Vercel

1. **Go to Vercel Dashboard**
2. **Add New Project**
3. **Import your repository**
4. **Configure project**:
   - Root Directory: `Assistant`
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables**:
   - Go to: **Project Settings** → **Environment Variables**
   - Add:
     ```
     GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyCkPvxvFQOLeTUPheJS2HH3PZH7Bcuzpjo
     ```
   - ⚠️ **Security Note**: Consider regenerating this API key since it was in your .env file

6. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy your Assistant URL (e.g., `https://your-assistant.vercel.app`)

---

## 🔄 Update Frontend with Assistant URL

After deploying the Assistant:

1. **Go back to Netlify**
2. **Site settings** → **Environment variables**
3. **Update** `VITE_CHATBOT_URL`:
   ```
   VITE_CHATBOT_URL=https://your-assistant.vercel.app
   ```
4. **Trigger redeploy**:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

---

## 🧪 Test Your Deployment

### Test Backend
```bash
curl https://department-elective.vercel.app/api/auth/login
```
Should return a response (even if it's an error, it means it's working)

### Test Frontend
1. Visit your Netlify URL
2. Try to register/login
3. Check browser console for errors
4. Verify API calls are going to `https://department-elective.vercel.app/api`

### Test Assistant
1. Visit your Assistant Vercel URL
2. Try sending a message
3. Verify the chatbot responds

### Test Integration
1. On your frontend, click the chatbot button
2. Verify it opens the Assistant in an iframe
3. Test the full flow

---

## 🔧 Local Development Commands

### Frontend (with deployed backend)
```bash
cd frontend
npm run dev
# Will use https://department-elective.vercel.app/api
```

### Assistant
```bash
cd Assistant
npm run dev
# Runs on http://localhost:3000
```

### Backend (if needed locally)
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

---

## 📝 Environment Variables Summary

### Frontend (.env)
```env
VITE_API_URL=https://department-elective.vercel.app/api
VITE_CHATBOT_URL=http://localhost:3000  # Local dev
# OR
VITE_CHATBOT_URL=https://your-assistant.vercel.app  # Production
```

### Frontend (Netlify Environment Variables)
```
VITE_API_URL=https://department-elective.vercel.app/api
VITE_CHATBOT_URL=https://your-assistant.vercel.app
```

### Assistant (.env.local)
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### Assistant (Vercel Environment Variables)
```
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### Backend (.env) - Already deployed
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

---

## ⚠️ Important Notes

1. **CORS**: Your backend already has CORS enabled, so cross-origin requests will work
2. **HTTPS**: All deployed URLs use HTTPS automatically
3. **Environment Variables**: 
   - Netlify/Vercel env vars are only available at build time for frontend
   - Changes require a redeploy
4. **API Key Security**: Consider regenerating your Google AI API key since it was exposed

---

## 🎉 Quick Deployment Checklist

- [x] Backend deployed to Vercel ✅
- [ ] Assistant deployed to Vercel
- [ ] Frontend deployed to Netlify
- [ ] Frontend env vars updated with Assistant URL
- [ ] All three apps tested and working together

---

## 🆘 Troubleshooting

### Frontend can't connect to backend
- Check browser console for CORS errors
- Verify `VITE_API_URL` in Netlify env vars
- Make sure backend is running: visit https://department-elective.vercel.app

### Chatbot not loading
- Check `VITE_CHATBOT_URL` is correct
- Verify Assistant is deployed and accessible
- Check browser console for iframe errors

### Build failures
- Check build logs in Netlify/Vercel dashboard
- Verify all dependencies are in package.json
- Make sure environment variables are set

---

Need help? Check the logs in your Netlify/Vercel dashboards!
