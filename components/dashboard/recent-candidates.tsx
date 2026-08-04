import Link from 'next/link'
import { candidates } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

const stageColors: Record<string, string> = {
  applied: 'bg-blue-50 text-blue-600',
  screening: 'bg-amber-50 text-amber-600',
  interview: 'bg-violet-50 text-violet-600',
  offer: 'bg-emerald-50 text-emerald-600',
}

const stageLabels: Record<string, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
}

export function RecentCandidates() {
  const recent = candidates.slice(0, 6)

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Recent Candidates</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{candidates.length} total in pipeline</p>
        </div>
        <Link href="/ats" className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {recent.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary">{c.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{c.name}</div>
              <div className="text-xs text-muted-foreground truncate">{c.role}</div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stageColors[c.stage] || 'bg-muted text-muted-foreground'}`}>
                {stageLabels[c.stage] || c.stage}
              </span>
              <span className="text-xs font-semibold text-muted-foreground w-8 text-right">{c.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
