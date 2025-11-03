'use client'

import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import WorkflowBuilder from '../../components/WorkflowBuilder'
import { WorkflowStep } from '../../lib/types'

export default function WorkflowPage({ params }: { params: { id: string } }) {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: '1', type: 'trigger', name: 'Schedule Trigger', config: {} },
    { id: '2', type: 'action', name: 'Generate Content', config: {} }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Edit Workflow</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkflowBuilder steps={steps} onStepsChange={setSteps} />
      </div>
    </div>
  )
}