'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    FB: any
    fbAsyncInit: () => void
  }
}

export default function FacebookSDK() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Create fb-root div if it doesn't exist
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.appendChild(fbRoot)
    }

    // Load Facebook SDK
    window.fbAsyncInit = function() {
      if (window.FB) {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        })
      }
    }

    // Load the SDK asynchronously
    if (!document.getElementById('facebook-jssdk')) {
      const js = document.createElement('script')
      js.id = 'facebook-jssdk'
      js.async = true
      js.defer = true
      js.crossOrigin = 'anonymous'
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0'
      
      const firstScript = document.getElementsByTagName('script')[0]
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(js, firstScript)
      }
    }

    // Parse any existing Facebook elements
    if (window.FB && window.FB.XFBML) {
      window.FB.XFBML.parse()
    }
  }, [])

  return null // This component doesn't render anything visible
}