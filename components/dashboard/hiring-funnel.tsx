'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { monthlyHeadcount, hiringFunnelData } from '@/lib/data'

export function HiringFunnel() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Hiring Pipeline</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Funnel overview · Jan 2025</p>
        </div>
        <div className="flex gap-1.5">
          {['Week', 'Month', 'Quarter'].map((t, i) => (
            <button
              key={t}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                i === 1
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Headcount trend */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Headcount Growth</p>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={monthlyHeadcount} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="headcount" stroke="#7c3aed" strokeWidth={2} fill="url(#headcountGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel bar chart */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recruitment Funnel</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={hiringFunnelData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={58} />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={12}>
                {hiringFunnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        {[
          { label: 'Total Applicants', value: '342' },
          { label: 'Interviews', value: '94' },
          { label: 'Offers Sent', value: '28' },
          { label: 'Hired', value: '18' },
        ].map((s) => (
          <div key={s.label} className="flex-1">
            <div className="text-sm font-bold text-foreground">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
