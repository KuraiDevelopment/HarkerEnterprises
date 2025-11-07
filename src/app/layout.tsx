import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeProviderWrapper from "@/components/ThemeProvider"
import ChatWidget from "@/components/ChatWidget"
import StructuredData from "@/components/StructuredData"
import Analytics from "@/components/Analytics"
import { BUSINESS_INFO, SEO_KEYWORDS, SITE_URL } from "@/constants/business"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline} | ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}`,
    template: `%s | ${BUSINESS_INFO.name}`
  },
  description: `Professional gravel driveway restoration, small excavating services, brush hogging, and rototilling in ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} and surrounding areas. Call ${BUSINESS_INFO.phone} for free estimates.`,
  keywords: SEO_KEYWORDS,
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BUSINESS_INFO.name,
    title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
    description: `Professional gravel driveway restoration, excavating, brush hogging, and rototilling in ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}. Free estimates available.`,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${BUSINESS_INFO.name} - Professional Outdoor Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
    description: `Professional outdoor services in ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}. Call ${BUSINESS_INFO.phone} for free estimates.`,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          {/* Skip to main content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          
          <main id="main-content">
            {children}
          </main>
          
          <ChatWidget />
          <Analytics />
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}