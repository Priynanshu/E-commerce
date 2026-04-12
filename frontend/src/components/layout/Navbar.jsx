import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useWishlist from '../../hooks/useWishlist'
import useCart from '../../hooks/useCart'
import { logoutSlice } from '../../features/auth/authSlice'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuthenticated, user } = useSelector((s) => s.auth)
  const {wishlistProducts} = useWishlist()
  const wishlistCount = wishlistProducts.length
  const {cartCount} = useCart()
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    dispatch(logoutSlice())
    navigate('/login')
  }

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Orders', to: '/orders' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10, 10, 20, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(108,99,255,0.15)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: 'white', boxShadow: '0 4px 14px rgba(108,99,255,0.4)'
          }}>N</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Nexora<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: location.pathname === link.to ? 'var(--accent)' : 'var(--text-secondary)',
                background: location.pathname === link.to ? 'rgba(108,99,255,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (location.pathname !== link.to) e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { if (location.pathname !== link.to) e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Search Icon */}
          <button onClick={() => navigate('/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Cart */}
          <Link to="/cart" style={{ position: 'relative', textDecoration: 'none', padding: 8, borderRadius: 8, color: 'var(--text-secondary)', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: 'var(--accent2)', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" style={{ position: 'relative', textDecoration: 'none', padding: 8, borderRadius: 8, color: 'var(--text-secondary)', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: '#ff6584', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{ background: 'none', border: '2px solid var(--border)', cursor: 'pointer', borderRadius: '50%', padding: 0, overflow: 'hidden', width: 36, height: 36, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <img src={user?.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
              {profileOpen && (
                <div className="animate-fadeIn" style={{
                  position: 'absolute', right: 0, top: 46, width: 200,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: 8, boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                }}>
                  <div style={{ padding: '8px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user?.email}</p>
                  </div>
                  {[
                    { label: 'My Profile', to: '/profile' },
                    { label: 'My Orders', to: '/orders' },
                    ...(user?.role === 'admin' ? [{ label: 'Admin Panel', to: '/admin' }] : []),
                  ].map((item) => (
                    <Link key={item.to} to={item.to} style={{
                      display: 'block', padding: '9px 12px', fontSize: 13, color: 'var(--text-secondary)',
                      textDecoration: 'none', borderRadius: 8, transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.1)'; e.currentTarget.style.color = 'var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >{item.label}</Link>
                  ))}
                  <button onClick={handleLogout} style={{
                    display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', fontSize: 13,
                    color: '#ff6584', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,101,132,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13 }}>Sign In</button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text-primary)', display: 'none' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {menuOpen ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></> : <><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="animate-fadeInUp" style={{
          background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '16px 24px',
        }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={{
              display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 500,
              color: location.pathname === link.to ? 'var(--accent)' : 'var(--text-secondary)',
              textDecoration: 'none', borderBottom: '1px solid var(--border)',
            }}>{link.label}</Link>
          ))}
          {!isAuthenticated && (
            <Link to="/login" style={{ display: 'block', marginTop: 16, textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 8, fontSize: 15 }}>Sign In</button>
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
