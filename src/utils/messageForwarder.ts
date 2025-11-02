// Message forwarding utilities for sending customer inquiries to business owner

export interface CustomerInquiry {
  customerMessage: string
  timestamp: Date
  chatHistory: string[]
  urgency: 'low' | 'medium' | 'high'
  estimatedService?: string
}

export class MessageForwarder {
  private ownerPhone: string
  private ownerEmail: string
  private businessName: string

  constructor(ownerPhone: string, ownerEmail: string, businessName: string) {
    this.ownerPhone = ownerPhone
    this.ownerEmail = ownerEmail
    this.businessName = businessName
  }

  // Analyze message for urgency and service type
  analyzeInquiry(message: string): { urgency: CustomerInquiry['urgency'], service?: string } {
    const lowerMessage = message.toLowerCase()
    
    // Check for urgency indicators
    let urgency: CustomerInquiry['urgency'] = 'low'
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('asap')) {
      urgency = 'high'
    } else if (lowerMessage.includes('soon') || lowerMessage.includes('quickly') || lowerMessage.includes('need help')) {
      urgency = 'medium'
    }

    // Detect service type
    let service: string | undefined
    if (lowerMessage.includes('driveway') || lowerMessage.includes('gravel')) {
      service = 'Gravel Driveway Restoration'
    } else if (lowerMessage.includes('excavat') || lowerMessage.includes('foundation') || lowerMessage.includes('dig')) {
      service = 'Small Excavating'
    } else if (lowerMessage.includes('brush') || lowerMessage.includes('clearing') || lowerMessage.includes('land')) {
      service = 'Brush Hogging'
    } else if (lowerMessage.includes('rototill') || lowerMessage.includes('garden') || lowerMessage.includes('soil')) {
      service = 'Rototilling'
    }

