import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { recipient, subject, template } = await request.json()
    
    // Simulate email sending
    console.log('Sending email:', { recipient, subject, template })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      sentAt: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}