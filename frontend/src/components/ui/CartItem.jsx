import React from 'react'
import useCart from '../../hooks/useCart'

const CartItem = ({ item }) => {
  const { removeFromCartHook, updateCartItemHook} = useCart()
  console.log("CartItem render:", item) // Debugging log to check the item prop
  return (
    <div style={{
      display: 'flex', gap: 16, padding: '16px',
      background: 'var(--bg-card)', borderRadius: 12,
      border: '1px solid var(--border)', transition: 'border-color 0.2s',
      alignItems: 'center',
    }}>
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.product.name}
        </h4>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{item.product.category}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          {/* Quantity Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <button
              onClick={() => updateCartItemHook({ productId: item.product._id, quantity: item.quantity - 1 })}
              disabled={item.quantity <= 1}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', color: 'var(--text-secondary)', fontSize: 16, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >−</button>
            <span style={{ padding: '6px 12px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', minWidth: 40, textAlign: 'center' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateCartItemHook({ productId: item.product._id, quantity: item.quantity + 1 })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', color: 'var(--text-secondary)', fontSize: 16, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >+</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCartHook(item.product._id)}
              style={{ background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#ff6584', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,101,132,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,101,132,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"/><path d="m19,6-.867,12.142A2,2,0,0,1,16.138,20H7.862a2,2,0,0,1-1.995-1.858L5,6M10,11v6M14,11v6M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
