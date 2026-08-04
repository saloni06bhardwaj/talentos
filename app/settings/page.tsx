'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { Button } from '@/components/ui/button'
import {
  User, Building2, Bell, Shield, CreditCard, Puzzle, Globe, Save,
  Camera, ChevronRight, Check, Mail, Smartphone,
  Zap, Lock, Eye, EyeOff, LogOut, Trash2, Link2, Code2
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'profile' | 'organization' | 'notifications' | 'security' | 'billing' | 'integrations'

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
]

function Toggle2({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative w-9 h-5 rounded-full transition-colors duration-200',
        enabled ? 'bg-primary' : 'bg-muted-foreground/30'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
          enabled ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  )
}

function SettingsSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function SettingsRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b border-border last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [notifs, setNotifs] = useState({
    newCandidate: true,
    interviewReminder: true,
    offerAccepted: true,
    employeeLeave: false,
    weeklyDigest: true,
    payrollProcessed: true,
    slackNotifs: true,
    emailNotifs: true,
    mobileNotifs: false,
  })

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account and workspace preferences"
      actions={
        <Button
          size="sm"
          className={cn(
            'h-8 text-xs gap-1.5 transition-all',
            saved ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'
          )}
          onClick={handleSave}
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      }
    >
      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* ─── PROFILE ─── */}
          {activeTab === 'profile' && (
            <>
              <SettingsSection title="Personal Information" description="Update your name, email, and profile photo">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">LP</span>
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Lisa Park</p>
                    <p className="text-xs text-muted-foreground">HR Director</p>
                    <button className="mt-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors">Upload new photo</button>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', value: 'Lisa' },
                    { label: 'Last Name', value: 'Park' },
                    { label: 'Email Address', value: 'lisa.park@company.com' },
                    { label: 'Phone Number', value: '+1 (415) 555-0123' },
                    { label: 'Job Title', value: 'HR Director' },
                    { label: 'Location', value: 'San Francisco, CA' },
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{label}</label>
                      <input
                        defaultValue={value}
                        className="w-full h-9 px-3 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="HR Director with 10+ years of experience building high-performance teams at fast-growing tech companies."
                    className="w-full px-3 py-2.5 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                  />
                </div>
              </SettingsSection>

              <SettingsSection title="Preferences" description="Customize your experience">
                <SettingsRow label="Language" description="Interface display language">
                  <select className="h-8 px-2.5 text-xs bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </SettingsRow>
                <SettingsRow label="Timezone" description="Used for scheduling and reports">
                  <select className="h-8 px-2.5 text-xs bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>UTC</option>
                  </select>
                </SettingsRow>
                <SettingsRow label="Date Format" description="How dates are displayed across the platform">
                  <select className="h-8 px-2.5 text-xs bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </SettingsRow>
              </SettingsSection>
            </>
          )}

          {/* ─── ORGANIZATION ─── */}
          {activeTab === 'organization' && (
            <>
              <SettingsSection title="Company Profile" description="Information about your organization">
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Acme Corp</p>
                    <p className="text-xs text-muted-foreground">acme.talentos.app</p>
                    <button className="mt-1 text-xs text-primary hover:text-primary/80 font-medium">Change logo</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Company Name', value: 'Acme Corp' },
                    { label: 'Industry', value: 'Technology' },
                    { label: 'Company Size', value: '151–200 employees' },
                    { label: 'Founded', value: '2018' },
                    { label: 'Headquarters', value: 'San Francisco, CA' },
                    { label: 'Website', value: 'https://acme.com' },
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{label}</label>
                      <input
                        defaultValue={value}
                        className="w-full h-9 px-3 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="Team Members & Access" description="Manage who has access to TalentOS">
                <div className="space-y-2">
                  {[
                    { name: 'Lisa Park', email: 'lisa.park@company.com', role: 'Admin', avatar: 'LP' },
                    { name: 'James Wilson', email: 'james.w@company.com', role: 'Manager', avatar: 'JW' },
                    { name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Member', avatar: 'SC' },
                    { name: 'Marcus Rivera', email: 'marcus.r@company.com', role: 'Member', avatar: 'MR' },
                  ].map((member) => (
                    <div key={member.email} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">{member.avatar}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'text-[11px] font-semibold px-2 py-0.5 rounded-md',
                          member.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        )}>
                          {member.role}
                        </span>
                        <button className="text-xs text-muted-foreground hover:text-foreground">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full h-9 border-2 border-dashed border-border rounded-lg text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                  + Invite team member
                </button>
              </SettingsSection>
            </>
          )}

          {/* ─── NOTIFICATIONS ─── */}
          {activeTab === 'notifications' && (
            <>
              <SettingsSection title="Email Notifications" description="Choose what updates you receive by email">
                {(Object.entries({
                  newCandidate: { label: 'New candidate application', description: 'When a new candidate applies to an open role' },
                  interviewReminder: { label: 'Interview reminders', description: '30 minutes before a scheduled interview' },
                  offerAccepted: { label: 'Offer accepted', description: 'When a candidate accepts or declines an offer' },
                  employeeLeave: { label: 'Leave requests', description: 'When an employee submits a leave request' },
                  weeklyDigest: { label: 'Weekly hiring digest', description: 'Summary of hiring activity every Monday' },
                  payrollProcessed: { label: 'Payroll processed', description: 'Confirmation when payroll run is complete' },
                }) as [keyof typeof notifs, { label: string; description: string }][]).map(([key, { label, description }]) => (
                  <SettingsRow key={key} label={label} description={description}>
                    <Toggle2 enabled={notifs[key]} onToggle={() => toggleNotif(key)} />
                  </SettingsRow>
                ))}
              </SettingsSection>

              <SettingsSection title="Notification Channels" description="How you receive your notifications">
                <SettingsRow label="Email notifications" description="lisa.park@company.com">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Toggle2 enabled={notifs.emailNotifs} onToggle={() => toggleNotif('emailNotifs')} />
                  </div>
                </SettingsRow>
                <SettingsRow label="Slack notifications" description="Connected to #hr-alerts">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                    <Toggle2 enabled={notifs.slackNotifs} onToggle={() => toggleNotif('slackNotifs')} />
                  </div>
                </SettingsRow>
                <SettingsRow label="Mobile push notifications" description="TalentOS mobile app">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <Toggle2 enabled={notifs.mobileNotifs} onToggle={() => toggleNotif('mobileNotifs')} />
                  </div>
                </SettingsRow>
              </SettingsSection>
            </>
          )}

          {/* ─── SECURITY ─── */}
          {activeTab === 'security' && (
            <>
              <SettingsSection title="Password" description="Keep your account secure with a strong password">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                        className="w-full h-9 px-3 pr-10 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full h-9 px-3 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full h-9 px-3 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs h-8">
                    <Lock className="w-3.5 h-3.5 mr-1.5" />
                    Update Password
                  </Button>
                </div>
              </SettingsSection>

              <SettingsSection title="Two-Factor Authentication" description="Add an extra layer of security to your account">
                <SettingsRow label="Authenticator App" description="Use an app like Google Authenticator">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Enabled</span>
                    <button className="text-xs text-primary font-medium hover:text-primary/80">Manage</button>
                  </div>
                </SettingsRow>
                <SettingsRow label="SMS Backup" description="Receive a code via text message">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Not set up</span>
                    <button className="text-xs text-primary font-medium hover:text-primary/80">Set up</button>
                  </div>
                </SettingsRow>
              </SettingsSection>

              <SettingsSection title="Active Sessions" description="Manage devices that are signed into your account">
                <div className="space-y-2">
                  {[
                    { device: 'MacBook Pro — Chrome 121', location: 'San Francisco, CA', time: 'Active now', current: true },
                    { device: 'iPhone 15 — Safari', location: 'San Francisco, CA', time: '2 hours ago', current: false },
                    { device: 'Windows PC — Edge', location: 'Seattle, WA', time: '3 days ago', current: false },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{s.device}</span>
                          {s.current && <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Current</span>}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.location} · {s.time}</div>
                      </div>
                      {!s.current && (
                        <button className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                          <LogOut className="w-3 h-3" />
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </SettingsSection>

              <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                <h3 className="font-semibold text-red-700 text-sm mb-1">Danger Zone</h3>
                <p className="text-xs text-red-600/80 mb-3">These actions are irreversible. Please proceed with caution.</p>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete account
                </button>
              </div>
            </>
          )}

          {/* ─── BILLING ─── */}
          {activeTab === 'billing' && (
            <>
              <SettingsSection title="Current Plan" description="Manage your subscription">
                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-bold text-foreground">Pro Plan</span>
                      <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Current</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">$249 / month · Up to 500 employees</div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">Upgrade</Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Employees', used: '174', limit: '500' },
                    { label: 'Active Jobs', used: '23', limit: 'Unlimited' },
                    { label: 'AI Queries', used: '1,840', limit: '5,000 / mo' },
                  ].map((s) => (
                    <div key={s.label} className="p-3 bg-muted/40 rounded-lg">
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">{s.used}</div>
                      <div className="text-[10px] text-muted-foreground">of {s.limit}</div>
                    </div>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title="Payment Method" description="Manage your billing information">
                <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">VISA</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Visa ending in 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 04/2027</div>
                    </div>
                  </div>
                  <button className="text-xs text-primary font-medium hover:text-primary/80">Update</button>
                </div>
                <button className="w-full h-9 border-2 border-dashed border-border rounded-lg text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                  + Add payment method
                </button>
              </SettingsSection>

              <SettingsSection title="Billing History" description="Download past invoices">
                <div className="space-y-1">
                  {[
                    { date: 'January 2025', amount: '$249.00', status: 'Paid' },
                    { date: 'December 2024', amount: '$249.00', status: 'Paid' },
                    { date: 'November 2024', amount: '$249.00', status: 'Paid' },
                    { date: 'October 2024', amount: '$249.00', status: 'Paid' },
                  ].map((inv) => (
                    <div key={inv.date} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="text-sm font-medium text-foreground">{inv.date}</div>
                        <div className="text-xs text-muted-foreground">{inv.amount}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{inv.status}</span>
                        <button className="text-xs text-primary font-medium hover:text-primary/80">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </SettingsSection>
            </>
          )}

          {/* ─── INTEGRATIONS ─── */}
          {activeTab === 'integrations' && (
            <SettingsSection title="Connected Apps" description="Manage third-party integrations">
              <div className="space-y-3">
                {[
                  { name: 'Slack', description: 'Team notifications and alerts', icon: Link2, connected: true, color: 'text-violet-600', bg: 'bg-violet-50' },
                  { name: 'GitHub', description: 'Link PRs to technical hiring', icon: Code2, connected: true, color: 'text-foreground', bg: 'bg-muted' },
                  { name: 'Google Workspace', description: 'Calendar sync and SSO', icon: Globe, connected: true, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { name: 'Greenhouse', description: 'Sync candidate data from ATS', icon: Building2, connected: false, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { name: 'BambooHR', description: 'Two-way employee data sync', icon: Building2, connected: false, color: 'text-red-600', bg: 'bg-red-50' },
                  { name: 'Zoom', description: 'Launch interviews from the platform', icon: Zap, connected: false, color: 'text-blue-500', bg: 'bg-blue-50' },
                ].map((integration) => {
                  const Icon = integration.icon
                  return (
                    <div key={integration.name} className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${integration.bg} flex items-center justify-center`}>
                          <Icon className={`w-4.5 h-4.5 ${integration.color}`} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{integration.name}</div>
                          <div className="text-xs text-muted-foreground">{integration.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        {integration.connected ? (
                          <>
                            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Connected</span>
                            <button className="text-xs text-muted-foreground hover:text-red-500 font-medium transition-colors">Disconnect</button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" className="h-7 text-xs px-3">Connect</Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </SettingsSection>
          )}

        </div>
      </div>
    </AppShell>
  )
}
