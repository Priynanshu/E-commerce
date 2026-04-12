import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOrder from '../hooks/useOrder'
import OrderStatusBadge from '../components/ui/OrderStatusBadge'
import { useEffect } from 'react'

const Orders = () => {
  const { orders, fetchMyOrdersHook, cancelOrderHook, orderLoading } = useOrder()

  useEffect(() => {
    fetchMyOrdersHook()
  }, [])

  if (!orders.length) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ fontSize: 64 }}>📦</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)' }}>No orders yet</h2>
      <Link to="/products"><button className="btn-primary" style={{ padding: '12px 28px', borderRadius: 10, fontSize: 14 }}>Start Shopping</button></Link>
    </div>
  )

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 28 }}>
          My <span className="gradient-text">Orders</span>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map((order) => (
            <div key={order._id} className="glass-card" style={{ padding: '20px 24px', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Order #{order._id.toUpperCase()}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              {/* Items */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
                {order.items.map((item, idx) => (
                  <div key={item.product?._id || idx} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 10, padding: '8px 12px', flexShrink: 0 }}>
                    <img src={item.product?.images?.[0] || 'https://via.placeholder.com/40'} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product?.name || 'Deleted Product'}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>
                  Total: ${order.totalAmount.toFixed(2)}
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={`/orders/${order._id}`}>
                    <button className="btn-secondary" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 12 }}>View Details</button>
                  </Link>
                  {(order.status === 'pending' || order.status === 'processing') && (
                    <button
                      onClick={() => cancelOrderHook(order._id)}
                      style={{ padding: '8px 16px', borderRadius: 8, fontSize: 12, background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.4)', color: '#ff6584', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,101,132,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,101,132,0.1)'}
                    >Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
