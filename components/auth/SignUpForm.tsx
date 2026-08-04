'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignupRightPanel } from '@/components/signup/signup-right-panel'

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── LEFT — Signup Form ─────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 xl:px-24 max-w-2xl">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-12">
          <div className="w-8 h-8 rounded-[10px] bg-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-slate-900">TalentOS</span>
          <span className="ml-1 text-[11px] font-medium text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
            AI-Powered HR
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight text-balance">
            Create your workspace
          </h1>
          <p className="mt-2 text-slate-500 text-[14px] leading-relaxed">
            Set up TalentOS for your team in under 2 minutes.
          </p>
        </div>

        {/* Google SSO */}
        <button
          type="button"
          className="w-full h-11 flex items-center justify-center gap-3 border border-slate-200 rounded-xl bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm mb-6 group"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-[12px] text-slate-400 font-medium">or sign up with email</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" action="/dashboard">
          {/* Row: Company + Full Name */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Company Name"
              id="company"
              type="text"
              placeholder="Acme Corp"
              autoComplete="organization"
            />
            <FormField
              label="Full Name"
              id="name"
              type="text"
              placeholder="Sarah Chen"
              autoComplete="name"
            />
          </div>

          {/* Work Email */}
          <FormField
            label="Work Email"
            id="email"
            type="email"
            placeholder="sarah@acme.com"
            autoComplete="email"
          />

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-[12px] font-semibold text-slate-600 tracking-wide uppercase">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className="w-full h-10 px-3.5 pr-10 text-[14px] text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-300 hover:border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="confirm" className="block text-[12px] font-semibold text-slate-600 tracking-wide uppercase">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className="w-full h-10 px-3.5 pr-10 text-[14px] text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-300 hover:border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-1">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreed}
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-4.5 h-4.5 shrink-0 rounded-md border transition-all ${
                agreed
                  ? 'bg-[#7c3aed] border-[#7c3aed] shadow-sm shadow-purple-500/30'
                  : 'bg-white border-slate-300 hover:border-slate-400'
              }`}
            >
              {agreed && <Check className="w-3 h-3 text-white mx-auto" strokeWidth={3} />}
            </button>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-purple-600 font-medium hover:text-purple-700 underline underline-offset-2 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-600 font-medium hover:text-purple-700 underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-11 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[14px] font-semibold rounded-xl shadow-md shadow-purple-500/25 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-px active:translate-y-0"
            >
              Create Workspace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        {/* Sign in link */}
        <p className="mt-8 text-center text-[13px] text-slate-500">
          Already have an account?{' '}
          <Link href="/" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            Sign In
          </Link>
        </p>
      </div>

      {/* ── RIGHT — Illustration Panel ─────────────────────── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <SignupRightPanel />
      </div>
    </div>
  )
}

/* ─── Small helpers ─────────────────────────────────────────── */

function FormField({
  label,
  id,
  type,
  placeholder,
  autoComplete,
}: {
  label: string
  id: string
  type: string
  placeholder: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[12px] font-semibold text-slate-600 tracking-wide uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full h-10 px-3.5 text-[14px] text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-300 hover:border-slate-300"
      />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
