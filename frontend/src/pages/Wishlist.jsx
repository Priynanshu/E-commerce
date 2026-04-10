import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import StarRating from '../components/ui/StarRating'
import useWishlist from '../hooks/useWishlist'
import useCart from '../hooks/useCart'

const Wishlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { wishlistProducts, wishlistLoading, getWishlistHook, removeFromWishlistHook } = useWishlist()
  const {addToCartHook} = useCart()
  // Agar backend populate nahi karta toh allProducts se match karo
  const allProducts = useSelector((s) => s.product.products)
  
  const displayProducts = wishlistProducts?.length > 0 && typeof wishlistProducts[0] === 'string'
    ? allProducts.filter(p => wishlistProducts.includes(p._id))  // IDs hain
    : wishlistProducts  // Already objects hain

  useEffect(() => {
    getWishlistHook()
  }, [])

  if (wishlistLoading) return <div style={{paddingTop: 100, textAlign: 'center'}}>Loading Wishlist...</div>

  if (!displayProducts || displayProducts.length === 0) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ fontSize: 64 }}>💛</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)' }}>Your wishlist is empty</h2>
      <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Save items you love for later.</p>
      <Link to="/products"><button className="btn-primary" style={{ padding: '12px 28px', borderRadius: 10, fontSize: 14 }}>Browse Products</button></Link>
    </div>
  )

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 28 }}>
          My <span className="gradient-text">Wishlist</span>
          <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 10 }}>
            ({displayProducts.length} items)
          </span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {displayProducts.map((product) => (
            <div key={product._id} style={{ background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', height: 200 }}>
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/300'} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <button 
                  onClick={() => removeFromWishlistHook(product._id)} 
                  style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,101,132,0.15)', border: '1px solid #ff6584', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff6584" stroke="#ff6584" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4 }}>
                    {product.name}
                  </h3>
                </Link>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>
                    ₹{product.price?.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => addToCartHook(product)} 
                    className="btn-primary" 
                    style={{ padding: '8px 14px', borderRadius: 8, fontSize: 12 }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
