'use client'

import { AppShell } from '@/components/layout/app-shell'
import { payrollEmployees, payrollData } from '@/lib/data'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Download, DollarSign, Users, TrendingUp, Clock, CheckCircle2, AlertCircle, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PayrollPage() {
  const totalGross = payrollEmployees.reduce((s, e) => s + e.gross, 0)
  const totalNet = payrollEmployees.reduce((s, e) => s + e.net, 0)
  const totalDeductions = payrollEmployees.reduce((s, e) => s + e.deductions, 0)

  return (
    <AppShell
      title="Payroll"
      subtitle="January 2025 payroll run"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90">
            Run Payroll
          </Button>
        </div>
      }
    >
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Gross Payroll', value: `$${(totalGross / 1000).toFixed(0)}k`, sub: 'January 2025', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Net Payroll', value: `$${(totalNet / 1000).toFixed(0)}k`, sub: 'After deductions', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Deductions', value: `$${(totalDeductions / 1000).toFixed(0)}k`, sub: 'Tax + benefits', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Pending', value: '2', sub: 'Payments pending', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
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

      <div className="grid grid-cols-3 gap-5">
        {/* Trend chart */}
        <div className="col-span-1 bg-card rounded-xl border border-border p-5">
          <div className="font-semibold text-foreground text-sm mb-1">Payroll Trend</div>
          <div className="text-xs text-muted-foreground mb-4">6-month overview</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={payrollData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, 'Gross Payroll']}
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
              />
              <Area type="monotone" dataKey="total" stroke="#7c3aed" strokeWidth={2} fill="url(#payGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-bold text-foreground">$2.15M</div>
              <div className="text-[10px] text-muted-foreground">This Month</div>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600">+2.1%</div>
              <div className="text-[10px] text-muted-foreground">vs Last Month</div>
            </div>
          </div>
        </div>

        {/* Payroll table */}
        <div className="col-span-2 bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <div className="font-semibold text-foreground text-sm">Employee Payroll</div>
              <div className="text-xs text-muted-foreground mt-0.5">January 1–31, 2025</div>
            </div>
            <div className="flex items-center gap-2">
              {['All', 'Paid', 'Pending'].map((f, i) => (
                <button key={f} className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Gross</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Deductions</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Net Pay</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payrollEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">{emp.avatar}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{emp.name}</div>
                        <div className="text-xs text-muted-foreground">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-semibold text-foreground">${emp.gross.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-red-500">-${emp.deductions.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-bold text-emerald-600">${emp.net.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {emp.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
