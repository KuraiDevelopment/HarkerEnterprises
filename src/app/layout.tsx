import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeProviderWrapper from "@/components/ThemeProvider"
import ChatWidget from "@/components/ChatWidget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harker Enterprises - Gravel Driveway Restoration & Excavating | North Jackson, OH",
  description: "Professional gravel driveway restoration, small excavating services, brush hogging, and rototilling in North Jackson, OH and surrounding areas. Call (330) 301-2769 for free estimates.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          {children}
          <ChatWidget />
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}