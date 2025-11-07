// Business information constants
// Centralized source of truth for all business contact and service information

export const BUSINESS_INFO = {
  name: "Harker Enterprises",
  tagline: "Professional Gravel Driveway Restoration & Excavating",
  phone: "(330) 301-2769",
  phoneRaw: "+13303012769",
  email: "ronaldharker@yahoo.com",
  ownerName: "Ron",
  address: {
    street: "9900 New Rd",
    city: "North Jackson",
    state: "OH",
    zip: "44451",
    full: "9900 New Rd, North Jackson, OH 44451"
  },
  serviceArea: "North Jackson, OH and surrounding areas in Mahoning County",
  coordinates: {
    latitude: 41.0956,
    longitude: -80.8584
  },
  social: {
    facebook: "https://www.facebook.com/PrecisionDriveway/?ref=page_internal",
    facebookName: "Precision Driveway"
  },
  hours: {
    mondayToThursday: "3:00 PM - 8:00 PM",
    friday: "All Day",
    saturday: "All Day", 
    sunday: "All Day"
  },
  businessHours: {
    start: 9, // 9 AM
    end: 18   // 6 PM
  }
} as const

export const SERVICES = [
  {
    id: "gravel-driveway",
    title: "Gravel Driveway Restoration",
    shortTitle: "Gravel Driveway",
    description: "An alternative to buying new gravel. We expertly grade and restore your stone drive without adding additional gravel. A great way to save money.",
    icon: "🚜",
    features: [
      "Expert grading",
      "No additional gravel needed",
      "Cost-effective solution",
      "Professional restoration"
    ],
    pricing: {
      basePrice: 280,
      baseDistance: 200,
      additionalPricePerFoot: 0.80,
      unit: "feet"
    }
  },
  {
    id: "excavating",
    title: "Small Excavating Work",
    shortTitle: "Small Excavating",
    description: "Ditch cleanout, small culvert replacement, small ponds, and other small excavating jobs by request.",
    icon: "🏗️",
    features: [
      "Ditch cleanout",
      "Culvert replacement",
      "Small pond construction",
      "Custom excavating jobs"
    ],
    pricing: {
      type: "custom",
      description: "Free estimates based on project scope"
    }
  },
  {
    id: "brush-hogging",
    title: "Brush Hogging and Rototilling",
    shortTitle: "Brush Hogging",
    description: "We can brush hog with small trees up to one inch in diameter. Rototilling estimates upon request and season.",
    icon: "🌾",
    features: [
      "Small tree removal (up to 1\")",
      "Seasonal rototilling",
      "Land clearing",
      "Custom estimates available"
    ],
    pricing: {
      startingPrice: 100,
      unit: "acre",
      description: "Starting at $100 per acre"
    }
  }
] as const

export const SEO_KEYWORDS = [
  "gravel driveway restoration",
  "excavating North Jackson OH",
  "brush hogging Mahoning County",
  "rototilling services",
  "driveway repair Ohio",
  "small excavating work",
  "land clearing North Jackson",
  "driveway grading",
  "culvert replacement",
  "drainage solutions"
] as const

export const SITE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : "https://harker-enterprises.com"
