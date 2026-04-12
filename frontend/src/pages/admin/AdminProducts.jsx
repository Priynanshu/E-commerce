import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useProduct from '../../hooks/useProduct'

const AdminProducts = () => {
  const navigate = useNavigate()
  const { products, productLoading, fetchAllProductsHook, deleteProductHook } = useProduct()
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchAllProductsHook()
  }, [])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteProductHook(id)
        } catch (err) {
            console.error("Delete failed:", err)
        }
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Products</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{products.length} products</p>
          </div>
          <button 
            onClick={() => navigate('/admin/products/add')}
            className="btn-primary" 
            style={{ padding: '10px 20px', borderRadius: 10, fontSize: 13 }}
          >+ Add Product</button>
        </div>
        
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search products..." className="input-field" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 42, fontSize: 13 }} />
        </div>

        {productLoading && products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading products...</div>
        ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img src={p.images?.[0] || 'https://via.placeholder.com/40'} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-secondary)' }}>
                        <span style={{ background: 'rgba(108,99,255,0.1)', color: 'var(--accent)', padding: '3px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{p.category}</span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>₹{p.price?.toFixed(2)}</td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: p.stock <= 10 ? '#ff6584' : 'var(--text-secondary)' }}>
                        {p.stock <= 10 ? `⚠ ${p.stock}` : p.stock}
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-secondary)' }}>⭐ {p.rating || 0}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button 
                            onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                            style={{ padding: '6px 12px', borderRadius: 6, fontSize: 11, background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', color: 'var(--accent)', cursor: 'pointer' }}
                          >Edit</button>
                          <button onClick={() => handleDelete(p._id)} style={{ padding: '6px 12px', borderRadius: 6, fontSize: 11, background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', color: '#ff6584', cursor: 'pointer' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No products found matching your search.</div>
              )}
            </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
