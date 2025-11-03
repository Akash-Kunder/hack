'use client'

import { useState, useEffect } from 'react'
import { X, Mail, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  timestamp: Date
}

interface EmailNotificationBannerProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

export default function EmailNotificationBanner({ notifications, onDismiss }: EmailNotificationBannerProps) {
  const [visible, setVisible] = useState<string[]>([])

  useEffect(() => {
    notifications.forEach(notification => {
      if (!visible.includes(notification.id)) {
        setVisible(prev => [...prev, notification.id])
        setTimeout(() => {
          onDismiss(notification.id)
          setVisible(prev => prev.filter(id => id !== notification.id))
        }, 5000)
      }
    })
  }, [notifications, visible, onDismiss])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg max-w-sm ${
            notification.type === 'success' ? 'bg-green-50 border border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className={`p-1 rounded-full ${
            notification.type === 'success' ? 'bg-green-100' :
            notification.type === 'error' ? 'bg-red-100' :
            'bg-blue-100'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Mail className="w-4 h-4 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
            <p className="text-xs text-gray-500">{notification.timestamp.toLocaleTimeString()}</p>
          </div>
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}