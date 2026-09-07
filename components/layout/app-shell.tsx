'use client'

import { Sidebar } from './sidebar'
import { TopBar } from './topbar'
import { User, Profile, Company } from '@/service/auth'

interface AppShellProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
  user?: User | null
  profile?: Profile | null
  company?: Company | null
}

export function AppShell({ children, title, subtitle, actions, user, profile, company }: AppShellProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar user={user} profile={profile} company={company} />
      <div className="flex-1 flex flex-col ml-60 min-w-0">
        <TopBar title={title} subtitle={subtitle} actions={actions} user={user} profile={profile} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
