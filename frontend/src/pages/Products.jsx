import React, { useMemo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/ui/ProductCard'
import useProduct from '../hooks/useProduct'
import { useNavigate, useLocation } from 'react-router-dom'
// Agar aapne filter ke liye Redux use kiya hai toh ye imports chahiye honge:
// import { setCategory, setSearch, setSortBy } from '../features/filter/filterSlice'

const Products = () => {
  const { products, productLoading, error, fetchAllProductsHook } = useProduct()
  const location = useLocation()
  
  // Helper to get query params
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'All'
  const initialSearch = queryParams.get('search') || ''
  
  // Local State for Filters
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState('default')
  
  useEffect(() => {
    const params = {}
    if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory
    if (searchQuery) params.search = searchQuery
    if (sortBy && sortBy !== 'default') params.sort = sortBy

    const timer = setTimeout(() => {
        fetchAllProductsHook(params)
    }, 400)

    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery, sortBy, fetchAllProductsHook])

  // Simple static list for categories (can be dynamic too)
  const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Beauty']

  const filtered = products 

  if (productLoading && products.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader">Loading Products...</div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>
            All <span className="gradient-text">Products</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {filtered.length} products found{selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 28 }}>

        {/* Sidebar Filters */}
        <aside style={{ width: 240, flexShrink: 0 }}>
          <div className="glass-card" style={{ padding: 20, position: 'sticky', top: 88 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>
              Categories
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)} // Local state update
                  style={{
                    background: selectedCategory === cat ? 'rgba(108,99,255,0.1)' : 'transparent',
                    border: '1px solid transparent',
                    borderColor: selectedCategory === cat ? 'rgba(108,99,255,0.2)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                    borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
                    fontSize: 13, fontWeight: selectedCategory === cat ? 600 : 400, transition: 'all 0.2s',
                  }}
                >{cat}</button>
              ))}
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>Sort By</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { label: 'Default', value: 'default' },
                  { label: 'Price: Low → High', value: 'price-asc' },
                  { label: 'Price: High → Low', value: 'price-desc' },
                  { label: 'Top Rated', value: 'rating' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    style={{
                      background: sortBy === opt.value ? 'rgba(108,99,255,0.1)' : 'transparent',
                      color: sortBy === opt.value ? 'var(--accent)' : 'var(--text-secondary)',
                      borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
                      fontSize: 13, transition: 'all 0.2s', border: '1px solid transparent'
                    }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Section */}
        <div style={{ flex: 1 }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: 24 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name or category..."
              className="input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 46, width: '100%', height: 48, borderRadius: 12 }}
            />
          </div>

          {error && <p style={{ color: '#ff6584', marginBottom: 20 }}>{error}</p>}

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0', background: 'var(--bg-secondary)', borderRadius: 20, border: '1px dashed var(--border)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No products found</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Try adjusting your filters or search term.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSortBy('default'); }}
                style={{ marginTop: 20, background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}
              >Clear all filters</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {filtered.map((p) => <ProductCard key={p._id}  product={p} />)}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .gradient-text { background: linear-gradient(135deg, #6c63ff, #ff6584); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @media (max-width: 900px) { aside { display: none !important; } }
      `}</style>
    </div>
  )
}

export default Products;