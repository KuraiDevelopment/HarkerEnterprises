import Link from 'next/link'
import { BUSINESS_INFO } from '@/constants/business'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <div className="text-6xl mb-6">🚜</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Looks Like We Hit a Pothole!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            The page you're looking for doesn't exist. Maybe it was moved, or perhaps it never existed at all.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Let's Get You Back on Track
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              🏠 Back to Home
            </Link>
            <Link 
              href="/#services"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              🚜 View Services
            </Link>
            <Link 
              href="/#booking"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📋 Get a Quote
            </Link>
            <a 
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📞 Call Us Now
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-gray-300">
          <p className="mb-2">Need immediate assistance?</p>
          <p className="text-xl font-semibold text-white">
            Call {BUSINESS_INFO.phone}
          </p>
          <p className="text-sm mt-4">
            <Link href="/" className="text-orange-400 hover:text-orange-300 underline">
              Return to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
