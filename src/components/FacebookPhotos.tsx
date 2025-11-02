'use client'

import { useState, useEffect } from 'react'

interface FacebookPhoto {
  id: string
  picture: string
  source: string
  name?: string
  created_time: string
}

interface FacebookPhotosProps {
  pageId?: string
  accessToken?: string
  limit?: number
}

export default function FacebookPhotos({ 
  pageId = 'PrecisionDriveway', 
  accessToken = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ACCESS_TOKEN, 
  limit = 12 
}: FacebookPhotosProps) {
  const [photos, setPhotos] = useState<FacebookPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFacebookPhotos = async () => {
      if (!accessToken) {
        setError('Facebook access token required for photo integration')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://graph.facebook.com/v18.0/${pageId}/photos/uploaded?fields=id,picture,source,name,created_time&limit=${limit}&access_token=${accessToken}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch Facebook photos')
        }
        
        const data = await response.json()
        setPhotos(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load photos')
      } finally {
        setLoading(false)
      }
    }

    fetchFacebookPhotos()
  }, [pageId, accessToken, limit])

  if (!accessToken) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Facebook Integration Setup Required
        </h3>
        <p className="text-yellow-700 mb-4">
          To display photos directly from Facebook, you'll need to:
        </p>
        <ol className="list-decimal list-inside text-yellow-700 space-y-2 mb-4">
          <li>Create a Facebook App at <a href="https://developers.facebook.com" className="underline" target="_blank" rel="noopener noreferrer">developers.facebook.com</a></li>
          <li>Get a Page Access Token for your Facebook page</li>
          <li>Add the token to your environment variables</li>
          <li>Update the FacebookPhotos component with your token</li>
        </ol>
        <p className="text-sm text-yellow-600">
          For now, we recommend using the Facebook Page Plugin above or manually uploading photos.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Unable to Load Facebook Photos
        </h3>
        <p className="text-red-700 mb-4">{error}</p>
        <p className="text-sm text-red-600">
          Please check your Facebook API configuration or use the manual photo upload method.
        </p>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No photos found on the Facebook page.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={`https://www.facebook.com/photo.php?fbid=${photo.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-shadow"
        >
          <img
            src={photo.picture}
            alt={photo.name || 'Project photo'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          {photo.name && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-white text-sm font-medium truncate">
                {photo.name}
              </p>
            </div>
          )}
        </a>
      ))}
    </div>
  )
}