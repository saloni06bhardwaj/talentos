import Link from 'next/link'
import { Sparkles, ArrowRight, Users, BarChart3, Brain, Zap, Shield, Workflow, CheckCircle2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TalentOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered HR Platform</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              The HR OS for
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                modern teams
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hire faster, manage smarter, and grow your best people — all in one AI-powered platform. From recruitment to payroll, we've got you covered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/30 group">
                  Start free trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="font-semibold">
                  Sign in
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-border/40">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['SC', 'MR', 'AJ', 'JW'].map((init) => (
                    <div key={init} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <span className="text-[9px] font-bold text-primary">{init}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">2,400+</span> HR teams trust us</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mt-16 md:mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-card to-card/50 border border-border/40 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-6 bg-muted/40 rounded w-48" />
                    <div className="h-4 bg-muted/30 rounded w-32" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted/40 rounded w-20" />
                    <div className="h-8 bg-muted/40 rounded w-20" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 bg-muted/20 rounded-lg border border-border/40">
                      <div className="h-8 bg-muted/40 rounded w-16 mb-2" />
                      <div className="h-3 bg-muted/30 rounded w-24" />
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 p-4 bg-muted/20 rounded-lg border border-border/40 h-48" />
                  <div className="p-4 bg-muted/20 rounded-lg border border-border/40 h-48" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your entire HR workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Hiring',
                description: 'Intelligent candidate matching and automated screening to find your best fit faster.',
              },
              {
                icon: Users,
                title: 'Employee Management',
                description: '360° employee profiles, performance tracking, and development planning in one place.',
              },
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                description: 'Comprehensive workforce insights and predictive analytics to drive better decisions.',
              },
              {
                icon: Workflow,
                title: 'Workflow Automation',
                description: 'Automate repetitive tasks and streamline your entire HR process end-to-end.',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level security with SSO, encryption, and compliance with all major standards.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Built for speed with instant search, real-time updates, and seamless integrations.',
              },
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-xl border border-border/40 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32 border-t border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How it works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign up', description: 'Create your workspace in seconds' },
              { step: '02', title: 'Invite team', description: 'Add your HR team members' },
              { step: '03', title: 'Configure', description: 'Set up your workflows and templates' },
              { step: '04', title: 'Launch', description: 'Start hiring and managing talent' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-primary/20">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Loved by HR leaders</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what teams are saying about TalentOS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Head of People, TechCorp',
                content: 'TalentOS cut our hiring time in half. The AI matching is incredibly accurate.',
                avatar: 'SC',
              },
              {
                name: 'Michael Rodriguez',
                role: 'HR Director, StartupXYZ',
                content: 'Finally, an HR platform that actually understands what we need. Highly recommend!',
                avatar: 'MR',
              },
              {
                name: 'Aisha Johnson',
                role: 'VP People Ops, GrowthCo',
                content: 'The analytics dashboard gives us insights we never had before. Game-changing.',
                avatar: 'AJ',
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-xl border border-border/40 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 border-t border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$99',
                description: 'Perfect for small teams',
                features: ['Up to 50 employees', 'Basic hiring tools', 'Email support', 'Core analytics'],
              },
              {
                name: 'Professional',
                price: '$299',
                description: 'For growing companies',
                features: ['Up to 500 employees', 'Advanced AI hiring', 'Priority support', 'Advanced analytics', 'Custom workflows'],
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: ['Unlimited employees', 'Full AI suite', '24/7 support', 'Custom integrations', 'Dedicated account manager'],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary/40 bg-card shadow-lg shadow-primary/20 scale-105'
                    : 'border-border/40 bg-card hover:border-primary/20'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                </div>
                <Link href="/signup" className="w-full block mb-8">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Get started
                  </Button>
                </Link>
                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to transform your HR?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join 2,400+ companies already using TalentOS to hire faster and manage smarter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/30 group">
                Start free trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">TalentOS</span>
              </div>
              <p className="text-sm text-muted-foreground">The HR OS for modern teams.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 TalentOS. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
