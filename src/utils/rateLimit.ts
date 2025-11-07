// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  maxRequests?: number  // Max requests per window
  windowMs?: number     // Time window in milliseconds
}

export function rateLimit(identifier: string, config: RateLimitConfig = {}): {
  success: boolean
  remaining: number
  resetTime: number
} {
  const maxRequests = config.maxRequests || parseInt(process.env.RATE_LIMIT_REQUESTS || '5')
  const windowMs = config.windowMs || parseInt(process.env.RATE_LIMIT_WINDOW || '60000') // 1 minute default

  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up old entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // Create new entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs
    }
    rateLimitStore.set(identifier, newEntry)
    
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: newEntry.resetTime
    }
  }

  // Update existing entry
  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }

  entry.count++
  
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

// Get client IP address from request headers
export function getClientIP(headers: Headers): string {
  // Check various headers that might contain the real IP
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  const realIP = headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  const cfConnectingIP = headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}
