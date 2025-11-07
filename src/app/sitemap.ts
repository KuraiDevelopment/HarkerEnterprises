import { MetadataRoute } from 'next'
import { SITE_URL, SERVICES } from '@/constants/business'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ]

  // Service pages (if you add individual service pages later)
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}#${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
