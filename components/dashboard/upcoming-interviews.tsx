import { upcomingInterviews } from '@/lib/data'
import { Video, Calendar } from 'lucide-react'

export function UpcomingInterviews() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Interviews</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Upcoming schedule</p>
        </div>
        <Calendar className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {upcomingInterviews.map((i) => (
          <div key={i.id} className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{i.candidate}</div>
              <button className="shrink-0 w-6 h-6 rounded-md bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Video className="w-3 h-3 text-primary" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground mb-1.5 truncate">{i.role}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-primary">{i.time}</span>
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{i.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
