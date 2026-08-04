'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { candidates as initialCandidates } from '@/lib/data'
import { Star, MoreHorizontal, MapPin, Briefcase, ChevronRight, X, FileText, Mail, Phone, Calendar } from 'lucide-react'

type Stage = 'applied' | 'screening' | 'interview' | 'offer'

const columns: { id: Stage; label: string; color: string; bg: string; border: string }[] = [
  { id: 'applied', label: 'Applied', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'screening', label: 'Screening', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { id: 'interview', label: 'Interview', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  { id: 'offer', label: 'Offer', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
]

const scoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-600 bg-emerald-50'
  if (score >= 75) return 'text-amber-600 bg-amber-50'
  return 'text-slate-500 bg-slate-50'
}

type Candidate = typeof initialCandidates[0]

export function AtsBoard() {
  const [cards, setCards] = useState<Record<Stage, Candidate[]>>(() => {
    const map: Record<Stage, Candidate[]> = { applied: [], screening: [], interview: [], offer: [] }
    initialCandidates.forEach((c) => {
      const stage = c.stage as Stage
      if (map[stage]) map[stage].push(c)
    })
    return map
  })

  const [selected, setSelected] = useState<Candidate | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const srcCol = source.droppableId as Stage
    const dstCol = destination.droppableId as Stage
    const newCards = { ...cards }
    const [moved] = newCards[srcCol].splice(source.index, 1)
    newCards[dstCol].splice(destination.index, 0, { ...moved, stage: dstCol })
    setCards(newCards)
  }

  const totalCards = Object.values(cards).flat().length

  return (
    <div className="flex gap-4 h-full">
      {/* Board */}
      <div className="flex-1 overflow-x-auto">
        {/* Search bar */}
        <div className="flex items-center gap-3 mb-4">
          <input
            className="w-64 h-8 px-3 text-xs bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="text-xs text-muted-foreground">{totalCards} candidates</span>

          <div className="ml-auto flex items-center gap-2">
            {columns.map((col) => (
              <div key={col.id} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${col.bg.replace('bg-', 'bg-').replace('-50', '-400')}`} />
                <span className="text-xs text-muted-foreground">{col.label} ({cards[col.id].length})</span>
              </div>
            ))}
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 pb-4">
            {columns.map((col) => {
              const filtered = cards[col.id].filter(
                (c) => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase())
              )
              return (
                <div key={col.id} className="w-64 shrink-0">
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${col.bg} ${col.color} border ${col.border}`}>
                        {col.label}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">{cards[col.id].length}</span>
                    </div>
                    <button className="w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>

                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] space-y-2.5 p-2 rounded-xl transition-colors ${
                          snapshot.isDraggingOver ? 'bg-primary/5 border-2 border-dashed border-primary/30' : 'bg-muted/30'
                        }`}
                      >
                        {filtered.map((c, idx) => (
                          <Draggable key={c.id} draggableId={String(c.id)} index={idx}>
                            {(prov, snap) => (
                              <div
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                                onClick={() => setSelected(c)}
                                className={`bg-card border border-border rounded-lg p-3 cursor-pointer select-none transition-all duration-150 ${
                                  snap.isDragging ? 'shadow-lg shadow-primary/10 scale-[1.02] border-primary/30' : 'hover:border-primary/30 hover:shadow-sm'
                                } ${selected?.id === c.id ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}
                              >
                                <div className="flex items-start justify-between gap-1 mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                      <span className="text-[9px] font-bold text-primary">{c.avatar}</span>
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold text-foreground leading-tight">{c.name}</div>
                                      <div className="text-[10px] text-muted-foreground">{c.experience}</div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                  >
                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-1 mb-2">
                                  <Briefcase className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                                  <span className="text-[10px] text-muted-foreground truncate">{c.role}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-muted-foreground/60" />
                                    <span className="text-[10px] text-muted-foreground">{c.location}</span>
                                  </div>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${scoreColor(c.score)}`}>
                                    {c.score}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="w-72 shrink-0 bg-card border border-border rounded-xl p-5 overflow-y-auto">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{selected.avatar}</span>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{selected.name}</div>
                <div className="text-xs text-muted-foreground">{selected.role}</div>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Score bar */}
          <div className="p-3 bg-primary/5 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">AI Match Score</span>
              <span className="text-sm font-bold text-primary">{selected.score}%</span>
            </div>
            <div className="w-full h-1.5 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${selected.score}%` }} />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 text-xs">
            {[
              { icon: Mail, label: 'Email', value: selected.email },
              { icon: MapPin, label: 'Location', value: selected.location },
              { icon: Briefcase, label: 'Experience', value: selected.experience },
              { icon: Calendar, label: 'Applied', value: selected.applied },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider">{label}</div>
                  <div className="text-foreground font-medium mt-0.5 break-all">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-5 space-y-2">
            <button className="w-full h-8 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              Move to Next Stage
            </button>
            <button className="w-full h-8 bg-muted text-foreground text-xs font-medium rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              View Resume
            </button>
          </div>

          {/* Notes */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Interviewer Notes</div>
            <textarea
              className="w-full h-20 text-xs bg-muted/50 border border-border rounded-lg p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
              placeholder="Add notes about this candidate..."
            />
          </div>

          {/* Stars */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Rating</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="text-muted-foreground/40 hover:text-amber-400 transition-colors">
                  <Star className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
