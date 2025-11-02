'use client'

import { useState } from 'react'

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    propertySize: '',
    drivewayLength: '',
    description: '',
    preferredDate: '',
    urgency: 'normal'
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  // Calculate gravel driveway restoration pricing
  const calculateGravelPrice = (length: number): number => {
    if (length <= 200) {
      return 280
    } else {
      const extraFeet = length - 200
      return 280 + (extraFeet * 0.80)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        propertySize: '',
        drivewayLength: '',
        description: '',
        preferredDate: '',
        urgency: 'normal'
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedFormData = {
      ...formData,
      [name]: value
    }
    setFormData(updatedFormData)

    // Calculate pricing for gravel driveway restoration
    if (updatedFormData.service === 'gravel-driveway' && updatedFormData.drivewayLength) {
      const length = parseFloat(updatedFormData.drivewayLength)
      if (!isNaN(length) && length > 0) {
        setEstimatedPrice(calculateGravelPrice(length))
      } else {
        setEstimatedPrice(null)
      }
    } else {
      setEstimatedPrice(null)
    }
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-green-50 dark:bg-green-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              We've received your request and will contact you within 24 hours to discuss your project and schedule a free consultation.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              For urgent requests, please call us directly at (330) 301-2769
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 bg-green-50 dark:bg-green-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to transform your property? Fill out the form below and we'll provide 
            a free, no-obligation quote for your project.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Service Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Needed *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="gravel-driveway">Gravel Driveway Restoration</option>
                  <option value="excavating">Small Excavating Work</option>
                  <option value="brush-hogging">Brush Hogging and Rototilling</option>
                  <option value="multiple">Multiple Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property/Project Size
                </label>
                <select
                  id="propertySize"
                  name="propertySize"
                  value={formData.propertySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="">Select size</option>
                  <option value="small">Small (Under 1 acre)</option>
                  <option value="medium">Medium (1-5 acres)</option>
                  <option value="large">Large (5+ acres)</option>
                  <option value="commercial">Commercial Property</option>
                </select>
              </div>
            </div>

            {/* Driveway Length Input - Only show for gravel driveway restoration */}
            {formData.service === 'gravel-driveway' && (
              <div className="mb-6">
                <label htmlFor="drivewayLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Driveway Length (feet) *
                </label>
                <input
                  type="number"
                  id="drivewayLength"
                  name="drivewayLength"
                  required={formData.service === 'gravel-driveway'}
                  value={formData.drivewayLength}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Enter driveway length in feet"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Measure from the street to the end of your driveway
                </p>
              </div>
            )}

            {/* Price Estimate Display */}
            {estimatedPrice !== null && formData.service === 'gravel-driveway' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  Estimated Price
                </h4>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${estimatedPrice.toFixed(2)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Pricing: $280 for first 200 feet, then $0.80 per additional foot
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  *This is an estimate. Final pricing may vary based on site conditions.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Please describe your project, current conditions, and what you'd like to accomplish..."
              />
            </div>

            {/* Scheduling Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Urgency
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="normal">Normal (2-4 weeks)</option>
                  <option value="soon">Soon (1-2 weeks)</option>
                  <option value="urgent">Urgent (Within 1 week)</option>
                  <option value="emergency">Emergency (ASAP)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Get My Free Quote
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                We'll respond within 24 hours with your customized quote
              </p>
            </div>
          </form>
        </div>

        {/* Contact Alternative */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Prefer to talk directly?</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="tel:3303012769" 
              className="flex items-center text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (330) 301-2769
            </a>
            
            <span className="text-gray-400 dark:text-gray-500">•</span>
            
            <a 
              href="https://www.facebook.com/PrecisionDriveway/?ref=page_internal" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Precision Driveway on Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}