'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function Sidebar() {
  const pathname = usePathname()

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
              <span className="text-[10px] font-bold text-primary">A</span>
            </div>
            <span className="text-sidebar-foreground text-xs font-medium">Acme Corp</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70 transition-colors" />
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
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary">LP</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sidebar-foreground text-xs font-medium truncate">Lisa Park</div>
            <div className="text-sidebar-foreground/40 text-[10px] truncate">HR Director</div>
          </div>
          <Bell className="w-3.5 h-3.5 text-sidebar-foreground/30 shrink-0" />
        </div>
      </div>
    </aside>
  )
}
