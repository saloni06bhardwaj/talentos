'use client'

import { Sidebar } from './sidebar'
import { TopBar } from './topbar'

interface AppShellProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function AppShell({ children, title, subtitle, actions }: AppShellProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 min-w-0">
        <TopBar title={title} subtitle={subtitle} actions={actions} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
