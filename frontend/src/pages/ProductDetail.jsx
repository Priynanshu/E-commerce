import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import StarRating from '../components/ui/StarRating'
import useProduct from '../hooks/useProduct'
import Review from '../features/review/Review' 
import useWishlist from '../hooks/useWishlist'
import useCart from '../hooks/useCart'

const ProductDetail = () => {
  const { id } = useParams()
  // CRITICAL: Make sure useProduct takes 'id' as an argument
  const { product, productLoading } = useProduct(id) 
  const {addToCartHook} = useCart()

  const dispatch = useDispatch()
    const {wishlistProducts, addToWishlistHook, removeFromWishlistHook} = useWishlist()
  
  const wishlistItems = useSelector((state) => state.wishlist.wishlistProducts)
  const isWishlisted = wishlistItems?.some((item) => item._id === product?._id) || false
 
  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      await removeFromWishlistHook(product._id)  
    } else {
      await addToWishlistHook(product._id)
    }
  }

  const [selectedImg, setSelectedImg] = useState(0)
  const [qty, setQty] = useState(1)

  const avgRating = useMemo(() => {
    if (!product?.reviews || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(sum / product.reviews.length);
  }, [product]);

  if (productLoading) return <div style={{paddingTop: 100, textAlign: 'center'}}>Loading Product...</div>;

  if (!product) return (
    <div style={{ paddingTop: 100, textAlign: 'center', minHeight: '100vh' }}>
      <h2 style={{ color: 'var(--text-muted)' }}>Product not found.</h2>
      <Link to="/products" style={{ color: 'var(--accent)' }}>← Back to Products</Link>
    </div>
  )

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 28, fontSize: 13, color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Products</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Image Gallery */}
          <div>
            <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 12, border: '1px solid var(--border)', background: 'var(--bg-secondary)', height: 420 }}>
              <img src={product.images?.[selectedImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: 10 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)} style={{
                    width: 70, height: 70, borderRadius: 10, overflow: 'hidden',
                    border: selectedImg === i ? '2px solid var(--accent)' : '2px solid var(--border)',
                    cursor: 'pointer', padding: 0, background: 'none'
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', background: 'rgba(108,99,255,0.1)', padding: '4px 12px', borderRadius: 99 }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: 30, fontWeight: 800, margin: '16px 0 8px' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <StarRating rating={avgRating} />
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                {avgRating > 0 ? `${avgRating} (${product.reviews.length} reviews)` : "No reviews"}
              </span>
            </div>

            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <span style={{ fontSize: 40, fontWeight: 900, color: 'var(--accent)' }}>₹{product.price}</span>
              <span style={{ fontSize: 13, color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {product.stock > 0 ? `✓ In Stock (${product.stock})` : `Out of Stock`}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button
                disabled={product.stock <= 0}
                onClick={() => addToCartHook({ ...product, quantity: qty })}
                className="btn-primary"
                style={{ flex: 1, padding: '14px', borderRadius: 12, opacity: product.stock <= 0 ? 0.5 : 1 }}
              >
                🛒 Add to Cart
              </button>
              <button onClick={handleWishlistToggle} style={{ padding: '14px', borderRadius: 12, border: '1px solid var(--border)', background: isWishlisted ? 'rgba(255,101,132,0.1)' : 'transparent' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? '#ff6584' : 'none'} stroke={isWishlisted ? '#ff6584' : 'var(--text-secondary)'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <Review productId={product._id} />
      </div>
    </div>
  )
}

export default ProductDetail