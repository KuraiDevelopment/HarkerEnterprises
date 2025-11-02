# Harker Enterprises Website

A modern, professional business website for Harker Enterprises - a gravel driveway restoration and excavating services company.

## Features

- **Modern Design**: Clean, professional layout with responsive design
- **Service Showcase**: Detailed information about all services offered
- **Project Gallery**: Rotating gallery of completed projects with auto-rotation
- **Booking System**: Comprehensive quote request form with client information
- **Mobile Responsive**: Optimized for all device sizes
- **Facebook Integration**: Links to social media presence
- **Contact Information**: Multiple ways for clients to get in touch

## Services Featured

1. **Gravel Driveway Restoration**
   - Professional restoration with proper grading
   - Fresh gravel application and compaction
   - Drainage solutions

2. **Small Excavating Services**
   - Site preparation and foundation work
   - Drainage system installation
   - Landscaping preparation

3. **Brush Hogging**
   - Land clearing and maintenance
   - Property maintenance for large areas
   - Access road creation

4. **Rototilling**
   - Soil preparation for gardens and lawns
   - Agricultural applications
   - Seed bed preparation

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel, Netlify, or similar platforms

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main homepage
│   └── globals.css       # Global styles
└── components/
    ├── Hero.tsx          # Hero section with navigation
    ├── Services.tsx      # Services showcase
    ├── Gallery.tsx       # Project gallery with rotation
    ├── BookingSection.tsx # Quote request form
    └── Footer.tsx        # Footer with contact info
```

## Customization

### Adding Real Project Images

You have several options for displaying your completed work:

#### Option 1: Facebook Page Plugin (Currently Active)
The website now includes a Facebook Page Plugin that shows your latest posts directly from your Precision Driveway Facebook page. This is automatically active and requires no setup.

#### Option 2: Direct Facebook API Integration
For more control over photo display, you can set up direct Facebook API integration:

1. **Create a Facebook App**:
   - Go to [Facebook for Developers](https://developers.facebook.com)
   - Create a new app for your business
   - Add the "Pages" product to your app

2. **Get a Page Access Token**:
   - In your Facebook App dashboard, go to Tools & Support > Graph API Explorer
   - Select your app and your Precision Driveway page
   - Generate a Page Access Token with `pages_read_engagement` permission

3. **Configure Environment Variables**:
   ```bash
   # Create a .env.local file
   cp .env.example .env.local
   
   # Add your token to .env.local
   NEXT_PUBLIC_FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token_here
   ```

4. **Restart Development Server**:
   ```bash
   npm run dev
   ```

#### Option 3: Manual Photo Upload
Replace the placeholder images in the Gallery component:

1. Add your project images to the `public/` directory
2. Update the `projects` array in `src/components/Gallery.tsx`
3. Replace placeholder image paths with your actual image paths

### Updating Contact Information

Update contact details in:
- `src/components/BookingSection.tsx` (phone numbers, Facebook links)
- `src/components/Footer.tsx` (all contact information)

### Modifying Services

Edit the services array in `src/components/Services.tsx` to match your specific offerings.

### Form Handling

The booking form currently logs submissions to console. To make it functional:

1. Set up a backend API endpoint
2. Update the `handleSubmit` function in `BookingSection.tsx`
3. Consider using services like Formspree, Netlify Forms, or a custom backend

## Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` directory to Netlify

### Traditional Hosting

1. Run `npm run build` to create production build
2. Upload the built files to your hosting provider

## SEO Optimization

The site includes:
- Proper meta tags and descriptions
- Semantic HTML structure
- Fast loading times with Next.js optimization
- Mobile-responsive design
- Accessibility considerations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is created for Harker Enterprises. All rights reserved.

## Support

For technical support or modifications, contact your web developer.

---

**Harker Enterprises** - Professional Gravel Driveway Restoration & Excavating Services