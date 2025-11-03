'use client'

import { useState } from 'react'
import { Plus, Zap, Bot, BarChart3, Mail } from 'lucide-react'
import WorkflowCard from './components/WorkflowCard'
import AgentCard from './components/AgentCard'
import CreateWorkflowModal from './components/CreateWorkflowModal'
import EmailWorkflowModal from './components/EmailWorkflowModal'
import EmailTaskCard from './components/EmailTaskCard'
import AIContentGenerator from './components/AIContentGenerator'
import EmailAutomationIndicator from './components/EmailAutomationIndicator'
import EmailNotificationBanner from './components/EmailNotificationBanner'
import { Workflow, Agent } from './lib/types'

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Content Generation Pipeline',
    description: 'Automated content creation and publishing workflow',
    status: 'active',
    steps: [
      { id: '1', type: 'trigger', name: 'Schedule Trigger', config: {} },
      { id: '2', type: 'action', name: 'Generate Content', config: {} },
      { id: '3', type: 'action', name: 'Publish to CMS', config: {} }
    ],
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Task Assignment Bot',
    description: 'Intelligent task distribution based on team capacity',
    status: 'paused',
    steps: [
      { id: '1', type: 'trigger', name: 'New Task Created', config: {} },
      { id: '2', type: 'condition', name: 'Check Team Availability', config: {} },
      { id: '3', type: 'action', name: 'Assign Task', config: {} }
    ],
    createdAt: new Date()
  }
]

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Content Creator',
    type: 'content',
    status: 'online',
    capabilities: ['Writing', 'SEO', 'Research', 'Editing']
  },
  {
    id: '2',
    name: 'Task Manager',
    type: 'task',
    status: 'online',
    capabilities: ['Scheduling', 'Prioritization', 'Notifications']
  },
  {
    id: '3',
    name: 'Data Analyst',
    type: 'analysis',
    status: 'offline',
    capabilities: ['Analytics', 'Reporting', 'Insights']
  }
]

export default function Home() {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailTasks, setEmailTasks] = useState<Array<{
    id: string
    recipient: string
    subject: string
    status: 'pending' | 'sent' | 'failed'
    scheduledAt: Date
    sentAt?: Date
  }>>([
    {
      id: '1',
      recipient: 'user@example.com',
      subject: 'Weekly Newsletter',
      status: 'pending',
      scheduledAt: new Date(Date.now() + 3600000)
    },
    {
      id: '2',
      recipient: 'team@company.com',
      subject: 'Project Update',
      status: 'sent',
      scheduledAt: new Date(Date.now() - 3600000),
      sentAt: new Date(Date.now() - 1800000)
    }
  ])
  
  const [notifications, setNotifications] = useState<Array<{
    id: string
    type: 'success' | 'error' | 'info'
    message: string
    timestamp: Date
  }>>([])

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' as const }
        : w
    ))
  }

  const createWorkflow = (data: { name: string; description: string; type: string }) => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      status: 'draft',
      steps: [],
      createdAt: new Date()
    }
    setWorkflows(prev => [...prev, newWorkflow])
  }

  const createEmailWorkflow = (data: any) => {
    const emailWorkflow: Workflow = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      status: 'active',
      steps: [
        { id: '1', type: 'trigger', name: `${data.config.trigger} Trigger`, config: {} },
        { id: '2', type: 'action', name: 'Send Email', config: data.config }
      ],
      createdAt: new Date()
    }
    setWorkflows(prev => [...prev, emailWorkflow])
    setNotifications(prev => [...prev, {
      id: Date.now().toString(),
      type: 'info',
      message: `Email workflow "${data.name}" created`,
      timestamp: new Date()
    }])
  }

  const sendEmail = async (taskId: string) => {
    const task = emailTasks.find(t => t.id === taskId)
    if (!task) return

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: task.recipient,
          subject: task.subject,
          template: 'Email content here'
        })
      })

      if (response.ok) {
        setEmailTasks(prev => prev.map(t => 
          t.id === taskId 
            ? { ...t, status: 'sent', sentAt: new Date() }
            : t
        ))
        setNotifications(prev => [...prev, {
          id: Date.now().toString(),
          type: 'success',
          message: `Email sent to ${task.recipient}`,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      setEmailTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'failed' }
          : t
      ))
      setNotifications(prev => [...prev, {
        id: Date.now().toString(),
        type: 'error',
        message: `Failed to send email to ${task?.recipient}`,
        timestamp: new Date()
      }])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AgentFlow</h1>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsEmailModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Mail size={16} />
                <span>Email Workflow</span>
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>New Workflow</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Email Automation Status */}
        <div className="mb-6">
          <EmailAutomationIndicator 
            status={emailTasks.some(t => t.status === 'pending') ? 'active' : 'completed'}
            count={emailTasks.filter(t => t.status === 'pending').length}
            nextRun={emailTasks.find(t => t.status === 'pending')?.scheduledAt}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Online Agents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAgents.filter(a => a.status === 'online').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workflows */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Workflows</h2>
            </div>
            <div className="space-y-4">
              {workflows.map(workflow => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onToggle={toggleWorkflow}
                />
              ))}
            </div>
          </div>

          {/* Agents */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Agents</h2>
            <div className="space-y-4 mb-8">
              {mockAgents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Tasks</h3>
            <div className="space-y-3 mb-8">
              {emailTasks.map(task => (
                <EmailTaskCard key={task.id} task={task} onSend={sendEmail} />
              ))}
            </div>
            
            <AIContentGenerator />
          </div>
        </div>
      </div>
      
      <CreateWorkflowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createWorkflow}
      />
      
      <EmailWorkflowModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onCreate={createEmailWorkflow}
      />
      
      <EmailNotificationBanner
        notifications={notifications}
        onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
      />
    </div>
  )
}