import React, { useMemo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/ui/ProductCard'
import useProduct from '../hooks/useProduct'
import { useNavigate, useLocation } from 'react-router-dom'

const Products = () => {
  const { products, productLoading, error, fetchAllProductsHook, pagination } = useProduct()
  const location = useLocation()
  
  // Helper to get query params
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'All'
  const initialSearch = queryParams.get('search') || ''
  
  // Local State for Filters
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [debounceQuery, setDebounceQuery] = useState("")
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebounceQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
}, [searchQuery])

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, debounceQuery, sortBy])
  
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 9
    }

    if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory
    if (debounceQuery) params.search = debounceQuery
    if (sortBy && sortBy !== 'default') params.sort = sortBy

    fetchAllProductsHook(params)

    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })

}, [selectedCategory, debounceQuery, sortBy, currentPage, fetchAllProductsHook])

  // Simple static list for categories (can be dynamic too)
  const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Beauty']

  const filtered = products 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

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
            {pagination?.totalProducts || 0} products found{selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
            <>
              <div 
                key={currentPage} // Trigger re-animation on page change
                className="product-grid"
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
                  gap: 24,
                  flex: 1,
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>

              {/* Pagination UI */}
              {pagination.totalPages > 1 && (
                <div style={{ 
                  marginTop: 40, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: 8,
                  background: 'var(--bg-secondary)',
                  padding: '12px 20px',
                  borderRadius: 16,
                  alignSelf: 'center',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="pagination-btn"
                    style={{ opacity: currentPage === 1 ? 0.3 : 1 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>

                  <div style={{ display: 'flex', gap: 6 }}>
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === pagination.totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="pagination-btn"
                    style={{ opacity: currentPage === pagination.totalPages ? 0.3 : 1 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        .gradient-text { background: linear-gradient(135deg, #6c63ff, #ff6584); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @media (max-width: 900px) { aside { display: none !important; } }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pagination-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-primary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
        }

        .pagination-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pagination-number:hover:not(.active) {
          background: rgba(108, 99, 255, 0.1);
          color: var(--accent);
        }

        .pagination-number.active {
          background: var(--accent);
          color: white;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default Products;