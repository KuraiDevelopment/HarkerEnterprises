export default function Services() {
  const services = [
    {
      title: "Gravel Driveway Restoration",
      description: "An alternative to buying new gravel. We expertly grade and restore your stone drive without adding additional gravel. A great way to save money.",
      icon: "🚜",
      features: ["Expert grading", "No additional gravel needed", "Cost-effective solution", "Professional restoration"]
    },
    {
      title: "Small Excavating Work",
      description: "Ditch cleanout, small culvert replacement, small ponds, and other small excavating jobs by request.",
      icon: "🏗️",
      features: ["Ditch cleanout", "Culvert replacement", "Small pond construction", "Custom excavating jobs"]
    },
    {
      title: "Brush Hogging and Rototilling",
      description: "We can brush hog with small trees up to one inch in diameter. Rototilling estimates upon request and season.",
      icon: "🌾",
      features: ["Small tree removal (up to 1\")", "Seasonal rototilling", "Land clearing", "Custom estimates available"]
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional outdoor services backed by years of experience and modern equipment. 
            We take pride in delivering quality results that last.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a 
            href="#booking" 
            className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Request Service Quote
          </a>
        </div>
      </div>
    </section>
  )
}