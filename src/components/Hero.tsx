'use client'

import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 dark:from-green-900 dark:via-green-800 dark:to-black text-white">
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            Harker Enterprises
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-green-200 transition-colors">Services</a>
              <a href="#gallery" className="hover:text-green-200 transition-colors">Gallery</a>
              <a href="#booking" className="hover:text-green-200 transition-colors">Book Now</a>
              <a href="#contact" className="hover:text-green-200 transition-colors">Contact</a>
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-green-900/90 dark:bg-green-950/90 backdrop-blur-sm rounded-lg p-4">
            <a href="#services" className="block py-2 hover:text-green-200">Services</a>
            <a href="#gallery" className="block py-2 hover:text-green-200">Gallery</a>
            <a href="#booking" className="block py-2 hover:text-green-200">Book Now</a>
            <a href="#contact" className="block py-2 hover:text-green-200">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Harker Enterprises
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100">
            Professional Gravel Driveway Restoration
          </p>
          <p className="text-lg md:text-xl mb-8 text-green-200">
            Small Excavating • Brush Hogging • Rototilling
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#booking" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Free Quote
            </a>
            <a 
              href="#gallery" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
    </section>
  )
}