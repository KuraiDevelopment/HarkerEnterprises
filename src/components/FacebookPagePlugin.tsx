'use client'

import { useEffect, useState } from 'react'

interface FacebookPagePluginProps {
  href: string
  width?: number
  height?: number
  tabs?: string
  hideCover?: boolean
  showFacepile?: boolean
  smallHeader?: boolean
  adaptContainerWidth?: boolean
}

export default function FacebookPagePlugin({
  href,
  width = 800,
  height = 800,
  tabs = 'timeline',
  hideCover = false,
  showFacepile = true,
  smallHeader = false,
  adaptContainerWidth = true
}: FacebookPagePluginProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything on server side
  if (!isClient) {
    return (
      <div className="flex justify-center items-center" style={{ width, height: height / 2 }}>
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full flex items-center justify-center">
          <div className="text-gray-500">Loading Facebook content...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div 
        className="fb-page" 
        data-href={href}
        data-tabs={tabs}
        data-width={width.toString()}
        data-height={height.toString()}
        data-small-header={smallHeader.toString()}
        data-adapt-container-width={adaptContainerWidth.toString()}
        data-hide-cover={hideCover.toString()}
        data-show-facepile={showFacepile.toString()}
      >
        <blockquote cite={href} className="fb-xfbml-parse-ignore">
          <a href={href}>Harker Enterprises LLC</a>
        </blockquote>
      </div>
    </div>
  )
}