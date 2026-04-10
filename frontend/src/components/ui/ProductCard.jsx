import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useWishlist from '../../hooks/useWishlist';
import useCart from '../../hooks/useCart';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= rating ? '#FFD700' : '#444', fontSize: '14px' }}>
        {i <= rating ? '★' : '☆'}
      </span>
    );
  }
  return <div style={{ display: 'inline-flex', gap: '2px' }}>{stars}</div>;
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const {addToCartHook} = useCart()
  
  const {addToWishlistHook, removeFromWishlistHook} = useWishlist()
  
   const wishlistItems = useSelector((state) => {
 
  return state.wishlist.wishlistProducts
})
 const isWishlisted = wishlistItems?.some((item) => item._id === product?._id) || false

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlistHook(product._id)  // dispatch useWishlist hook se ho raha hai
    } else {
      addToWishlistHook(product._id)
    }
  }

  const hasReviews = product.reviews && product.reviews.length > 0;
  const averageRating = hasReviews 
    ? Math.round(product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length) 
    : 0;

  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden',
      border: '1px solid var(--border)', transition: 'all 0.3s ease',
      display: 'flex', flexDirection: 'column', height: '100%'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(108,99,255,0.2)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <div style={{ position: 'relative', paddingTop: '80%', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
        {/* Navigation for Image too */}
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Link>
        <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(108,99,255,0.9)', color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99, zIndex: 2 }}>
          {product.category}
        </span>
        <button onClick={(e) => { e.preventDefault(); handleWishlistToggle() }} style={{ position: 'absolute', top: 10, right: 10, background: isWishlisted ? 'rgba(255,101,132,0.2)' : 'rgba(10,10,20,0.6)', border: isWishlisted ? '1px solid #ff6584' : '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? '#ff6584' : 'none'} stroke={isWishlisted ? '#ff6584' : 'white'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* ADDED 'to' PROP HERE */}
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            {product.name}
          </h3>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          {hasReviews ? <><StarRating rating={averageRating} /><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({product.reviews.length})</span></> : <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet</span>}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>₹{product.price}</span>
          <button onClick={() => addToCartHook(product, 1)} className="btn-primary" style={{ padding: '8px 14px', borderRadius: 8, fontSize: 12 }}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard