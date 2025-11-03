import './globals.css'

export const metadata = {
  title: 'AgentFlow - Agentic Workflow Platform',
  description: 'AI-driven workflow automation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}