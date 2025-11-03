'use client'

import { Bot, Circle } from 'lucide-react'
import { Agent } from '../lib/types'

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{agent.name}</h4>
          <p className="text-sm text-gray-500 capitalize">{agent.type}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Circle className={`w-2 h-2 fill-current ${
            agent.status === 'online' ? 'text-green-500' : 'text-gray-400'
          }`} />
          <span className="text-xs text-gray-500">{agent.status}</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap gap-1">
          {agent.capabilities.slice(0, 3).map((cap, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-xs rounded">
              +{agent.capabilities.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}