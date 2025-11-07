import { NextRequest, NextResponse } from 'next/server'
import { sendQuoteEmail, type EmailData } from '@/utils/emailService'
import { rateLimit, getClientIP } from '@/utils/rateLimit'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request.headers)
    
    // Apply rate limiting
    const rateLimitResult = rateLimit(`contact_${clientIP}`, {
      maxRequests: 3, // 3 submissions per window
      windowMs: 60000, // 1 minute
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'phone', 'service', 'description']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Honeypot check (anti-spam)
    const honeypotField = process.env.HONEYPOT_FIELD || 'website_url'
    if (body[honeypotField]) {
      // This is likely a bot
      console.log('[API] Honeypot triggered, likely spam')
      // Return success to fool the bot, but don't actually send email
      return NextResponse.json({ success: true })
    }

    // Sanitize and prepare email data
    const emailData: EmailData = {
      name: body.name?.trim(),
      email: body.email?.trim() || undefined,
      phone: body.phone?.trim(),
      service: body.service,
      propertySize: body.propertySize || undefined,
      drivewayLength: body.drivewayLength || undefined,
      description: body.description?.trim(),
      preferredDate: body.preferredDate || undefined,
      urgency: body.urgency || 'normal',
      estimatedPrice: body.estimatedPrice || undefined,
    }

    // Send email
    const emailResult = await sendQuoteEmail(emailData)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Quote request submitted successfully',
        messageId: emailResult.messageId,
      })
    } else {
      // Email failed but we still received the submission
      console.error('[API] Email send failed:', emailResult.error)
      
      // In production, you might want to save to database here as backup
      
      return NextResponse.json({
        success: true, // Return true to user anyway
        message: 'Quote request received. We will contact you shortly.',
        warning: 'Email notification may be delayed',
      })
    }

  } catch (error) {
    console.error('[API] Contact form error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred processing your request. Please try again or call us directly.' 
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
