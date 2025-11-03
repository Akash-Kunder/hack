'use client'

import { Mail, Clock, Send, User } from 'lucide-react'

interface EmailTask {
  id: string
  recipient: string
  subject: string
  status: 'pending' | 'sent' | 'failed'
  scheduledAt: Date
  sentAt?: Date
}

interface EmailTaskCardProps {
  task: EmailTask
  onSend: (id: string) => void
}

export default function EmailTaskCard({ task, onSend }: EmailTaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{task.subject}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <User className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-gray-600">{task.recipient}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.status === 'sent' ? 'bg-green-100 text-green-800' :
            task.status === 'failed' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {task.status}
          </span>
          {task.status === 'pending' && (
            <button
              onClick={() => onSend(task.id)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Send size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-1 mt-3 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>
          {task.status === 'sent' && task.sentAt 
            ? `Sent ${task.sentAt.toLocaleString()}`
            : `Scheduled ${task.scheduledAt.toLocaleString()}`
          }
        </span>
      </div>
    </div>
  )
}