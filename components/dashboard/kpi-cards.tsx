'use client'

import { Users, Briefcase, UserCheck, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'

const kpis = [
  {
    label: 'Total Employees',
    value: '0',
    change: '+0',
    changeLabel: 'this month',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Open Positions',
    value: '0',
    change: '+0',
    changeLabel: 'this week',
    trend: 'up',
    icon: Briefcase,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'New Hires',
    value: '0',
    change: '+0',
    changeLabel: 'vs last month',
    trend: 'up',
    icon: UserCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Avg Time to Hire',
    value: '0d',
    change: '+0d',
    changeLabel: 'vs last month',
    trend: 'down-good',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
  {
    label: 'Monthly Payroll',
    value: '$0',
    change: '+0%',
    changeLabel: 'vs last month',
    trend: 'up',
    icon: DollarSign,
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:shadow-black/5 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center`}>
              <kpi.icon className={`w-4.5 h-4.5 ${kpi.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${
              kpi.trend === 'up' ? 'text-emerald-600' :
              kpi.trend === 'down-good' ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {kpi.trend === 'up' || kpi.trend === 'down-good' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {kpi.change}
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</div>
          <div className="text-xs text-muted-foreground mt-0.5 font-medium">{kpi.label}</div>
          <div className="text-[11px] text-muted-foreground/60 mt-0.5">{kpi.changeLabel}</div>
        </div>
      ))}
    </div>
  )
}
