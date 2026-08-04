'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { attendanceData } from '@/lib/data'

export function AttendanceChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Attendance Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">This week</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            94.3% today
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={attendanceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barSize={12} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }}
          />
          <Bar dataKey="present" name="In-office" fill="#7c3aed" radius={[3, 3, 0, 0]} />
          <Bar dataKey="remote" name="Remote" fill="#a78bfa" radius={[3, 3, 0, 0]} />
          <Bar dataKey="absent" name="Absent" fill="#e5e7eb" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-4">
        {[
          { label: 'In-office', color: 'bg-primary' },
          { label: 'Remote', color: 'bg-violet-400' },
          { label: 'Absent', color: 'bg-muted-foreground/30' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${l.color}`} />
            <span className="text-[11px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-2">
        {[
          { label: 'Present', value: '142', sub: '82%' },
          { label: 'Remote', value: '24', sub: '14%' },
          { label: 'Absent', value: '8', sub: '4%' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-sm font-bold text-foreground">{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label} · {s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
