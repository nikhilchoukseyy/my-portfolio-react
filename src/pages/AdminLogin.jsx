import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)))
    return () => listener.subscription.unsubscribe()
  }, [])

  if (signedIn) return <Navigate to="/admin" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (signInError) setError('Email or password is incorrect.')
    else navigate('/admin', { replace: true })
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-text-primary/10 bg-bg-secondary p-8 shadow-2xl">
        <a href="/" className="text-sm text-text-tertiary">← Back to portfolio</a>
        <h1 className="mt-6 text-3xl font-semibold">Portfolio admin</h1>
        <p className="mt-2 mb-7 text-sm opacity-70">Sign in with your admin email and password.</p>
        {!isSupabaseConfigured ? (
          <p role="alert" className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            Supabase is not connected yet. Add the project URL and publishable key to your environment variables.
          </p>
        ) : (
          <>
            <label className="mb-4 block text-sm">Email
              <input required type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-text-primary/20 bg-bg-primary px-3 py-3 outline-none focus:border-text-tertiary" />
            </label>
            <label className="mb-5 block text-sm">Password
              <input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-text-primary/20 bg-bg-primary px-3 py-3 outline-none focus:border-text-tertiary" />
            </label>
            {error && <p role="alert" className="mb-4 text-sm text-red-400">{error}</p>}
            <button disabled={loading} className="w-full rounded-lg bg-text-primary px-4 py-3 font-semibold text-bg-primary disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </>
        )}
      </form>
    </main>
  )
}
