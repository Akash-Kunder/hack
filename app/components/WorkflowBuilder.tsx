'use client'

import { useState } from 'react'
import { ArrowRight, Plus, Trash2 } from 'lucide-react'
import { WorkflowStep } from '../lib/types'

interface WorkflowBuilderProps {
  steps: WorkflowStep[]
  onStepsChange: (steps: WorkflowStep[]) => void
}

export default function WorkflowBuilder({ steps, onStepsChange }: WorkflowBuilderProps) {
  const addStep = (type: 'trigger' | 'action' | 'condition') => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type,
      name: `New ${type}`,
      config: {}
    }
    onStepsChange([...steps, newStep])
  }

  const removeStep = (id: string) => {
    onStepsChange(steps.filter(step => step.id !== id))
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Workflow Steps</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              step.type === 'trigger' ? 'bg-green-100 text-green-800' :
              step.type === 'action' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {step.name}
            </div>
            <button
              onClick={() => removeStep(step.id)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
            {index < steps.length - 1 && <ArrowRight size={16} className="text-gray-400" />}
          </div>
        ))}
        <div className="flex space-x-2">
          <button
            onClick={() => addStep('trigger')}
            className="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
          >
            <Plus size={14} className="inline mr-1" />
            Trigger
          </button>
          <button
            onClick={() => addStep('action')}
            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
          >
            <Plus size={14} className="inline mr-1" />
            Action
          </button>
          <button
            onClick={() => addStep('condition')}
            className="px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 text-sm"
          >
            <Plus size={14} className="inline mr-1" />
            Condition
          </button>
        </div>
      </div>
    </div>
  )
}