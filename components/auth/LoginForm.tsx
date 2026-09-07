'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    setLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
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
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-500 text-[14px]">Sign in to your TalentOS workspace.</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[12px] font-semibold text-slate-600 tracking-wide uppercase">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="sarah@acme.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3.5 text-[14px] text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-300 hover:border-slate-300"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-[12px] font-semibold text-slate-600 tracking-wide uppercase">
                Password
              </label>
              <Link href="/forgot-password" className="text-[12px] text-purple-600 font-medium hover:text-purple-700 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Error */}
          {error && <p className="text-[13px] text-red-500">{error}</p>}

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[14px] font-semibold rounded-xl shadow-md shadow-purple-500/25 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </form>

        {/* Sign up link */}
        <p className="mt-8 text-center text-[13px] text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            Create workspace
          </Link>
        </p>
      </div>
    </div>
  )
}
