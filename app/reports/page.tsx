'use client'

import { AppShell } from '@/components/layout/app-shell'
import { departmentData, monthlyHeadcount, payrollData } from '@/lib/data'
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import { Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const turnoverData = [
  { month: 'Aug', turnover: 2.1 },
  { month: 'Sep', turnover: 1.8 },
  { month: 'Oct', turnover: 2.3 },
  { month: 'Nov', turnover: 1.9 },
  { month: 'Dec', turnover: 2.5 },
  { month: 'Jan', turnover: 1.6 },
]

export default function ReportsPage() {
  const totalHeadcount = departmentData.reduce((s, d) => s + d.value, 0)

  return (
    <AppShell
      title="Reports & Analytics"
      subtitle="Comprehensive HR insights and metrics"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export All
          </Button>
        </div>
      }
    >
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Headcount', value: '174', sub: '+12 this quarter', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Turnover Rate', value: '1.6%', sub: 'Down from 2.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Payroll', value: '$2.15M', sub: 'Monthly average', icon: DollarSign, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Avg Tenure', value: '3.2 yrs', sub: 'Across all employees', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs font-medium text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-[11px] text-muted-foreground/60">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Department breakdown */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="font-semibold text-foreground text-sm mb-1">Headcount by Department</div>
          <div className="text-xs text-muted-foreground mb-4">{totalHeadcount} employees</div>

          <div className="flex items-center gap-5">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-1.5">
              {departmentData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: d.fill }} />
                    <span className="text-xs text-foreground font-medium">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{d.value}</span>
                    <span className="text-[10px] text-muted-foreground">({((d.value / totalHeadcount) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Turnover trend */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="font-semibold text-foreground text-sm mb-1">Turnover Rate</div>
          <div className="text-xs text-muted-foreground mb-4">6-month trend</div>

          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={turnoverData} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => [`${v}%`, 'Turnover']}
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
              />
              <Line type="monotone" dataKey="turnover" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-600">1.6%</div>
              <div className="text-[10px] text-muted-foreground">January</div>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600">-0.9%</div>
              <div className="text-[10px] text-muted-foreground">vs Last Month</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Headcount growth */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="font-semibold text-foreground text-sm mb-1">Headcount Growth</div>
          <div className="text-xs text-muted-foreground mb-4">6-month trend</div>

          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={monthlyHeadcount} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
              />
              <Area type="monotone" dataKey="headcount" stroke="#7c3aed" strokeWidth={2} fill="url(#headGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-foreground">174</div>
              <div className="text-[10px] text-muted-foreground">Current</div>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600">+11</div>
              <div className="text-[10px] text-muted-foreground">Since Aug</div>
            </div>
          </div>
        </div>

        {/* Payroll growth */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="font-semibold text-foreground text-sm mb-1">Payroll Growth</div>
          <div className="text-xs text-muted-foreground mb-4">6-month trend</div>

          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={payrollData} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="payrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, 'Payroll']}
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
              />
              <Area type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} fill="url(#payrollGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-foreground">$2.15M</div>
              <div className="text-[10px] text-muted-foreground">January</div>
            </div>
            <div>
              <div className="text-xs font-bold text-violet-600">+18.1%</div>
              <div className="text-[10px] text-muted-foreground">Since Aug</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