    return { urgency, service }
  }

  // Format message for SMS
  formatSMSMessage(inquiry: CustomerInquiry): string {
    const urgencyEmoji = inquiry.urgency === 'high' ? '🚨 ' : inquiry.urgency === 'medium' ? '⚡ ' : '💬 '
    const serviceText = inquiry.estimatedService ? ` (${inquiry.estimatedService})` : ''
    
    return `${urgencyEmoji}${this.businessName} Website Inquiry${serviceText}:

"${inquiry.customerMessage}"

Time: ${inquiry.timestamp.toLocaleString()}
Chat: https://harker-enterprises.com/chat-history/${inquiry.timestamp.getTime()}

Reply quickly to maintain excellent customer service!`
  }

  // Format message for email
  formatEmailMessage(inquiry: CustomerInquiry): { subject: string, body: string } {
    const urgencyText = inquiry.urgency === 'high' ? '[URGENT] ' : inquiry.urgency === 'medium' ? '[PRIORITY] ' : ''
    const serviceText = inquiry.estimatedService ? ` - ${inquiry.estimatedService}` : ''
    
    const subject = `${urgencyText}${this.businessName} Website Inquiry${serviceText}`
    
    const body = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #ea580c; color: white; padding: 15px; border-radius: 5px; }
        .urgency-high { border-left: 4px solid #dc2626; padding-left: 15px; background: #fef2f2; }
        .urgency-medium { border-left: 4px solid #f59e0b; padding-left: 15px; background: #fffbeb; }
        .urgency-low { border-left: 4px solid #10b981; padding-left: 15px; background: #f0fdf4; }
        .message { background: #f9fafb; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .details { background: #f3f4f6; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .action { background: #ea580c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🏗️ ${this.businessName} - New Customer Inquiry</h2>
    </div>
    
    <div class="urgency-${inquiry.urgency}">
        <h3>${inquiry.urgency === 'high' ? '🚨 URGENT' : inquiry.urgency === 'medium' ? '⚡ PRIORITY' : '💬 STANDARD'} Inquiry</h3>
        ${inquiry.estimatedService ? `<p><strong>Estimated Service:</strong> ${inquiry.estimatedService}</p>` : ''}
    </div>
    
    <div class="message">
        <h4>Customer Message:</h4>
        <p>"${inquiry.customerMessage}"</p>
    </div>
    
    <div class="details">
        <p><strong>Time Received:</strong> ${inquiry.timestamp.toLocaleString()}</p>
        <p><strong>Urgency Level:</strong> ${inquiry.urgency.toUpperCase()}</p>
        ${inquiry.chatHistory.length > 1 ? `<p><strong>Chat History:</strong> ${inquiry.chatHistory.length} messages</p>` : ''}
    </div>
    
    ${inquiry.chatHistory.length > 1 ? `
    <div class="details">
        <h4>Full Conversation:</h4>
        ${inquiry.chatHistory.map(msg => `<p style="margin: 5px 0; padding: 5px; background: white; border-radius: 3px;">${msg}</p>`).join('')}
    </div>
    ` : ''}
    
    <div style="text-align: center; margin: 20px 0;">
        <a href="tel:${this.ownerPhone}" class="action">📞 Call Customer Back</a>
        <a href="mailto:customer@example.com" class="action">📧 Send Email</a>
    </div>
    
    <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h4>Recommended Response Time:</h4>
        <p>${inquiry.urgency === 'high' ? 'Within 30 minutes' : inquiry.urgency === 'medium' ? 'Within 2 hours' : 'Within 4 hours'}</p>
        
        <h4>Quick Response Suggestions:</h4>
        <ul>
            <li>Thank them for their interest</li>
            <li>Ask for their contact information</li>
            <li>Schedule a free consultation</li>
            ${inquiry.estimatedService === 'Gravel Driveway Restoration' ? '<li>Ask about driveway length for pricing estimate</li>' : ''}
            <li>Provide your direct phone number: ${this.ownerPhone}</li>
        </ul>
    </div>
</body>
</html>`

    return { subject, body }
  }

  // Send SMS notification (simulated - would integrate with Twilio/SMS service)
  async sendSMSNotification(inquiry: CustomerInquiry): Promise<boolean> {
    try {
      const message = this.formatSMSMessage(inquiry)
      
      // In a real implementation, you would integrate with:
      // - Twilio SMS API
      // - AWS SNS
      // - Other SMS providers
      
      console.log('SMS Notification would be sent:', {
        to: this.ownerPhone,
        message,
        urgency: inquiry.urgency
      })
      
      // For now, we'll simulate success
      return true
    } catch (error) {
      console.error('Failed to send SMS notification:', error)
      return false
    }
  }

  // Send email notification (simulated - would integrate with email service)
  async sendEmailNotification(inquiry: CustomerInquiry): Promise<boolean> {
    try {
      const { subject, body } = this.formatEmailMessage(inquiry)
      
      // In a real implementation, you would integrate with:
      // - SendGrid
      // - Amazon SES
      // - Nodemailer with Gmail/SMTP
      // - Other email providers
      
      console.log('Email Notification would be sent:', {
        to: this.ownerEmail,
        subject,
        urgency: inquiry.urgency,
        service: inquiry.estimatedService
      })
      
      // For now, we'll simulate success
      return true
    } catch (error) {
      console.error('Failed to send email notification:', error)
      return false
    }
  }

  // Main method to forward customer inquiry
  async forwardInquiry(customerMessage: string, chatHistory: string[]): Promise<{ sms: boolean, email: boolean }> {
    const analysis = this.analyzeInquiry(customerMessage)
    
    const inquiry: CustomerInquiry = {
      customerMessage,
      timestamp: new Date(),
      chatHistory,
      urgency: analysis.urgency,
      estimatedService: analysis.service
    }

    // Send both SMS and email notifications
    const [smsResult, emailResult] = await Promise.all([
      this.sendSMSNotification(inquiry),
      this.sendEmailNotification(inquiry)
    ])

    return {
      sms: smsResult,
      email: emailResult
    }
  }
}

// Factory function to create a pre-configured message forwarder
export function createMessageForwarder() {
  return new MessageForwarder(
    '(330) 301-2769',
    'ronaldharker@yahoo.com',
    'Harker Enterprises'
  )
}