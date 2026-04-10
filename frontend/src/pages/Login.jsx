import React, { useState } from 'react'
import  {Link}  from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Login = () => {
 const {loginHook, loading, error} = useAuth()
   const [form, setForm] = useState({
     email: "",
     password: ""
   })
 
   const handleSubmit = (e) => {
     e.preventDefault()
     loginHook(form)
   }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 40px',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.2) 0%, var(--bg-primary) 70%)',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #6c63ff, #ff6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: 'white', boxShadow: '0 8px 24px rgba(108,99,255,0.4)' }}>N</div>
            <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)' }}>Nexora<span style={{ color: 'var(--accent)' }}>.</span></span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Welcome back — sign in to your account</p>
        </div>

        <div className="glass-card animate-fadeInUp" style={{ padding: '36px 32px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Sign In</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
          </p>

          {error && (
            <div style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: '#ff6584' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 10, fontSize: 15 }}>
             {loading ? "Sing In..." : " Sign In →"}
            </button>
          </form>

          <div style={{ marginTop: 20, position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
            <span style={{ position: 'relative', background: 'var(--bg-card)', padding: '0 12px', fontSize: 12, color: 'var(--text-muted)' }}>or</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
