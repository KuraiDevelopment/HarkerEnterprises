'use client'

import { useState, useEffect, useRef } from 'react'
import { XMarkIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { createMessageForwarder } from '@/utils/messageForwarder'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatWidgetProps {
  businessName?: string
  ownerName?: string
  phone?: string
  email?: string
}

export default function ChatWidget({ 
  businessName = "Harker Enterprises",
  ownerName = "Ron",
  phone = "(330) 301-2769",
  email = "ronaldharker@yahoo.com"
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [customerName, setCustomerName] = useState('')
  // Forwarding controls
  const [hasForwarded, setHasForwarded] = useState(false)
  const [lastForwardedAt, setLastForwardedAt] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageForwarder = createMessageForwarder()

  // Business hours (9 AM to 6 PM EST)
  const isBusinessHours = () => {
    const now = new Date()
    const hour = now.getHours()
    return hour >= 9 && hour < 18
  }

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 1,
      text: `Hi! I'm the ${businessName} AI assistant. I'm here to help you with questions about our gravel driveway restoration, excavating, brush hogging, and rototilling services. How can I assist you today?`,
      isBot: true,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [businessName])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // AI Response Logic with selective forwarding triggers
  const generateResponse = (userMessage: string): { response: string, shouldForward: boolean } => {
    const message = userMessage.toLowerCase()
    const hasAny = (terms: (string|RegExp)[]) => terms.some(t => typeof t === 'string' ? message.includes(t) : !!message.match(t))

    // Keyword sets (with common misspellings/synonyms)
    const pricingTerms = ['price','pricing','cost','quote','estimate','how much']
    const drivewayTerms = ['driveway','gravel','stone','regrade','re-grade','regrading','restoration']
    const excavatingTerms = ['excavat','excavating','dig','dug','trench','culvert','drain','drainage','ditch','footer','footers','foundation','pipe','conduit']
    const brushTerms = ['brush','brushhog','brush hog','bush hog','field mow','mowing','land clearing','overgrowth','overgrown','weeds']
    const rototillTerms = ['rototill','till','tilling','garden','soil prep','bed prep']
    const contactTerms = ['contact','reach','call','phone','text','email']
    const scheduleTerms = ['schedule','appointment','book','quote visit','onsite','on-site']
    
    // Extract customer name if provided
    if (!customerName && (message.includes('my name is') || message.includes("i'm ") || message.includes('this is '))) {
      const nameMatch = message.match(/(?:my name is|i'm|this is)\s+([a-zA-Z\s]+)/i)
      if (nameMatch) {
        setCustomerName(nameMatch[1].trim())
      }
    }

    // Phone number provided - ALWAYS forward
  if (message.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/) || message.includes('call me') || message.includes('my number')) {
      return {
        response: `Perfect! I've got your contact information and I'm forwarding your message to ${ownerName} right now. He'll reach out to you ${isBusinessHours() ? 'very soon' : 'first thing tomorrow morning'}. Thank you for choosing ${businessName}!`,
        shouldForward: true
      }
    }

    // Urgent requests - ALWAYS forward
    if (message.includes('emergency') || message.includes('urgent') || message.includes('asap')) {
      return {
        response: `I understand this is urgent! I'm immediately forwarding your message to ${ownerName} at ${phone}. For emergency situations, please also call him directly. He's very responsive to urgent customer needs and will do his best to accommodate your situation.`,
        shouldForward: true
      }
    }

    // Specific scheduling requests with details - forward
  if (hasAny(scheduleTerms) && hasAny(['when','time','today','tomorrow','week','morning','afternoon','evening'])) {
      const hours = isBusinessHours() ? 'available now' : 'will respond first thing tomorrow'
      return {
        response: `Great! ${ownerName} is ${hours}. I'm forwarding your scheduling request to him right now. You can also reach him directly at ${phone} or email ${email}. He'll coordinate the best time that works for both of you.`,
        shouldForward: true
      }
    }

    // Customer provides concrete project details (measurements) - calculate if possible, then forward
    // Examples: "300 ft", "1.5 acres", "20x30", "200 feet", "5,000 sq ft"
    const measurementMatch = message.match(/\b(\d+(?:\.\d+)?)\s*[\s,\-]?(feet|ft|foot)\b/i)
    const acresMatch = message.match(/\b(\d+(?:\.\d+)?)\s*[\s,\-]?acres?\b/i)
    
    if (measurementMatch && hasAny(drivewayTerms)) {
      // Driveway calculation with measurements
      const length = parseFloat(measurementMatch[1])
      let cost = 280 // Base cost for first 200 ft
      if (length > 200) {
        cost += (length - 200) * 0.80
      }
      return {
        response: `Perfect! For a ${length}-foot driveway restoration:\n\n💰 **Estimated Cost: $${cost.toFixed(2)}**\n\nThis includes:\n• Complete grading and leveling\n• Proper drainage solutions\n• Fresh gravel application\n• Professional finishing\n\nI'm forwarding this to ${ownerName} so he can confirm and schedule your project. Would you like to provide any additional details about your driveway condition?`,
        shouldForward: true
      }
    }
    
    if (acresMatch && hasAny(brushTerms)) {
      // Brush hogging calculation with acres
      const acres = parseFloat(acresMatch[1])
      const baseCost = acres * 100
      return {
        response: `Great! For approximately ${acres} acre${acres !== 1 ? 's' : ''} of brush hogging:\n\n💰 **Starting Estimate: $${baseCost.toFixed(2)}**\n\nFinal price depends on:\n• Vegetation density\n• Terrain and slope\n• Accessibility\n\nI'm forwarding this to ${ownerName} for a more precise quote based on your specific conditions. Can you describe the vegetation and terrain?`,
        shouldForward: true
      }
    }
    
    if (
      message.match(/\b\d{2,}[\s,\-]?(feet|ft|foot|yards?|yds?|acres?|acre|sq\s*ft|square\s*feet|"|')\b/i) ||
      message.match(/\b\d{1,3}\s*x\s*\d{1,3}\b/i)
    ) {
      return {
        response: `Thank you for providing those details! That helps ${ownerName} give you the most accurate estimate and service. I'm forwarding your specific requirements to him now so he can provide personalized assistance.`,
        shouldForward: true
      }
    }

    // Direct requests to talk to owner - forward
  if (hasAny(['talk to','speak with','connect me','have him call','have ron call','have owner call'])) {
      return {
        response: `Absolutely! I'm connecting you with ${ownerName} right now. He'll reach out to you ${isBusinessHours() ? 'very soon' : 'first thing tomorrow'}. You can also call him directly at ${phone} if you'd prefer immediate contact.`,
        shouldForward: true
      }
    }

    // General pricing inquiries - provide clear standard pricing per service (no forwarding)
    if (hasAny(pricingTerms)) {
      if (hasAny(drivewayTerms)) {
        return {
          response: `Gravel Driveway Restoration pricing:\n• $280 for the first 200 feet\n• $0.80 per foot after 200 feet\n\nThis includes proper grading and a professional finish. If you share your driveway length, I can calculate an estimate for you now.`,
          shouldForward: false
        }
      }
      if (hasAny(brushTerms)) {
        return {
          response: `Brush Hogging pricing:\n• Starting at $100 per acre\n\nFinal price depends on vegetation density, terrain/slope, and accessibility. If you tell me approximately how many acres and the conditions, I can narrow it down.`,
          shouldForward: false
        }
      }
      if (hasAny(excavatingTerms)) {
        return {
          response: `Small Excavating pricing:\n• Custom per project (free estimates)\n\nPricing depends on scope (depth/length), material, and site access. Share a few details and I can have ${ownerName} provide a quick estimate.`,
          shouldForward: false
        }
      }
      if (hasAny(rototillTerms)) {
        return {
          response: `Rototilling pricing:\n• Contact for pricing (usually based on area size and soil conditions)\n\nIf you share approximate dimensions, I can estimate the range.`,
          shouldForward: false
        }
      }
      // Generic pricing question without service specified
      return {
        response: `Here are our standard pricing guidelines:\n\n• Gravel Driveway Restoration: $280 for the first 200 ft, then $0.80/ft after\n• Brush Hogging: starting at $100 per acre (varies by vegetation, slope, access)\n• Small Excavating: custom per job with free estimates\n• Rototilling: contact for pricing (based on area and soil)\n\nTell me which service you need and any sizes/measurements you know, and I can get you a more accurate estimate.`,
        shouldForward: false
      }
    }

    // Service inquiries - provide info, don't forward
    if (hasAny(['service','services','what do you do','what services'])) {
      return {
        response: `We specialize in four main services:\n\n🚜 **Gravel Driveway Restoration** - Complete restoration with proper grading\n🏗️ **Small Excavating** - Foundations, drainage, site preparation\n🌾 **Brush Hogging** - Land clearing and maintenance\n🌱 **Rototilling** - Soil preparation for gardens and landscaping\n\nWhich service interests you most?`,
        shouldForward: false
      }
    }

    // General contact requests - provide info but don't auto-forward
    if (hasAny(contactTerms)) {
      const hours = isBusinessHours() ? 'available now' : 'will respond first thing tomorrow'
      return {
        response: `${ownerName} is ${hours}. You can reach him directly at ${phone} or email ${email}. If you'd like him to contact you instead, just provide your phone number and I'll make sure he gets your message!`,
        shouldForward: false
      }
    }

    // Location inquiries
    if (hasAny(['location','area','where','service area','do you travel'])) {
      return {
        response: `We're located in North Jackson, OH and serve the surrounding areas. ${ownerName} travels throughout the region for projects. We'd be happy to discuss your location and provide service. Where is your project located?`,
        shouldForward: false
      }
    }

    // Business hours
    if (hasAny(['hours','open','when are you open','time','availability'])) {
      const currentStatus = isBusinessHours() ? 'We\'re currently available!' : 'We\'re currently closed but will respond first thing tomorrow.'
      return {
        response: `Our business hours are 9 AM to 6 PM, Monday through Saturday. ${currentStatus} ${ownerName} is always happy to discuss your project needs.`,
        shouldForward: false
      }
    }

    // Service-specific responses (don't auto-forward basic info)
    if (hasAny(drivewayTerms)) {
      return {
        response: `Our driveway restoration service includes:\n• Complete grading and leveling\n• Proper drainage solutions\n• Fresh gravel application\n• Professional finishing\n\nWe've been restoring driveways in the North Jackson, OH area with excellent results. Would you like to schedule a free consultation?`,
        shouldForward: false
      }
    }

    if (hasAny([...excavatingTerms,'foundation'])) {
      return {
        response: `Our small excavating services include:\n• Basement foundations\n• Drainage systems\n• Site preparation\n• Access road creation\n\nWe use professional equipment for precise, clean work. What type of excavation project do you have in mind?`,
        shouldForward: false
      }
    }

    if (hasAny([...brushTerms,'clearing','land'])) {
      return {
        response: `Our brush hogging service is perfect for:\n• Overgrown property clearing\n• Land maintenance\n• Fire prevention\n• Property beautification\n\nWe can handle properties of various sizes efficiently. How many acres are you looking to clear?`,
        shouldForward: false
      }
    }

    if (hasAny([...rototillTerms,'soil'])) {
      return {
        response: `Our rototilling service prepares your soil for:\n• Vegetable gardens\n• Flower beds\n• New lawn installation\n• Landscaping projects\n\nWe ensure proper soil preparation for successful growing. What size area needs rototilling?`,
        shouldForward: false
      }
    }

    // Default response - helpful but don't forward general questions
    return {
      response: `I want to make sure I help with the right info. Are you asking about one of these?\n\n• Driveway restoration pricing or details\n• Brush hogging (price starts at $100/acre)\n• Small excavating (drainage, digging, trenches)\n• Rototilling (garden/soil prep)\n\nYou can reply with the service name (e.g., "driveway pricing" or "brush hogging"). If you share sizes (like feet or acres), I can estimate right away.`,
      shouldForward: false
    }
  }

  // Send message function with forwarding
  const sendMessage = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(async () => {
      const { response, shouldForward } = generateResponse(userMessage.text)
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)

      // Forward message to owner if conditions are met (with rate limiting)
      if (shouldForward) {
        const lower = userMessage.text.toLowerCase()
        const hasPhone = !!lower.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/) || lower.includes('call me') || lower.includes('my number')
        const isUrgent = lower.includes('emergency') || lower.includes('urgent') || lower.includes('asap')
        const canRateLimit = !(hasPhone || isUrgent)

        // Only forward if not rate-limited or if it's an always-forward case
        const now = Date.now()
        const withinCooldown = lastForwardedAt ? (now - lastForwardedAt) < 2 * 60 * 1000 : false
        if (!canRateLimit || (!hasForwarded && !withinCooldown)) {
        const chatHistory = [...messages, userMessage, botResponse].map(msg => 
          `${msg.isBot ? 'AI Assistant' : (customerName || 'Customer')}: ${msg.text}`
        )
        
        try {
          const result = await messageForwarder.forwardInquiry(userMessage.text, chatHistory)
          console.log('Message forwarding result:', result)
          
          // Optionally show forwarding confirmation
          if (result.sms || result.email) {
            setTimeout(() => {
              const confirmationMessage: Message = {
                id: Date.now() + 2,
                text: `✅ I've successfully forwarded your message to ${ownerName}. He'll get back to you ${isBusinessHours() ? 'very soon' : 'first thing tomorrow'}!`,
                isBot: true,
                timestamp: new Date()
              }
              setMessages(prev => [...prev, confirmationMessage])
            }, 1500)
          }
          // Mark as forwarded and start cooldown
          setHasForwarded(true)
          setLastForwardedAt(now)
        } catch (error) {
          console.error('Failed to forward message:', error)
        }
        }
      }

      // If chat is closed, show notification
      if (!isOpen) {
        setHasNewMessage(true)
      }
    }, 1000 + Math.random() * 1500) // Random delay for realism
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Open chat
  const openChat = () => {
    setIsOpen(true)
    setHasNewMessage(false)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={openChat}
        className={`fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
        {hasNewMessage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-80 sm:w-96 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold">{businessName}</h3>
                <p className="text-sm text-orange-100">We'll reply as soon as we can</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-orange-100 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                      : 'bg-orange-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500 dark:text-gray-400' : 'text-orange-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}