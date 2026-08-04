'use client'

import { Search, Bell, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopBarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-6 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center gap-3 min-w-0">
        <div>
          <h1 className="text-sm font-semibold text-foreground leading-none">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-48 h-8 pl-8 pr-3 text-xs bg-muted/60 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground transition-all"
          />
          <kbd className="absolute right-2 text-[10px] text-muted-foreground/60 bg-muted px-1 rounded">⌘K</kbd>
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}

        <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
          <HelpCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </Button>
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
          <span className="text-[10px] font-bold text-primary">LP</span>
        </div>
      </div>
    </header>
  )
}
