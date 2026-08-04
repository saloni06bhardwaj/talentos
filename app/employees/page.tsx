'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { employees } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Plus, Search, LayoutGrid, List, MapPin, Mail, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

const deptColors: Record<string, string> = {
  Engineering: 'bg-primary/10 text-primary',
  Product: 'bg-violet-50 text-violet-600',
  Design: 'bg-pink-50 text-pink-600',
  Analytics: 'bg-blue-50 text-blue-600',
  Sales: 'bg-emerald-50 text-emerald-600',
  Marketing: 'bg-amber-50 text-amber-600',
  'HR & Ops': 'bg-slate-100 text-slate-600',
}

const statusColors: Record<string, { dot: string; text: string }> = {
  active: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
  'on-leave': { dot: 'bg-amber-400', text: 'text-amber-700' },
  inactive: { dot: 'bg-slate-400', text: 'text-slate-600' },
}

export default function EmployeesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  const filtered = employees.filter(
    (e) =>
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell
      title="Employee Directory"
      subtitle={`${employees.length} employees across all departments`}
      actions={
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90">
            <Plus className="w-3.5 h-3.5" />
            Add Employee
          </Button>
        </div>
      }
    >
      {/* Dept summary */}
      <div className="flex items-center gap-3 mb-5 overflow-x-auto pb-1">
        {['All', 'Engineering', 'Product', 'Design', 'Analytics', 'Sales', 'Marketing'].map((dept, i) => (
          <button
            key={dept}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              i === 0
                ? 'bg-primary text-white border-primary'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
            }`}
          >
            {dept}
            {i > 0 && (
              <span className="text-[10px] font-bold opacity-70">
                {employees.filter((e) => e.department === dept).length}
              </span>
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              className="w-48 h-8 pl-8 pr-3 text-xs bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${view === 'grid' ? 'bg-primary text-white' : 'bg-card text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${view === 'list' ? 'bg-primary text-white' : 'bg-card text-muted-foreground hover:text-foreground'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map((emp) => {
            const st = statusColors[emp.status] || statusColors.active
            return (
              <Link href={`/employees/${emp.id}`} key={emp.id}>
                <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:shadow-primary/5 hover:border-primary/30 transition-all cursor-pointer group">
                  {/* Avatar */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{emp.avatar}</span>
                    </div>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{emp.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{emp.role}</div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${deptColors[emp.department] || 'bg-muted text-muted-foreground'}`}>
                      {emp.department}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 text-muted-foreground/60" />
                    <span className="text-[11px] text-muted-foreground">{emp.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      <span className={`text-[11px] font-medium capitalize ${st.text}`}>{emp.status.replace('-', ' ')}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">Since {emp.startDate.slice(0, 4)}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Department</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Location</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Joined</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((emp) => {
                const st = statusColors[emp.status] || statusColors.active
                return (
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary">{emp.avatar}</span>
                        </div>
                        <div>
                          <Link href={`/employees/${emp.id}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors">{emp.name}</Link>
                          <div className="text-xs text-muted-foreground">{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${deptColors[emp.department] || 'bg-muted text-muted-foreground'}`}>
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />{emp.location}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />{emp.email}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        <span className={`text-xs font-medium capitalize ${st.text}`}>{emp.status.replace('-', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">{emp.startDate}</td>
                    <td className="px-4 py-3.5">
                      <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  )
}
