import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  const sections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', to: '/products' },
        { label: 'Electronics', to: '/products?category=Electronics' },
        { label: 'Clothing', to: '/products?category=Clothing' },
        { label: 'Accessories', to: '/products?category=Accessories' },
      ]
    },
    {
      title: 'Account',
      links: [
        { label: 'My Profile', to: '/profile' },
        { label: 'My Orders', to: '/orders' },
        { label: 'Wishlist', to: '/wishlist' },
        { label: 'Cart', to: '/cart' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', to: '#' },
        { label: 'Returns & Refunds', to: '#' },
        { label: 'Track Order', to: '/orders' },
        { label: 'Contact Us', to: '#' },
      ]
    },
  ]

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, color: 'white',
              }}>N</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
                Nexora<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>
              Premium products, curated for the modern lifestyle. Shop with confidence.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Twitter', 'Instagram', 'GitHub'].map((s) => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: 11, fontWeight: 600, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} style={{
                      fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
              Get the latest deals and new arrivals straight to your inbox.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field"
                style={{ fontSize: 13, borderRadius: 8 }}
              />
              <button className="btn-primary" style={{ padding: '12px 16px', borderRadius: 8, whiteSpace: 'nowrap', fontSize: 13 }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            © {year} Nexora. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
