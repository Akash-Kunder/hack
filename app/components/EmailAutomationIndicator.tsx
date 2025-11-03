'use client'

import { Mail, Clock, CheckCircle, AlertCircle, Zap } from 'lucide-react'

interface EmailAutomationIndicatorProps {
  status: 'active' | 'scheduled' | 'completed' | 'failed'
  count?: number
  nextRun?: Date
}

export default function EmailAutomationIndicator({ status, count = 0, nextRun }: EmailAutomationIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          icon: <Zap className="w-4 h-4" />,
          color: 'text-green-600 bg-green-100',
          label: 'Email Automation Active',
          pulse: true
        }
      case 'scheduled':
        return {
          icon: <Clock className="w-4 h-4" />,
          color: 'text-blue-600 bg-blue-100',
          label: 'Emails Scheduled',
          pulse: false
        }
      case 'completed':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: 'text-green-600 bg-green-100',
          label: 'Emails Sent',
          pulse: false
        }
      case 'failed':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: 'text-red-600 bg-red-100',
          label: 'Email Failed',
          pulse: true
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${config.color} ${config.pulse ? 'animate-pulse' : ''}`}>
      <Mail className="w-4 h-4" />
      {config.icon}
      <div className="text-sm font-medium">
        <span>{config.label}</span>
        {count > 0 && <span className="ml-1">({count})</span>}
      </div>
      {nextRun && (
        <div className="text-xs opacity-75">
          Next: {nextRun.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}