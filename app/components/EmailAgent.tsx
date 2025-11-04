'use client'

import { useState } from 'react'
import { Bot, Send, Sparkles, User, Mail, Clock } from 'lucide-react'

interface EmailAgentProps {
  onSendEmail: (emailData: any) => Promise<void>
}

export default function EmailAgent({ onSendEmail }: EmailAgentProps) {
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [useAI, setUseAI] = useState(true)
  const [sending, setSending] = useState(false)
  const [lastSent, setLastSent] = useState<string | null>(null)

  const handleSend = async () => {
    if (!recipient || !subject || !message) return
    
    setSending(true)
    try {
      await onSendEmail({
        recipient,
        subject,
        template: message,
        useAI
      })
      setLastSent(new Date().toLocaleTimeString())
      // Clear form
      setRecipient('')
      setSubject('')
      setMessage('')
    } catch (error) {
      console.error('Failed to send email:', error)
    }
    setSending(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Email Agent</h3>
          <p className="text-sm text-gray-600">AI-powered email assistant</p>
        </div>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">Online</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4" />
            <span>Recipient</span>
          </label>
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4" />
            <span>Subject</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email subject"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Message</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Write your message here..."
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useAI}
              onChange={(e) => setUseAI(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">AI Enhancement</span>
            <Sparkles className="w-3 h-3 text-purple-500" />
          </label>
          
          {lastSent && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Last sent: {lastSent}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={sending || !recipient || !subject || !message}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending Email...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </>
          )}
        </button>
      </div>

      {useAI && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
          <div className="flex items-center space-x-2 text-sm text-purple-800">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI Enhancement Active</span>
          </div>
          <p className="text-xs text-purple-600 mt-1">
            Your message will be enhanced for better engagement and professionalism.
          </p>
        </div>
      )}
    </div>
  )
}