import { AppShell } from '@/components/layout/app-shell'
import { KpiCards } from '@/components/dashboard/kpi-cards'
import { HiringFunnel } from '@/components/dashboard/hiring-funnel'
import { AttendanceChart } from '@/components/dashboard/attendance-chart'
import { RecentCandidates } from '@/components/dashboard/recent-candidates'
import { UpcomingInterviews } from '@/components/dashboard/upcoming-interviews'
import { ActivityTimeline } from '@/components/dashboard/activity-timeline'
import { Button } from '@/components/ui/button'
import { Download, Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Monday, January 22, 2025"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Link href="/recruitment">
            <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90">
              <Plus className="w-3.5 h-3.5" />
              New Job
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        <KpiCards />

        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3">
            <HiringFunnel />
          </div>
          <div className="col-span-2">
            <AttendanceChart />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <RecentCandidates />
          </div>
          <div className="col-span-1">
            <UpcomingInterviews />
          </div>
        </div>

        <ActivityTimeline />
      </div>
    </AppShell>
  )
}
