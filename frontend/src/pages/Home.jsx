import React, { useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Real imports
import { fetchAllProducts } from '../features/product/productSlice'
import ProductCard from '../components/ui/ProductCard'

const heroFeatures = [
  { icon: '🚀', text: 'Free Shipping Over $50' },
  { icon: '🔄', text: '30-Day Returns' },
  { icon: '🛡️', text: '2-Year Warranty' },
  { icon: '💳', text: 'Secure Payments' },
]

const categoryImages = {
  Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
  Clothing:    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
  Footwear:    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
  'Home & Living': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
}

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const heroRef = useRef(null)

  // Real data from Redux
  const { products, productLoading } = useSelector((state) => state.product)

  useEffect(() => {
    // Agar products nahi hain toh fetch karo
    if (products.length === 0) {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, products.length])

  // Get real featured products (first 4)
  const featuredProducts = useMemo(() => products.slice(0, 4), [products])

  // Get dynamic categories from real products
  const dynamicCategories = useMemo(() => {
    return [...new Set(products.map(p => p.category))].filter(Boolean);
  }, [products]);

  const handleCategoryClick = (cat) => {
    // Navigate to products with category filter logic
    navigate(`/products?category=${cat}`)
  }

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(108,99,255,0.3) 0%, rgba(10,10,20,0) 60%), var(--bg-primary)',
        padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,101,132,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div className="animate-fadeInUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6c63ff', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em' }}>NEXORA EXCLUSIVE 2026</span>
            </div>

            <h1 style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', fontWeight: 900, lineHeight: 1.08, marginBottom: 20, letterSpacing: '-2px' }}>
              Shop the{' '}
              <span className="gradient-text">Future</span>
              <br />of Style.
            </h1>

            <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Discover premium products curated for the modern lifestyle. From cutting-edge tech to timeless fashion — all in one place.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link to="/products">
                <button className="btn-primary animate-pulse-glow" style={{ padding: '16px 36px', borderRadius: 12, fontSize: 16 }}>
                  Shop Now →
                </button>
              </Link>
              <Link to="/products">
                <button className="btn-secondary" style={{ padding: '16px 36px', borderRadius: 12, fontSize: 16 }}>
                  Browse All
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {heroFeatures.map((f) => (
                <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{f.icon}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image grid */}
          <div className="animate-fadeInUp delay-200" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" alt="hero1" style={{ borderRadius: 16, width: '100%', height: 200, objectFit: 'cover', border: '1px solid var(--border)' }} />
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" alt="hero2" style={{ borderRadius: 16, width: '100%', height: 140, objectFit: 'cover', border: '1px solid var(--border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" alt="hero3" style={{ borderRadius: 16, width: '100%', height: 160, objectFit: 'cover', border: '1px solid var(--border)' }} />
              <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" alt="hero4" style={{ borderRadius: 16, width: '100%', height: 180, objectFit: 'cover', border: '1px solid var(--border)' }} />
            </div>
            {/* Floating stats card */}
            <div style={{
              position: 'absolute', bottom: -20, left: -20, background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: 16, padding: '16px 24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
            }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>12.5K+</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Happy Customers</p>
            </div>
            <div style={{
              position: 'absolute', top: -10, right: -10, background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: 16, padding: '12px 20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>4.9</p>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Avg. Rating</p>
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 768px) { section > div { grid-template-columns: 1fr !important; } section > div > div:last-child { display: none !important; } }`}</style>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.5px' }}>
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Explore our curated collections</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {dynamicCategories.length > 0 ? (
                dynamicCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      style={{
                        position: 'relative', height: 160, borderRadius: 16, overflow: 'hidden',
                        border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--bg-card)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(108,99,255,0.25)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      {categoryImages[cat] ? (
                          <img src={categoryImages[cat]} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #6c63ff11, #ff658411)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>📦</div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,10,20,0.8) 0%, rgba(10,10,20,0.1) 100%)' }} />
                      <p style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>{cat}</p>
                    </button>
                  ))
            ) : (
                <p style={{textAlign: 'center', width: '100%', color: 'var(--text-muted)'}}>Loading categories...</p>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
                Trending <span className="gradient-text">Products</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Hand-picked for you</p>
            </div>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 10, fontSize: 13 }}>View All →</button>
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {productLoading ? (
                [1,2,3,4].map(n => <div key={n} style={{height: 300, background: 'var(--bg-secondary)', borderRadius: 16, animate: 'pulse 1.5s infinite'}} />)
            ) : (
                featuredProducts.map((p, i) => (
                  <div key={p._id} className={`animate-fadeInUp`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    <ProductCard product={p} />
                  </div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* ── WHY US BANNER ──────────────────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(108,99,255,0.12) 0%, var(--bg-secondary) 70%)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.5px' }}>
              Why Choose <span className="gradient-text">Nexora?</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: '🚀', title: 'Fast Delivery', desc: 'Same-day delivery available for orders placed before 2 PM in select areas.' },
              { icon: '🛡️', title: 'Genuine Products', desc: 'Every item is quality-checked and sourced directly from official manufacturers.' },
              { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free 30-day return policy. No questions asked.' },
              { icon: '💎', title: 'Premium Quality', desc: 'Only the best make it to our shelves. Uncompromising on quality.' },
            ].map((item) => (
              <div key={item.title} className="glass-card" style={{ padding: '28px 24px', textAlign: 'center', transition: 'transform 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
            Stay in the <span className="gradient-text">Loop</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
            Subscribe to get exclusive deals, new arrivals, and trend alerts — straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <input type="email" placeholder="Enter your email" className="input-field" style={{ maxWidth: 320 }} required />
            <button type="submit" className="btn-primary" style={{ padding: '12px 24px', borderRadius: 10, whiteSpace: 'nowrap' }}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home