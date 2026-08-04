import { AppShell } from '@/components/layout/app-shell'
import { AtsBoard } from '@/components/ats/ats-board'
import { Button } from '@/components/ui/button'
import { Plus, Filter, SlidersHorizontal } from 'lucide-react'

export default function ATSPage() {
  return (
    <AppShell
      title="ATS Board"
      subtitle="Drag and drop candidates through your hiring pipeline"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90">
            <Plus className="w-3.5 h-3.5" />
            Add Candidate
          </Button>
        </div>
      }
    >
      <AtsBoard />
    </AppShell>
  )
}
