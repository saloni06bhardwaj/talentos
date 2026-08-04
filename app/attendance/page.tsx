'use client'

import { AppShell } from '@/components/layout/app-shell'
import { attendanceData, employees } from '@/lib/data'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Download, ChevronLeft, ChevronRight, CheckCircle, XCircle, Monitor, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const todayAttendance = [
  { ...employees[0], checkIn: '08:52', checkOut: null, status: 'present', type: 'in-office', hours: '7h 30m' },
  { ...employees[1], checkIn: '09:10', checkOut: null, status: 'present', type: 'remote', hours: '7h 12m' },
  { ...employees[2], checkIn: null, checkOut: null, status: 'absent', type: null, hours: null },
  { ...employees[3], checkIn: '08:45', checkOut: null, status: 'present', type: 'in-office', hours: '7h 47m' },
  { ...employees[4], checkIn: null, checkOut: null, status: 'leave', type: null, hours: null },
  { ...employees[5], checkIn: '08:30', checkOut: null, status: 'present', type: 'in-office', hours: '8h 02m' },
  { ...employees[6], checkIn: '09:00', checkOut: null, status: 'present', type: 'remote', hours: '7h 22m' },
  { ...employees[7], checkIn: '08:55', checkOut: null, status: 'present', type: 'in-office', hours: '7h 27m' },
]

const statusConfig = {
  present: { label: 'Present', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  absent: { label: 'Absent', color: 'text-red-600', bg: 'bg-red-50 border-red-200', dot: 'bg-red-400' },
  leave: { label: 'On Leave', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-400' },
}

export default function AttendancePage() {
  return (
    <AppShell
      title="Attendance"
      subtitle="Track team presence and work hours"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Present Today', value: '142', sub: '82% of workforce', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Working Remote', value: '24', sub: '14% of workforce', icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Absent', value: '8', sub: '4% of workforce', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Avg Hours Today', value: '7.4h', sub: 'On track', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
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
        {/* Chart */}
        <div className="col-span-1 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold text-foreground text-sm">Weekly Attendance</div>
              <div className="text-xs text-muted-foreground mt-0.5">Jan 20–26, 2025</div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barSize={14} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="present" name="In-office" fill="#7c3aed" radius={[3, 3, 0, 0]} />
              <Bar dataKey="remote" name="Remote" fill="#a78bfa" radius={[3, 3, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#e5e7eb" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-3 mt-2">
            {[
              { label: 'In-office', color: 'bg-primary' },
              { label: 'Remote', color: 'bg-violet-400' },
              { label: 'Absent', color: 'bg-muted-foreground/30' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-[10px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance table */}
        <div className="col-span-2 bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <div className="font-semibold text-foreground text-sm">Today&apos;s Attendance</div>
              <div className="text-xs text-muted-foreground mt-0.5">Monday, January 22, 2025</div>
            </div>
            <div className="flex items-center gap-2">
              {['All', 'Present', 'Absent', 'Leave'].map((f, i) => (
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
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Check In</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Hours</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {todayAttendance.map((emp) => {
                const cfg = statusConfig[emp.status as keyof typeof statusConfig]
                return (
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary">{emp.avatar}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{emp.name}</div>
                          <div className="text-xs text-muted-foreground">{emp.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground capitalize">{emp.type || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-foreground">{emp.checkIn || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{emp.hours || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
