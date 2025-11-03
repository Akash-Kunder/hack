'use client'

import { useState } from 'react'
import { Sparkles, Copy, RefreshCw } from 'lucide-react'

export default function AIContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState('email')
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type })
      })
      
      const data = await response.json()
      if (data.success) {
        setContent(data.content)
      }
    } catch (error) {
      console.error('Failed to generate content:', error)
    }
    setLoading(false)
  }

  const copyContent = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">AI Content Generator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="email">Email</option>
            <option value="blog">Blog Post</option>
            <option value="social">Social Media</option>
            <option value="report">Report</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Describe what content you want to generate..."
          />
        </div>
        
        <button
          onClick={generateContent}
          disabled={loading || !prompt.trim()}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? 'Generating...' : 'Generate Content'}</span>
        </button>
        
        {content && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Generated Content</label>
              <button
                onClick={copyContent}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-sm whitespace-pre-wrap">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}