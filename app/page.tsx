import Link from 'next/link'
import { Sparkles, ArrowRight, Users, BarChart3, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-sidebar flex-col justify-between p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">TalentOS</span>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight text-balance">
              The HR OS for modern teams
            </h2>
            <p className="mt-4 text-white/60 text-base leading-relaxed">
              Hire faster, manage smarter, and grow your best people — all in one AI-powered platform.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-3">
            {[
              { icon: Brain, label: 'AI-powered hiring insights' },
              { icon: Users, label: '360° employee management' },
              { icon: BarChart3, label: 'Real-time workforce analytics' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white/80 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['SC', 'MR', 'AJ', 'JW'].map((init) => (
                <div key={init} className="w-8 h-8 rounded-full bg-primary/30 border-2 border-sidebar flex items-center justify-center">
                  <span className="text-[9px] font-bold text-primary">{init}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs">Trusted by 2,400+ HR teams worldwide</p>
          </div>
        </div>

        <p className="text-white/30 text-xs relative z-10">© 2025 TalentOS. All rights reserved.</p>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-7">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TalentOS</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="mt-1 text-muted-foreground text-sm">Sign in to your HR dashboard</p>
          </div>

          <form className="space-y-4" action="/dashboard">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Email</label>
              <input
                type="email"
                defaultValue="lisa.park@company.com"
                className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all placeholder:text-muted-foreground"
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                defaultValue="••••••••••"
                className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all placeholder:text-muted-foreground"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" defaultChecked className="w-4 h-4 rounded accent-primary" />
              <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me for 30 days</label>
            </div>

            <Link href="/dashboard">
              <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-md shadow-primary/20 mt-1">
                Sign in
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-background text-xs text-muted-foreground">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google SSO', 'Microsoft SSO'].map((provider) => (
              <button
                key={provider}
                className="h-10 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New to TalentOS?{' '}
            <a href="#" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Start free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
