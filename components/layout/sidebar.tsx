'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  KanbanSquare,
  Clock,
  DollarSign,
  BarChart3,
  MessageSquareText,
  Settings,
  ChevronDown,
  Sparkles,
  Bell,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { User, Profile, Company } from '@/service/auth'
import { signOut } from '@/service/auth'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Recruitment', href: '/recruitment', icon: Briefcase },
  { label: 'ATS Board', href: '/ats', icon: KanbanSquare },
  { label: 'Employees', href: '/employees', icon: Users },
  { label: 'Attendance', href: '/attendance', icon: Clock },
  { label: 'Payroll', href: '/payroll', icon: DollarSign },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'AI Assistant', href: '/ai-assistant', icon: MessageSquareText },
]

const bottomItems = [
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  user?: User | null
  profile?: Profile | null
  company?: Company | null
}

export function Sidebar({ user, profile, company }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut()
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
      setLoggingOut(false)
    }
  }

  const userInitials = profile?.full_name ? getInitials(profile.full_name) : 'U'
  const companyName = company?.name || 'Company'
  const userName = profile?.full_name || 'User'

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col bg-sidebar border-r border-sidebar-border z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-sidebar-foreground font-semibold text-sm tracking-tight">TalentOS</span>
          <div className="text-[10px] text-sidebar-foreground/40 font-medium uppercase tracking-wider">HR Platform</div>
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="px-3 py-3 border-b border-sidebar-border">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">{getInitials(companyName)}</span>
            </div>
            <span className="text-sidebar-foreground text-xs font-medium truncate">{companyName}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70 transition-colors shrink-0" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/30 px-3 pb-1.5 pt-1">
          Main
        </div>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-sidebar-border space-y-0.5">
        {bottomItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}

        {/* User */}
        <div className="flex items-center justify-between px-3 py-2.5 mt-1 rounded-lg hover:bg-sidebar-accent transition-colors group">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sidebar-foreground text-xs font-medium truncate">{userName}</div>
              <div className="text-sidebar-foreground/40 text-[10px] truncate">{profile?.role || 'User'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-sidebar-foreground/30 hover:text-sidebar-foreground/60 transition-colors shrink-0 disabled:opacity-50"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
