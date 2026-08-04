'use client'

import { Sparkles, TrendingUp, Users, Clock, Star, Zap, BarChart2, CheckCircle2 } from 'lucide-react'

export function SignupRightPanel() {
  return (
    <div
      className="w-full h-full flex flex-col justify-between p-10 relative"
      style={{
        background: 'linear-gradient(135deg, #0f0a1e 0%, #13082b 40%, #0d1117 100%)',
      }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute -top-30 -right-20 w-120 h-120 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.08) 55%, transparent 75%)',
        }}
      />
      <div
        className="absolute -bottom-20 -left-15 w-[320px] h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[10px] bg-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-900/50">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[15px] text-white tracking-tight">TalentOS</span>
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Headline */}
        <div>
          <h2 className="text-[32px] font-bold text-white leading-tight tracking-tight text-balance">
            Your entire HR stack,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #c4b5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              unified by AI.
            </span>
          </h2>
          <p className="mt-3 text-[14px] text-white/50 leading-relaxed max-w-xs">
            Hire faster, manage smarter, and grow your best people — all from one intelligent platform.
          </p>
        </div>

        {/* Floating analytics cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1 — Hiring Pipeline */}
          <GlassCard className="col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5 text-purple-300" />
                </div>
                <span className="text-[12px] font-semibold text-white/70 uppercase tracking-wider">Hiring Pipeline</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                +18% this month
              </span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[40, 65, 48, 72, 58, 80, 92, 75, 88, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background:
                      i >= 7
                        ? 'linear-gradient(180deg, #a78bfa, #7c3aed)'
                        : 'rgba(139,92,246,0.25)',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-white/30">Jan — Oct</span>
              <span className="text-[13px] font-bold text-white">247 open roles</span>
            </div>
          </GlassCard>

          {/* Card 2 — Headcount */}
          <GlassCard>
            <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
              <Users className="w-4 h-4 text-violet-300" />
            </div>
            <div className="text-[22px] font-bold text-white leading-none">1,284</div>
            <div className="text-[11px] text-white/40 mt-1 font-medium">Total Employees</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-semibold">+12 this week</span>
            </div>
          </GlassCard>

          {/* Card 3 — Time to Hire */}
          <GlassCard>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
              <Clock className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="text-[22px] font-bold text-white leading-none">8.4<span className="text-[13px] font-medium text-white/40 ml-1">days</span></div>
            <div className="text-[11px] text-white/40 mt-1 font-medium">Avg. Time to Hire</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-semibold">-2.1 days vs last mo.</span>
            </div>
          </GlassCard>

          {/* Card 4 — AI Score */}
          <GlassCard className="col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-purple-500/30 to-violet-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-white/60 uppercase tracking-wider">AI Candidate Match</div>
                  <div className="text-[13px] font-bold text-white mt-0.5">3 top candidates flagged today</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#13082b] overflow-hidden flex items-center justify-center text-[8px] font-bold"
                    style={{
                      background: `linear-gradient(135deg, hsl(${260 + i * 20} 60% 55%), hsl(${280 + i * 20} 70% 45%))`,
                      color: 'white',
                      marginLeft: i > 1 ? '-6px' : 0,
                    }}
                  >
                    {['SC', 'MR', 'AJ'][i - 1]}
                  </div>
                ))}
                <span className="ml-1 text-[11px] font-semibold text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-full">96% match</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Trust row */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1.5">
            {['LP', 'JK', 'RM', 'SW', 'AK'].map((init, i) => (
              <div
                key={init}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white"
                style={{
                  borderColor: '#13082b',
                  background: `hsl(${250 + i * 18} 65% 52%)`,
                }}
              >
                {init}
              </div>
            ))}
          </div>
          <p className="text-[12px] text-white/40 leading-tight">
            Trusted by <span className="text-white/70 font-semibold">2,400+</span> HR teams worldwide
          </p>
        </div>
      </div>

      {/* Feature checklist */}
      <div className="relative z-10 space-y-2.5">
        {[
          'Free 14-day trial — no credit card required',
          'GDPR & SOC 2 Type II compliant',
          'Dedicated onboarding support',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-[12px] text-white/50">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {children}
    </div>
  )
}
