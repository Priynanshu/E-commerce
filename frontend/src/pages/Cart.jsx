import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/ui/CartItem'
import useCart from '../hooks/useCart'

const Cart = () => {
  const {cartItems, totalPrice, getCartHook, clearCartHook} = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    getCartHook()
  }, [])

  if (cartItems.length === 0) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ fontSize: 64 }}>🛒</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)' }}>Your cart is empty</h2>
      <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Looks like you haven't added anything yet.</p>
      <Link to="/products"><button className="btn-primary" style={{ padding: '12px 28px', borderRadius: 10, fontSize: 14 }}>Start Shopping</button></Link>
    </div>
  )

  const shipping = totalPrice >= 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 28 }}>
          Shopping <span className="gradient-text">Cart</span>
          <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 10 }}>({cartItems.length} items)</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cartItems.map((item) => <CartItem key={item.product._id} item={item} />)}
            <button
              onClick={() => clearCartHook()}
              style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 8, padding: '8px 16px', fontSize: 12, color: '#ff6584', cursor: 'pointer', marginTop: 8, transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,101,132,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >Clear Cart</button>
          </div>

          {/* Summary */}
          <div>
            <div className="glass-card" style={{ padding: 24, position: 'sticky', top: 88 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
              {[
                { label: 'Subtotal', value: `$${totalPrice.toFixed(2)}` },
                { label: 'Shipping', value: shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}` },
                { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: 'var(--text-secondary)' }}>
                  <span>{label}</span>
                  <span style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 4, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800 }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: 11, color: '#10b981', marginTop: 8 }}>Add ${(50 - totalPrice).toFixed(2)} more for free shipping!</p>
              )}
              <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 10, fontSize: 15, marginTop: 20 }}>
                Proceed to Checkout →
              </button>
              <Link to="/products"><button className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 13, marginTop: 10 }}>Continue Shopping</button></Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

export default Cart
