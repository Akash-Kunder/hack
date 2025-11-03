'use client'

import { Play, Pause, Settings } from 'lucide-react'
import Link from 'next/link'
import { Workflow } from '../lib/types'

interface WorkflowCardProps {
  workflow: Workflow
  onToggle: (id: string) => void
}

export default function WorkflowCard({ workflow, onToggle }: WorkflowCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
          <p className="text-gray-600 mt-1">{workflow.description}</p>
          <div className="flex items-center mt-3 space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              workflow.status === 'active' ? 'bg-green-100 text-green-800' :
              workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {workflow.status}
            </span>
            <span className="text-sm text-gray-500">{workflow.steps.length} steps</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(workflow.id)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            {workflow.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <Link href={`/workflow/${workflow.id}`} className="p-2 text-gray-400 hover:text-gray-600">
            <Settings size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}