import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { recipient, subject, template, useAI = false } = await request.json()
    
    let finalContent = template
    
    // Use AI to enhance email content if requested
    if (useAI) {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an email writing assistant. Enhance the given email template to be more professional, engaging, and personalized. Keep the core message but improve the tone and structure.'
          },
          {
            role: 'user',
            content: `Subject: ${subject}\nTemplate: ${template}\nRecipient: ${recipient}`
          }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.7,
        max_tokens: 500
      })
      
      finalContent = completion.choices[0]?.message?.content || template
    }
    
    // Simulate email sending with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Log email details (in production, integrate with actual email service)
    console.log('📧 Email Sent:', {
      to: recipient,
      subject: subject,
      content: finalContent,
      timestamp: new Date().toISOString(),
      aiEnhanced: useAI
    })
    
    return NextResponse.json({ 
      success: true, 
      message: `Email sent successfully to ${recipient}`,
      sentAt: new Date().toISOString(),
      content: finalContent,
      aiEnhanced: useAI
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}