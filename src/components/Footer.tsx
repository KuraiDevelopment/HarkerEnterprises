export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Harker Enterprises</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-md">
              Professional gravel driveway restoration, excavating, brush hogging, and rototilling services. 
              Serving the local community with quality work and reliable service.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/PrecisionDriveway/?ref=page_internal" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li><a href="#services" className="hover:text-white dark:hover:text-gray-300 transition-colors">Gravel Driveway Restoration</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-gray-300 transition-colors">Small Excavating</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-gray-300 transition-colors">Brush Hogging</a></li>
              <li><a href="#services" className="hover:text-white dark:hover:text-gray-300 transition-colors">Rototilling</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300 dark:text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:3303012769" className="hover:text-white transition-colors">
                  (330) 301-2769
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ronaldharker@yahoo.com" className="hover:text-white transition-colors">
                  ronaldharker@yahoo.com
                </a>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>9900 New Rd<br />North Jackson, OH 44451</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Area & Hours */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">Service Area</h4>
              <p className="text-gray-300">
                Serving North Jackson, OH and surrounding areas in Mahoning County. 
                Contact us to confirm service availability in your location.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Business Hours</h4>
              <div className="text-gray-300 space-y-1">
                <div>Monday - Thursday: 3:00 PM - 8:00 PM</div>
                <div>Friday: All Day</div>
                <div>Saturday: 8:00 AM - 8:00 PM</div>
                <div>Sunday: All Day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Harker Enterprises. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Licensed & Insured • Free Estimates • Quality Guaranteed
          </p>
        </div>
      </div>
    </footer>
  )
}