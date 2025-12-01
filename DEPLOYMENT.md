# Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment ✅

- [x] All code changes committed
- [x] Environment variables documented in `.env.example`
- [x] Local build tested successfully (`npm run build`)
- [x] `.gitignore` updated to exclude `.env` files
- [x] `vercel.json` configuration created

## Deployment Steps

### 1. Prepare Repository
- [ ] Push all changes to GitHub
  ```bash
  git add .
  git commit -m "Ready for Vercel deployment"
  git push origin main
  ```

### 2. Vercel Setup
- [ ] Sign in to [vercel.com](https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Verify framework is detected as "Vite"

### 3. Configure Environment Variables
Add these in Vercel project settings → Environment Variables:

- [ ] `VITE_SUPABASE_URL`
  - Value: Your Supabase project URL
  - Environments: Production, Preview, Development

- [ ] `VITE_SUPABASE_ANON_KEY`
  - Value: Your Supabase anon/public key
  - Environments: Production, Preview, Development

- [ ] `VITE_GEMINI_API_KEY`
  - Value: Your Google Gemini API key
  - Environments: Production, Preview, Development

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (usually 1-2 minutes)
- [ ] Note your deployment URL

## Post-Deployment Verification

### Functional Testing
- [ ] Visit deployment URL
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Verify dashboard loads
- [ ] Check AI insights are generating
- [ ] Verify charts display correctly
- [ ] Test logout functionality

### Technical Checks
- [ ] Check browser console for errors
- [ ] Verify all API calls succeed
- [ ] Test on mobile device
- [ ] Verify page loads are fast

## Optional Enhancements

- [ ] Add custom domain in Vercel settings
- [ ] Enable Vercel Analytics
- [ ] Set up automatic deployments (already configured via GitHub)
- [ ] Configure preview deployments for pull requests
- [ ] Add deployment protection (password/authentication)

## Troubleshooting

If deployment fails:
1. Check Vercel build logs for errors
2. Verify all environment variables are set correctly
3. Ensure no syntax errors in configuration files
4. Try building locally first: `npm run build`

If app loads but doesn't work:
1. Open browser DevTools console
2. Check for API errors
3. Verify environment variables in Vercel dashboard
4. Ensure Supabase project is active

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Documentation](https://supabase.com/docs)
- Project README: [README.md](file:///Users/sunnykishan/project/revenue/README.md)
- Deployment Walkthrough: [walkthrough.md](file:///Users/sunnykishan/.gemini/antigravity/brain/bbfafc65-55a6-4a63-8033-fb606c3b4d74/walkthrough.md)
