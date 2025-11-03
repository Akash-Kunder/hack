import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json()
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for AgentFlow. Generate ${type} content based on the user's request. Keep responses concise and professional.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 500
    })

    const content = completion.choices[0]?.message?.content || 'No content generated'

    return NextResponse.json({
      success: true,
      content,
      type
    })
  } catch (error) {
    console.error('Groq API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}