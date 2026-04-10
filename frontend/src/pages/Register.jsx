import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Register = () => {
  const {registerHook, loading, error} = useAuth()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault()
    registerHook(form)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.2) 0%, var(--bg-primary) 70%)',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #6c63ff, #ff6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: 'white', boxShadow: '0 8px 24px rgba(108,99,255,0.4)' }}>N</div>
            <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)' }}>Nexora<span style={{ color: 'var(--accent)' }}>.</span></span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Join thousands of happy shoppers</p>
        </div>

        <div className="glass-card animate-fadeInUp" style={{ padding: '36px 32px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Create Account</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
            Already have one? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
          </p>

          {error && (
            <div style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: '#ff6584' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter Your Name' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>{field.label}</label>
                  <input
                  name={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="input-field"
                  value={form[field.key]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 10, fontSize: 15, marginTop: 8 }}>
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
