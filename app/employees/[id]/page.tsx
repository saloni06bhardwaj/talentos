import { AppShell } from '@/components/layout/app-shell'
import { employees } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign, Users, Edit, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const skillsByDept: Record<string, string[]> = {
  Engineering: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  Product: ['Roadmapping', 'User Research', 'Figma', 'SQL', 'OKRs', 'Agile'],
  Design: ['Figma', 'Prototyping', 'Design Systems', 'Accessibility', 'Motion'],
  Analytics: ['Python', 'SQL', 'Tableau', 'dbt', 'Machine Learning'],
  Marketing: ['SEO', 'HubSpot', 'Content Strategy', 'Paid Ads', 'Analytics'],
  Sales: ['Salesforce', 'Negotiation', 'Cold Outreach', 'CRM', 'Forecasting'],
}

const performanceData = [
  { quarter: 'Q1 2024', score: 88, label: 'Exceeds' },
  { quarter: 'Q2 2024', score: 91, label: 'Exceeds' },
  { quarter: 'Q3 2024', score: 85, label: 'Meets' },
  { quarter: 'Q4 2024', score: 94, label: 'Outstanding' },
]

interface Props {
  params: Promise<{ id: string }>
}

export default async function EmployeeProfilePage({ params }: Props) {
  const { id } = await params
  const emp = employees.find((e) => e.id === parseInt(id))
  if (!emp) notFound()

  const skills = skillsByDept[emp.department] || []

  return (
    <AppShell
      title={emp.name}
      subtitle={`${emp.role} · ${emp.department}`}
      actions={
        <div className="flex items-center gap-2">
          <Link href="/employees">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
          </Link>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90">
            <Edit className="w-3.5 h-3.5" />
            Edit Profile
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-5">
        {/* Left — Profile card */}
        <div className="col-span-1 space-y-4">
          {/* Main card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-br from-primary/80 to-violet-500/80" />
            <div className="px-5 pb-5">
              <div className="-mt-8 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border-4 border-card flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{emp.avatar}</span>
                </div>
              </div>
              <div className="font-bold text-foreground text-lg leading-tight">{emp.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{emp.role}</div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-700 capitalize">{emp.status.replace('-', ' ')}</span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                {[
                  { icon: Mail, label: emp.email },
                  { icon: Phone, label: emp.phone },
                  { icon: MapPin, label: emp.location },
                  { icon: Briefcase, label: emp.department },
                  { icon: Users, label: `Reports to: ${emp.manager}` },
                  { icon: Calendar, label: `Joined: ${emp.startDate}` },
                  { icon: DollarSign, label: `$${emp.salary.toLocaleString()} / year` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-primary/10 text-primary rounded-lg">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Details */}
        <div className="col-span-2 space-y-4">
          {/* Performance */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-foreground text-sm">Performance Reviews</div>
                <div className="text-xs text-muted-foreground mt-0.5">Last 4 quarters</div>
              </div>
              <button className="text-xs text-primary font-medium hover:text-primary/80">+ Add Review</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {performanceData.map((p) => (
                <div key={p.quarter} className="p-3 bg-muted/40 rounded-lg text-center hover:bg-muted/70 transition-colors">
                  <div className="text-xl font-bold text-foreground">{p.score}</div>
                  <div className="text-[11px] text-primary font-semibold">{p.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{p.quarter}</div>
                  <div className="w-full h-1 bg-border rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time at company + quick stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Tenure', value: '2.8 yrs', sub: `Since ${emp.startDate}` },
              { label: 'PTO Balance', value: '12 days', sub: '8 used this year' },
              { label: 'Peer Rating', value: '4.7/5', sub: 'Based on 8 reviews' },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl border border-border p-4">
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs font-medium text-muted-foreground mt-0.5">{s.label}</div>
                <div className="text-[11px] text-muted-foreground/60">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Activity history */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="font-semibold text-foreground text-sm mb-4">Recent Activity</div>
            <div className="space-y-3">
              {[
                { event: 'Submitted Q4 2024 performance self-review', date: 'Jan 15, 2025', type: 'review' },
                { event: 'Completed React 19 certification course', date: 'Jan 08, 2025', type: 'training' },
                { event: 'Led technical interview for Alex Morgan', date: 'Jan 07, 2025', type: 'interview' },
                { event: 'Salary adjustment: +8% merit increase', date: 'Dec 01, 2024', type: 'salary' },
                { event: '3-year anniversary milestone', date: 'Mar 15, 2024', type: 'milestone' },
              ].map((a, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{a.event}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-foreground text-sm">Documents</div>
              <button className="text-xs text-primary font-medium hover:text-primary/80">Upload</button>
            </div>
            <div className="space-y-2">
              {['Employment Contract.pdf', 'Offer Letter.pdf', 'W-2 Form 2024.pdf', 'NDA Agreement.pdf'].map((doc) => (
                <div key={doc} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-primary">PDF</span>
                    </div>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">{doc}</span>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
