# Deploy Assistant to Vercel - Step by Step

## Method 1: Manual Root Directory (Recommended)

1. Go to https://vercel.com/new
2. Import your repository: `231FA04G02/department-elective`
3. In the "Configure Project" screen:
   - **Project Name**: `department-elective-assistant` (or any name)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: Click the field and **TYPE** `Assistant` (don't use dropdown)
   - **Build Command**: Leave as default (`npm run build`)
   - **Output Directory**: Leave as default (`.next`)
   - **Install Command**: Leave as default (`npm install`)

4. **Environment Variables** - Click "Add" and enter:
   ```
   Name: GOOGLE_GENERATIVE_AI_API_KEY
   Value: AIzaSyCkPvxvFQOLeTUPheJS2HH3PZH7Bcuzpjo
   ```

5. Click **Deploy**

---

## Method 2: If Root Directory Doesn't Work

### Option A: Deploy Entire Repo
1. Import repository
2. **Don't select a root directory** (leave empty or as `.`)
3. Vercel will auto-detect Next.js
4. Add environment variables
5. Deploy

### Option B: Use Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to Assistant folder
cd Assistant

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: department-elective-assistant
# - Directory: ./ (current directory)
# - Override settings? No

# For production deployment
vercel --prod
```

---

## Method 3: Create vercel.json (Already Done ✅)

I've created `Assistant/vercel.json` which tells Vercel this is a deployable project.

Push this to GitHub:
```bash
git add Assistant/vercel.json
git commit -m "Add Vercel config for Assistant"
git push origin main
```

Then try deploying again from Vercel dashboard.

---

## Troubleshooting

### "Assistant folder not in dropdown"
- **Solution**: Type `Assistant` manually in the Root Directory field
- The dropdown is just a helper, you can type any valid path

### "Build fails"
- Check that `package.json` exists in Assistant folder ✅
- Verify environment variables are set
- Check build logs for specific errors

### "Can't find Next.js"
- Make sure `next.config.ts` exists ✅
- Verify `package.json` has Next.js in dependencies ✅

---

## Expected Result

After deployment, you'll get a URL like:
- `https://department-elective-assistant.vercel.app`
- or `https://your-project-name.vercel.app`

Copy this URL - you'll need it for the frontend's `VITE_CHATBOT_URL` environment variable.

---

## Quick Verification

After deployment, visit your Vercel URL. You should see the Assistant chatbot interface.

Test it by:
1. Opening the chat
2. Sending a message
3. Verifying you get a response from Google AI

---

**Recommended**: Use Method 1 and just type "Assistant" in the Root Directory field.
