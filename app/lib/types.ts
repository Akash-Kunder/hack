export interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft'
  steps: WorkflowStep[]
  createdAt: Date
}

export interface WorkflowStep {
  id: string
  type: 'trigger' | 'action' | 'condition'
  name: string
  config: Record<string, any>
}

export interface Agent {
  id: string
  name: string
  type: 'content' | 'task' | 'analysis'
  status: 'online' | 'offline'
  capabilities: string[]
}