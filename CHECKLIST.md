# 🚀 Quick Setup Checklist

Use this checklist to get your Harker Enterprises website live!

## ☐ Phase 1: Initial Setup (15 minutes)

- [ ] Install Node.js (if not already installed) - [nodejs.org](https://nodejs.org)
- [ ] Open terminal in project directory
- [ ] Run `npm install`
- [ ] Run `npm install resend`
- [ ] Verify installation: `npm run dev` should start the server

## ☐ Phase 2: Email Configuration (10 minutes)

- [ ] Sign up at [resend.com](https://resend.com) (FREE)
- [ ] Create API key in Resend dashboard
- [ ] Open `.env.local` file
- [ ] Add your Resend API key: `RESEND_API_KEY=re_xxxxx`
- [ ] Verify email is set: `EMAIL_TO=ronaldharker@yahoo.com`
- [ ] Test form submission locally

## ☐ Phase 3: Content & Images (30 minutes)

- [ ] Take photos of completed projects (or use existing ones)
- [ ] Save photos in `/public/images/projects/` folder
- [ ] Update `src/components/Gallery.tsx` with actual image paths
- [ ] Create OpenGraph image (1200x630px) and save as `/public/images/og-image.jpg`
- [ ] Test gallery displays correctly

## ☐ Phase 4: Google Analytics (10 minutes) - OPTIONAL

- [ ] Go to [analytics.google.com](https://analytics.google.com)
- [ ] Create new property for harker-enterprises.com
- [ ] Copy Measurement ID (starts with G-)
- [ ] Add to `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxxxx`

## ☐ Phase 5: Testing (15 minutes)

- [ ] Test form submission (check email arrives)
- [ ] Test form with different urgency levels
- [ ] Test rate limiting (submit 4 times quickly)
- [ ] Test on mobile device
- [ ] Test dark mode toggle
- [ ] Test all navigation links
- [ ] Test chat widget
- [ ] Check all services display correctly

## ☐ Phase 6: Deployment (20 minutes)

### Option A: Vercel (Easiest)
- [ ] Push code to GitHub
- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Add environment variables in Vercel:
  - [ ] `RESEND_API_KEY`
  - [ ] `EMAIL_TO`
  - [ ] `EMAIL_FROM`
  - [ ] `NEXT_PUBLIC_SITE_URL` (your domain)
  - [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` (if using)
- [ ] Click Deploy
- [ ] Test live site

### Option B: Other Hosting
- [ ] Run `npm run build` to create production build
- [ ] Upload to hosting provider
- [ ] Configure environment variables on host
- [ ] Test live site

## ☐ Phase 7: Post-Launch (15 minutes)

- [ ] Submit sitemap to Google Search Console
  - Go to [search.google.com/search-console](https://search.google.com/search-console)
  - Add property: your-domain.com
  - Submit sitemap: your-domain.com/sitemap.xml
- [ ] Test email notifications are working
- [ ] Set up Google My Business listing (if not done)
- [ ] Share website link on Facebook page
- [ ] Test form submission from different devices

---

## 📋 Quick Reference

### Important Files to Customize:
- `.env.local` - API keys and configuration
- `src/constants/business.ts` - Business information
- `src/components/Gallery.tsx` - Project photos
- `/public/images/` - All images

### Common Commands:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check for code issues
```

### Important URLs:
- Local development: http://localhost:3000
- Resend Dashboard: https://resend.com/dashboard
- Google Analytics: https://analytics.google.com
- Google Search Console: https://search.google.com/search-console

---

## ✅ Success Criteria

Your website is ready when:
- ✅ Form submissions send emails to `ronaldharker@yahoo.com`
- ✅ All project images display correctly
- ✅ Site loads on mobile and desktop
- ✅ No broken links
- ✅ Google Analytics tracking (if enabled)
- ✅ Site accessible at your domain

---

## 🆘 Quick Fixes

**Form not sending emails?**
```bash
# Check API key in .env.local
# Restart dev server: Ctrl+C then npm run dev
```

**Images not showing?**
```bash
# Check file path starts with /
# Verify file exists in /public/images/
# Check file name matches exactly (case-sensitive)
```

**Build errors?**
```bash
rm -rf .next
npm install
npm run build
```

---

**Need help? Check `SETUP_GUIDE.md` for detailed instructions!**
