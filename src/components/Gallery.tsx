'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({})

  // Sample project images - in a real application, these would come from your database
  const projects = [
    {
      id: 1,
      title: "Gravel Driveway Restoration - Johnson Property",
      image: "/images/projects/driveway-restoration-1.jpg",
      description: "Complete driveway restoration with proper grading and fresh gravel application."
    },
    {
      id: 2,
      title: "Small Excavation - Basement Foundation",
      image: "/api/placeholder/600/400", 
      description: "Precision excavation for new basement foundation with proper drainage."
    },
    {
      id: 3,
      title: "Brush Hogging - 5 Acre Property",
      image: "/api/placeholder/600/400",
      description: "Land clearing and maintenance for large residential property."
    },
    {
      id: 4,
      title: "Garden Rototilling - Smith Farm",
      image: "/api/placeholder/600/400",
      description: "Soil preparation for new vegetable garden installation."
    },
    {
      id: 5,
      title: "Access Road Creation",
      image: "/api/placeholder/600/400",
      description: "New access road construction with proper base and gravel surface."
    },
    {
      id: 6,
      title: "Drainage System Installation", 
      image: "/api/placeholder/600/400",
      description: "Complete drainage solution to prevent water damage to property."
    }
  ]

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [projects.length])

  // Reset image errors when current image changes
  useEffect(() => {
    if (imageErrors[currentImage]) {
      setImageErrors(prev => ({ ...prev, [currentImage]: false }))
    }
  }, [currentImage, imageErrors])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % projects.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  const isImageValid = (index: number) => {
    return projects[index].image.startsWith('/images/') && !imageErrors[index]
  }

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Completed Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Take a look at some of our recent work. We're proud of the quality results 
            we deliver for our clients across all our service areas.
          </p>
        </div>

        {/* Main Gallery Display */}
        <div className="relative mb-12">
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            {isImageValid(currentImage) ? (
              <Image
                key={`main-${currentImage}-${projects[currentImage].image}`}
                src={projects[currentImage].image}
                alt={projects[currentImage].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={currentImage === 0}
                onError={() => handleImageError(currentImage)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-2xl font-bold mb-2">{projects[currentImage].title}</h3>
                  <p className="text-gray-100 max-w-md mx-auto">
                    {projects[currentImage].description}
                  </p>
                </div>
              </div>
            )}

            {/* Image overlay with project info - only show on actual images */}
            {isImageValid(currentImage) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                  {projects[currentImage].title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base">
                  {projects[currentImage].description}
                </p>
              </div>
            )}

            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-800 dark:text-white rounded-full p-3 shadow-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-800 dark:text-white rounded-full p-3 shadow-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImage + 1} / {projects.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-2 mb-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Project Grid Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setCurrentImage(index)}
              className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImage 
                  ? 'border-blue-600 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400'
              }`}
            >
              {isImageValid(index) ? (
                <Image
                  key={`thumb-${index}-${project.image}`}
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <span className="text-white text-2xl">📸</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to start your project? Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#booking" 
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Your Free Quote
            </a>
            <a 
              href="https://www.facebook.com/PrecisionDriveway/?ref=page_internal" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              View More on Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}