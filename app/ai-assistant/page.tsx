'use client'

import { useState, useRef, useEffect } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { Send, Sparkles, RefreshCw, Copy, ThumbsUp, ThumbsDown, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Role = 'user' | 'assistant'

interface Message {
  id: string
  role: Role
  content: string
  timestamp: string
}

const quickActions = [
  'Draft an offer letter for a Senior Engineer',
  'Summarize this week\'s hiring activity',
  'Which departments have the highest turnover?',
  'Create an onboarding checklist for new hires',
  'Compare compensation vs market benchmarks',
  'Generate a performance review template',
]

const historyItems = [
  { label: 'Offer letter for Jordan Lee', time: '2h ago' },
  { label: 'Q4 hiring pipeline summary', time: '1d ago' },
  { label: 'Engineering compensation review', time: '2d ago' },
  { label: 'Onboarding checklist updates', time: '3d ago' },
  { label: 'HR policy FAQ answers', time: '5d ago' },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI HR Assistant. I can help you draft job descriptions, analyze hiring data, create performance reviews, answer HR policy questions, and much more.\n\nWhat can I help you with today?",
    timestamp: '09:00 AM',
  },
]

const botResponses: Record<string, string> = {
  default: "I've analyzed your request and here's what I found based on your TalentOS data:\n\nBased on the current hiring pipeline, you have **94 candidates** actively in the interview process across 5 open roles. The average time-to-hire is currently **18 days**, which is 2 days better than last month.\n\nWould you like me to generate a detailed breakdown by department or role?",
  offer: "Here's a draft offer letter for you:\n\n---\n\n**OFFER OF EMPLOYMENT**\n\nDear [Candidate Name],\n\nWe are pleased to offer you the position of **Senior Frontend Engineer** at Acme Corp, reporting to James Wilson, Engineering Manager.\n\n**Compensation:** $160,000 per year\n**Start Date:** [Date]\n**Location:** San Francisco, CA (Hybrid)\n\nThis offer is contingent upon successful completion of background check and reference verification.\n\nPlease sign and return this letter by [Date].\n\nBest regards,\nLisa Park\nHR Director, Acme Corp\n\n---\n\nShall I customize any details?",
  onboarding: "Here's a comprehensive onboarding checklist:\n\n**Day 1 — Welcome**\n- [ ] Set up workstation and accounts\n- [ ] Complete I-9 and tax forms\n- [ ] Office tour and team introductions\n- [ ] Review employee handbook\n\n**Week 1 — Foundation**\n- [ ] 1:1 with direct manager\n- [ ] Meet key stakeholders\n- [ ] Review 30-60-90 day plan\n- [ ] Complete security training\n\n**Month 1 — Ramp-up**\n- [ ] Complete role-specific training\n- [ ] First project milestone\n- [ ] 30-day check-in with HR\n\nWould you like to add department-specific tasks?",
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('offer') || lower.includes('letter')) return botResponses.offer
  if (lower.includes('onboard') || lower.includes('checklist')) return botResponses.onboarding
  return botResponses.default
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text?: string) => {
    const content = text || input.trim()
    if (!content) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1400))

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getResponse(content),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, botMsg])
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <AppShell
      title="AI HR Assistant"
      subtitle="Powered by TalentOS AI"
      actions={
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => setMessages(initialMessages)}>
          <RefreshCw className="w-3.5 h-3.5" />
          New Chat
        </Button>
      }
    >
      <div className="flex gap-4 h-[calc(100vh-10rem)]">
        {/* Sidebar — History */}
        <div className="w-52 shrink-0 flex flex-col gap-4">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 px-1">Quick Actions</div>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => sendMessage(action)}
                  className="w-full text-left text-xs px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors leading-snug"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-card rounded-xl border border-border p-3 flex-1 overflow-y-auto">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 px-1">Recent</div>
            <div className="space-y-1">
              {historyItems.map((h) => (
                <button
                  key={h.label}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <div className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-snug truncate">{h.label}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5 text-muted-foreground/50" />
                    <span className="text-[10px] text-muted-foreground/60">{h.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-card rounded-xl border border-border overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  msg.role === 'assistant' ? 'bg-primary' : 'bg-primary/20'
                }`}>
                  {msg.role === 'assistant' ? (
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>

                <div className={`flex-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'assistant'
                      ? 'bg-muted/60 text-foreground rounded-tl-sm'
                      : 'bg-primary text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Actions */}
                  <div className={`flex items-center gap-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] text-muted-foreground/60">{msg.timestamp}</span>
                    {msg.role === 'assistant' && (
                      <>
                        <button onClick={() => copyMessage(msg.id, msg.content)} className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                          <Copy className="w-2.5 h-2.5" />
                        </button>
                        <button className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground/50 hover:text-emerald-500 transition-colors">
                          <ThumbsUp className="w-2.5 h-2.5" />
                        </button>
                        <button className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground/50 hover:text-red-400 transition-colors">
                          <ThumbsDown className="w-2.5 h-2.5" />
                        </button>
                        {copiedId === msg.id && <span className="text-[10px] text-emerald-500 font-medium">Copied!</span>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-muted/60 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-end gap-3 bg-muted/40 rounded-xl border border-border px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your workforce, draft documents, analyze HR data..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none leading-relaxed max-h-32 min-h-[1.5rem]"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
              AI can make mistakes. Review important information carefully.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
