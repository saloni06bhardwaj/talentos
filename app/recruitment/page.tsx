import { AppShell } from '@/components/layout/app-shell'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter, MoreHorizontal, MapPin, Users, Clock } from 'lucide-react'
import { jobs } from '@/lib/data'

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  paused: 'bg-amber-50 text-amber-700 border border-amber-200',
  closed: 'bg-muted text-muted-foreground border border-border',
}

const deptColors: Record<string, string> = {
  Engineering: 'bg-primary/10 text-primary',
  Product: 'bg-violet-50 text-violet-600',
  Design: 'bg-pink-50 text-pink-600',
  Analytics: 'bg-blue-50 text-blue-600',
  Sales: 'bg-emerald-50 text-emerald-600',
  Marketing: 'bg-amber-50 text-amber-600',
}

export default function RecruitmentPage() {
  return (
    <AppShell
      title="Recruitment"
      subtitle="Manage open positions and hiring pipelines"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90">
            <Plus className="w-3.5 h-3.5" />
            Post Job
          </Button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open Roles', value: '23', sub: 'Active now' },
          { label: 'Total Applicants', value: '342', sub: 'This month' },
          { label: 'In Progress', value: '94', sub: 'Interviewing' },
          { label: 'Avg Time to Hire', value: '18 days', sub: 'Down 2 days' },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs font-medium text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-[11px] text-muted-foreground/60 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Search & filter bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            className="w-full h-9 pl-8 pr-3 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground"
            placeholder="Search job titles..."
          />
        </div>
        {['All', 'Engineering', 'Product', 'Design', 'Analytics'].map((dept, i) => (
          <button
            key={dept}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              i === 0 ? 'bg-primary text-white' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Jobs table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Role</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Department</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Location</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Applicants</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Salary</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Posted</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-5 py-3.5">
                  <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{job.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{job.type}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${deptColors[job.department] || 'bg-muted text-muted-foreground'}`}>
                    {job.department}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    {job.applicants}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="text-sm text-foreground font-medium">{job.salary}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {job.posted}
                  </div>
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
    </AppShell>
  )
}
