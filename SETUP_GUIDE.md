# 🚀 Harker Enterprises Website - Complete Setup & Deployment Guide

## ✅ What's Been Implemented

All improvements have been implemented! Here's what's new:

### 1. **Centralized Configuration** ✨
- `src/constants/business.ts` - All business info in one place
- Easy to update contact info, services, and pricing

### 2. **Enhanced SEO** 🔍
- Comprehensive metadata (OpenGraph, Twitter cards)
- Schema.org structured data for local business
- Dynamic sitemap generation
- Robots.txt configuration
- Keywords optimization

### 3. **Working Contact Form** 📧
- Real API endpoint (`/api/contact`)
- Email integration with Resend
- Rate limiting (anti-spam)
- Loading states and error handling
- Success confirmations

### 4. **Analytics Integration** 📊
- Google Analytics component
- Event tracking for form submissions
- Phone/email click tracking
- Service inquiry tracking

### 5. **Better User Experience** 💫
- Custom 404 error page
- Loading states
- Accessibility improvements (skip links, ARIA labels)
- Mobile responsiveness fixes
- Error handling

### 6. **Security & Performance** 🔒
- Rate limiting on forms
- Honeypot anti-spam
- Security headers in Next.js config
- Image optimization
- Code splitting

### 7. **Configuration Files** ⚙️
- Environment variables (`.env.example`, `.env.local`)
- Enhanced `next.config.js`
- Stricter TypeScript config
- `.gitignore` updated

---

## 📦 Installation & Setup

### Step 1: Install Dependencies

First, make sure you have Node.js installed (v18 or higher). Then run:

```bash
# In the project directory
npm install

# Install the email service package
npm install resend
```

### Step 2: Configure Environment Variables

The `.env.local` file has been created. You need to get API keys:

#### **Email Service (Resend) - REQUIRED for form submissions**

