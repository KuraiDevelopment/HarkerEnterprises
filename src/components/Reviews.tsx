'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
  service: string
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Outstanding work on our gravel driveway! Ron and his team were professional, punctual, and the results exceeded our expectations. Our driveway looks brand new and drains perfectly.",
    date: "2024-10-15",
    service: "Gravel Driveway Restoration"
  },
  {
    id: 2,
    name: "Mike Thompson",
    rating: 5,
    comment: "Harker Enterprises did an amazing job with our excavating project. They cleared our lot quickly and efficiently. Ron was great to work with and very reasonably priced.",
    date: "2024-10-08",
    service: "Small Excavating"
  },
  {
    id: 3,
    name: "Linda Davis",
    rating: 5,
    comment: "Perfect brush hogging service! They cleared our overgrown property beautifully. The team was courteous and cleaned up everything afterwards. Highly recommend!",
    date: "2024-09-28",
    service: "Brush Hogging"
  },
  {
    id: 4,
    name: "John Miller",
    rating: 5,
    comment: "Excellent rototilling work for our garden area. The soil preparation was thorough and professional. Our garden has never looked better. Will definitely use again!",
    date: "2024-09-20",
    service: "Rototilling"
  },
  {
    id: 5,
    name: "Amy Wilson",
    rating: 5,
    comment: "Ron went above and beyond with our driveway restoration. Fair pricing, quality work, and excellent communication throughout the project. Couldn't be happier!",
    date: "2024-09-12",
    service: "Gravel Driveway Restoration"
  }
]

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    service: 'Gravel Driveway Restoration'
  })

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || reviews.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change review every 5 seconds
    
    return () => clearInterval(interval)
  }, [reviews.length, isAutoScrolling])

  // Manual navigation
  const goToPrevious = () => {
    setIsAutoScrolling(false)
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1)
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

  const goToNext = () => {
    setIsAutoScrolling(false)
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1)
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

  const goToSlide = (index: number) => {
    setIsAutoScrolling(false)
    setCurrentIndex(index)
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new review
    const newReview: Review = {
      id: reviews.length + 1,
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment,
      service: formData.service,
      date: new Date().toISOString().split('T')[0]
    }
    
    // Add to reviews array
    setReviews(prev => [newReview, ...prev])
    
    // Reset form
    setFormData({
      name: '',
      rating: 5,
      comment: '',
      service: 'Gravel Driveway Restoration'
    })
    
    // Hide form
    setShowForm(false)
    
    // Show the new review
    setCurrentIndex(0)
    setIsAutoScrolling(false)
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    )
  }

  if (reviews.length === 0) return null

  return (
    <section id="reviews" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real testimonials from satisfied customers who have experienced our quality workmanship
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto mb-8">
          {/* Current Review */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 min-h-[300px] transition-colors duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Rating */}
              <div className="mb-4">
                {renderStars(reviews[currentIndex].rating)}
              </div>
              
              {/* Comment */}
              <blockquote className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "{reviews[currentIndex].comment}"
              </blockquote>
              
              {/* Customer Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {reviews[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {reviews[currentIndex].service} • {new Date(reviews[currentIndex].date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
            aria-label="Previous review"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
            aria-label="Next review"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-orange-600 scale-110'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Add Review Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            {showForm ? 'Cancel' : 'Leave a Review'}
          </button>
        </div>

        {/* Review Submission Form */}
        {showForm && (
          <div className="mt-12 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Share Your Experience
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Used
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  <option value="Gravel Driveway Restoration">Gravel Driveway Restoration</option>
                  <option value="Small Excavating">Small Excavating</option>
                  <option value="Brush Hogging">Brush Hogging</option>
                  <option value="Rototilling">Rototilling</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                {renderStars(formData.rating, true, (rating) => 
                  setFormData(prev => ({ ...prev, rating }))
                )}
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  placeholder="Tell us about your experience with our service..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}