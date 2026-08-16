'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SplineScene from '@/components/SplineScene'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      setError('Invalid credentials')
      setIsLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="login-container">
      {/* Left side — Spline 3D Scene */}
      <div className="login-spline-side">
        <SplineScene
          scene="https://prod.spline.design/6Wq1Q7YGyM-uBg18/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Floating branding overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '60px',
            zIndex: 10,
            animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards',
          }}
        >
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            Manage your<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              finances smarter.
            </span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '15px' }}>
            AI-powered accounting for modern businesses.
          </p>
        </div>
      </div>

      {/* Right side — Login Form */}
      <div className="login-form-side">
        <div className="login-card">
          <div style={{ animation: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards' }}>
            <div className="login-logo">
              Accounting<span className="sidebar-logo-accent">Pro</span>
            </div>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          {error && (
            <div
              className="badge badge-warning"
              style={{ display: 'block', marginBottom: '20px', textAlign: 'center', padding: '12px' }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards' }}
          >
            <div className="form-floating">
              <input 
                type="email" 
                className="form-input" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder=" "
                id="login-email"
              />
              <label className="form-label" htmlFor="login-email">Email Address</label>
            </div>
            <div className="form-floating">
              <input 
                type="password" 
                className="form-input" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder=" "
                id="login-password"
              />
              <label className="form-label" htmlFor="login-password">Password</label>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-neon"
              style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              disabled={isLoading}
              id="login-submit"
            >
              {isLoading ? '⟳ Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '13px',
            color: 'var(--text-muted)',
            animation: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards',
          }}>
            Demo credentials pre-filled
          </p>
        </div>
      </div>
    </div>
  )
}
