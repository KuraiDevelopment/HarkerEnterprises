// Email service utility for sending form submissions
// Supports multiple email providers (Resend, SendGrid, SMTP)

import { BUSINESS_INFO } from '@/constants/business'

export interface EmailData {
  name: string
  email?: string
  phone: string
  service: string
  propertySize?: string
  drivewayLength?: string
  description: string
  preferredDate?: string
  urgency: string
  estimatedPrice?: number
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// Format email content
function formatEmailHTML(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 30px; }
    .urgency-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    .urgency-emergency { background: #dc2626; color: white; }
    .urgency-urgent { background: #f59e0b; color: white; }
    .urgency-soon { background: #3b82f6; color: white; }
    .urgency-normal { background: #10b981; color: white; }
    .field { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb; }
    .field:last-child { border-bottom: none; }
    .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
    .value { font-size: 16px; color: #111827; }
    .price-estimate { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .price-estimate .amount { font-size: 28px; font-weight: bold; color: #1e40af; }
    .action-buttons { text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #e5e7eb; }
    .button { display: inline-block; padding: 12px 30px; margin: 0 10px 10px 0; background: #ea580c; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .button:hover { background: #c2410c; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏗️ New Quote Request</h1>
      <p style="margin: 5px 0 0 0; font-size: 14px;">${BUSINESS_INFO.name}</p>
    </div>
    
    <div class="content">
      <div class="urgency-badge urgency-${data.urgency}">
        ${data.urgency === 'emergency' ? '🚨 EMERGENCY' : 
          data.urgency === 'urgent' ? '⚡ URGENT' : 
          data.urgency === 'soon' ? '📅 PRIORITY' : '✅ NORMAL'}
      </div>
      
      ${data.estimatedPrice ? `
      <div class="price-estimate">
        <div class="label">Estimated Price</div>
        <div class="amount">$${data.estimatedPrice.toFixed(2)}</div>
        <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
          Based on provided measurements • Subject to site inspection
        </div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Customer Name</div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${data.phone}" style="color: #ea580c; text-decoration: none;">${data.phone}</a></div>
      </div>
      
      ${data.email ? `
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}" style="color: #ea580c; text-decoration: none;">${data.email}</a></div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Service Requested</div>
        <div class="value">${data.service}</div>
      </div>
      
      ${data.propertySize ? `
      <div class="field">
        <div class="label">Property Size</div>
        <div class="value">${data.propertySize}</div>
      </div>
      ` : ''}
      
      ${data.drivewayLength ? `
      <div class="field">
        <div class="label">Driveway Length</div>
        <div class="value">${data.drivewayLength} feet</div>
      </div>
      ` : ''}
      
      ${data.preferredDate ? `
      <div class="field">
        <div class="label">Preferred Start Date</div>
        <div class="value">${new Date(data.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Project Description</div>
        <div class="value">${data.description.replace(/\n/g, '<br>')}</div>
      </div>
      
      <div class="action-buttons">
        <a href="tel:${data.phone}" class="button">📞 Call Customer</a>
        ${data.email ? `<a href="mailto:${data.email}" class="button">📧 Send Email</a>` : ''}
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Response Time Recommendation:</strong><br>
      ${data.urgency === 'emergency' ? 'Respond immediately' : 
        data.urgency === 'urgent' ? 'Within 1 hour' : 
        data.urgency === 'soon' ? 'Within 4 hours' : 'Within 24 hours'}</p>
      <p style="margin-top: 15px; font-size: 12px;">
        This email was sent from your website contact form at ${new Date().toLocaleString()}
      </p>
    </div>
  </div>
</body>
</html>
  `
}

// Plain text version for email clients that don't support HTML
function formatEmailText(data: EmailData): string {
  return `
NEW QUOTE REQUEST - ${BUSINESS_INFO.name}

Urgency: ${data.urgency.toUpperCase()}
${data.estimatedPrice ? `Estimated Price: $${data.estimatedPrice.toFixed(2)}\n` : ''}

Customer Information:
- Name: ${data.name}
- Phone: ${data.phone}
${data.email ? `- Email: ${data.email}\n` : ''}

Service Details:
- Service: ${data.service}
${data.propertySize ? `- Property Size: ${data.propertySize}\n` : ''}
${data.drivewayLength ? `- Driveway Length: ${data.drivewayLength} feet\n` : ''}
${data.preferredDate ? `- Preferred Start Date: ${data.preferredDate}\n` : ''}

Project Description:
${data.description}

---
Received: ${new Date().toLocaleString()}
  `.trim()
}

// Send email using Resend (recommended)
async function sendWithResend(data: EmailData): Promise<EmailResult> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  
  if (!RESEND_API_KEY) {
    console.log('[Email] Resend API key not configured')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'noreply@harker-enterprises.com',
        to: process.env.EMAIL_TO || BUSINESS_INFO.email,
        reply_to: data.email || process.env.EMAIL_REPLY_TO,
        subject: `${data.urgency === 'emergency' ? '🚨 EMERGENCY' : data.urgency === 'urgent' ? '⚡ URGENT' : ''} New Quote Request - ${data.service}`,
        html: formatEmailHTML(data),
        text: formatEmailText(data),
      }),
    })

    const result = await response.json()

    if (response.ok) {
      return {
        success: true,
        messageId: result.id,
      }
    } else {
      console.error('[Email] Resend error:', result)
      return {
        success: false,
        error: result.message || 'Failed to send email',
      }
    }
  } catch (error) {
    console.error('[Email] Resend exception:', error)
    return {
      success: false,
      error: 'Email service error',
    }
  }
}

// Main send email function
export async function sendQuoteEmail(data: EmailData): Promise<EmailResult> {
  // Log for development/testing
  if (process.env.NODE_ENV === 'development') {
    console.log('[Email] Quote request (dev mode):', data)
  }

  // Try to send via configured service
  const result = await sendWithResend(data)
  
  // If email sending fails, still log the submission
  if (!result.success) {
    console.error('[Email] Failed to send:', result.error)
    // In production, you might want to save to a database here as backup
  }
  
  return result
}
