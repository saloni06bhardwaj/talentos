import { activityFeed } from '@/lib/data'
import { UserPlus, Video, FileText, CheckCircle, CalendarDays, Briefcase } from 'lucide-react'

const typeConfig: Record<string, { icon: typeof UserPlus; color: string; bg: string }> = {
  hire: { icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  interview: { icon: Video, color: 'text-violet-600', bg: 'bg-violet-50' },
  review: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  onboard: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
  leave: { icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
  job: { icon: Briefcase, color: 'text-slate-600', bg: 'bg-slate-50' },
}

export function ActivityTimeline() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground text-sm">Activity Feed</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Recent actions across your team</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {activityFeed.map((item, idx) => {
          const cfg = typeConfig[item.type] || typeConfig.job
          const Icon = cfg.icon
          return (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors">
              <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-semibold">{item.user}</span>{' '}
                  <span className="text-muted-foreground">{item.action}</span>
                </p>
                <span className="text-[11px] text-muted-foreground/70">{item.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
