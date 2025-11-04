'use client'

import { Mail, CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react'

interface EmailRecord {
  id: string
  recipient: string
  subject: string
  status: 'sent' | 'pending' | 'failed'
  timestamp: Date
  aiEnhanced: boolean
  content?: string
}

interface EmailHistoryProps {
  emails: EmailRecord[]
}

export default function EmailHistory({ emails }: EmailHistoryProps) {
  if (emails.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email History</h3>
        <div className="text-center py-8 text-gray-500">
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No emails sent yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email History</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {emails.map((email) => (
          <div key={email.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`p-1 rounded-full ${
              email.status === 'sent' ? 'bg-green-100' :
              email.status === 'pending' ? 'bg-yellow-100' :
              'bg-red-100'
            }`}>
              {email.status === 'sent' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : email.status === 'pending' ? (
                <Clock className="w-4 h-4 text-yellow-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {email.subject}
                </p>
                {email.aiEnhanced && (
                  <div title="AI Enhanced">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600">To: {email.recipient}</p>
              <p className="text-xs text-gray-500">
                {email.timestamp.toLocaleString()}
              </p>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              email.status === 'sent' ? 'bg-green-100 text-green-800' :
              email.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {email.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}