1. Go to [resend.com](https://resend.com) and sign up (free tier: 100 emails/day)
2. Create an API key
3. Update `.env.local`:

```env
RESEND_API_KEY=re_your_actual_api_key_here
EMAIL_TO=ronaldharker@yahoo.com
EMAIL_FROM=noreply@harker-enterprises.com
```

#### **Google Analytics - OPTIONAL but recommended**

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property
3. Get your Measurement ID (starts with "G-")
4. Update `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### **SMS Notifications - OPTIONAL (Twilio)**

If you want SMS notifications when forms are submitted:

1. Sign up at [twilio.com](https://twilio.com)
2. Get your Account SID, Auth Token, and phone number
3. Update `.env.local`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
OWNER_PHONE_NUMBER=+13303012769
```

### Step 3: Update Site URL

In `.env.local`, change the site URL for production:

```env
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

### Step 4: Add Project Images

Replace placeholder images in the Gallery:

1. Add real project photos to `/public/images/projects/`
2. Update `src/components/Gallery.tsx` with your image paths

Example:
```typescript
const projects = [
  {
    id: 1,
    title: "Driveway Restoration - Smith Property",
    image: "/images/projects/driveway-before-after.jpg",
    description: "Complete restoration with proper grading"
  },
  // ... more projects
]
```

### Step 5: Add OpenGraph Image

Create a promotional image for social media sharing:

1. Create a 1200x630px image
2. Save as `/public/images/og-image.jpg`
3. Include your business name and phone number

---

## 🧪 Testing

### Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test:

- ✅ Form submission (check console for logs)
- ✅ Contact form with different urgency levels
- ✅ Mobile responsiveness
- ✅ Dark mode toggle
- ✅ All navigation links
- ✅ Chat widget functionality

### Test Email Sending

1. Fill out the booking form
2. Submit it
3. Check the email at `ronaldharker@yahoo.com`
4. Verify all information is correct

### Test Rate Limiting

1. Submit the form 3 times quickly
2. The 4th submission should show a rate limit error
3. Wait 1 minute and try again

---

## 🚀 Deployment

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (if using analytics)
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy!

Vercel will auto-deploy on every git push.

### Option 2: Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. Add environment variables in Netlify dashboard

### Option 3: Traditional Hosting

1. Build:
   ```bash
   npm run build
   npm run start
   ```

2. Use PM2 or similar to keep it running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "harker-enterprises" -- start
   ```

---

## 📝 Customization Guide

### Update Contact Information

Edit `src/constants/business.ts`:

```typescript
export const BUSINESS_INFO = {
  name: "Your Business Name",
  phone: "(555) 123-4567",
  phoneRaw: "+15551234567",
  email: "your@email.com",
  // ... etc
}
```

All components will automatically use the updated information.

### Add/Modify Services

Edit `src/constants/business.ts`:

```typescript
export const SERVICES = [
  {
    id: "your-service",
    title: "Your Service Name",
    description: "Service description",
    icon: "🚜",
    features: ["Feature 1", "Feature 2"],
    pricing: {
      basePrice: 100,
      // ... pricing info
    }
  },
  // ... more services
]
```

### Change Color Scheme

Edit `tailwind.config.js` and `src/app/globals.css` to customize colors.

Primary color is currently orange (`#ea580c`). To change:

1. Find/replace `orange-600` with your color
2. Update in CSS variables

---

## 🔧 Maintenance

### Regular Updates

```bash
# Update dependencies monthly
npm update

# Check for security issues
npm audit
npm audit fix
```

### Monitor Form Submissions

- Check Resend dashboard for email delivery status
- Monitor Google Analytics for user behavior
- Review form submissions regularly

### Backup

- Database: Not needed (stateless)
- Images: Backup `/public/images/` directory
- Code: Already on GitHub

---

## 🐛 Troubleshooting

### "Email not sending"

**Check:**
1. `RESEND_API_KEY` is set correctly in `.env.local`
2. Email service is not in development mode
3. Check Resend dashboard for errors
4. Verify email domain is configured

**Solution:**
- For development: Check console logs, emails are logged there
- For production: Verify environment variables in hosting platform

### "Form submission failed"

**Check:**
1. API route exists at `/api/contact/route.ts`
2. No TypeScript errors
3. Rate limiting isn't blocking you
4. Network connection is stable

**Solution:**
- Check browser console for errors
- Verify API endpoint is accessible
- Check server logs

### "Build errors"

**Common issues:**
- Missing dependencies: Run `npm install`
- TypeScript errors: Run `npm run build` to see all errors
- Import path issues: Verify `@/` alias works

**Solution:**
```bash
# Clean and rebuild
rm -rf .next
npm install
npm run build
```

### "Images not loading"

**Check:**
1. Images exist in `/public/images/` directory
2. Image paths are correct (start with `/`)
3. Image format is supported (jpg, png, webp)
4. File names match exactly (case-sensitive)

---

## 📊 Analytics & Monitoring

### Track Important Metrics

With Google Analytics enabled, you can track:

- Form submission rate
- Page views and bounce rate
- Phone/email click-through rate
- Most viewed services
- User geographic data
- Mobile vs desktop usage

### Custom Event Tracking

The site already tracks:
- `form_submission` - When quote form is submitted
- `service_inquiry` - Which service users are interested in
- `phone_click` - Phone number clicks
- `email_click` - Email address clicks

View these in Google Analytics → Events

---

## 🎯 Next Steps (Optional Enhancements)

1. **Customer Portal**: Add login for customers to track quotes
2. **Photo Gallery API**: Connect to Facebook API for automatic photo updates
3. **Booking Calendar**: Integrate with scheduling tool
4. **Live Chat**: Add Intercom or similar for real-time chat
5. **Payment Integration**: Add Stripe for deposits
6. **CRM Integration**: Connect to Salesforce/HubSpot
7. **Reviews Integration**: Pull Google Reviews automatically
8. **Blog**: Add content marketing section

---

## 📞 Support

If you need help with setup or customization:

1. Check this documentation first
2. Review Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
3. Check Resend docs: [resend.com/docs](https://resend.com/docs)

---

## ✨ Summary of Improvements

| Feature | Status | Impact |
|---------|--------|--------|
| Real form backend | ✅ Done | HIGH - Forms now actually work |
| Email notifications | ✅ Done | HIGH - Get notified of inquiries |
| SEO optimization | ✅ Done | HIGH - Better Google rankings |
| Analytics | ✅ Done | MEDIUM - Track user behavior |
| Rate limiting | ✅ Done | HIGH - Prevent spam |
| Loading states | ✅ Done | MEDIUM - Better UX |
| Error handling | ✅ Done | HIGH - Professional experience |
| Accessibility | ✅ Done | MEDIUM - ADA compliance |
| Mobile optimization | ✅ Done | HIGH - Most users are mobile |
| 404 page | ✅ Done | LOW - Professional polish |
| Structured data | ✅ Done | MEDIUM - Rich search results |

---

**Your business website is now production-ready and optimized! 🎉**

Just add your API keys, upload project photos, and deploy!
