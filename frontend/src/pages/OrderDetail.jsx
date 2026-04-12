import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOrder from '../hooks/useOrder'
import OrderStatusBadge from '../components/ui/OrderStatusBadge'

const orderSteps = ['pending', 'processing', 'shipped', 'delivered']

const OrderDetail = () => {
  const { id } = useParams()
  const { order, fetchOrderByIdHook, cancelOrderHook, orderLoading } = useOrder()

  useEffect(() => {
    if (id) fetchOrderByIdHook(id)
  }, [id])

  if (orderLoading) return <div style={{ paddingTop: 100, textAlign: 'center' }}>Loading Order...</div>

  if (!order) return (
    <div style={{ paddingTop: 100, textAlign: 'center', minHeight: '100vh' }}>
      <h2 style={{ color: 'var(--text-muted)' }}>Order not found.</h2>
      <Link to="/orders" style={{ color: 'var(--accent)' }}>← Back to Orders</Link>
    </div>
  )

  const currentStep = orderSteps.indexOf(order.status)

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Link to="/orders" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13 }}>← My Orders</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Order #{order._id.toUpperCase()}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Progress Tracker (only for non-cancelled) */}
        {order.status !== 'cancelled' && (
          <div className="glass-card" style={{ padding: '20px 24px', marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Order Progress</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {orderSteps.map((s, i) => (
                <React.Fragment key={s}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
                      background: i <= currentStep ? 'var(--accent)' : 'var(--bg-secondary)',
                      color: i <= currentStep ? 'white' : 'var(--text-muted)',
                      border: i <= currentStep ? 'none' : '1px solid var(--border)',
                      transition: 'all 0.3s',
                    }}>
                      {i <= currentStep ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 10, color: i <= currentStep ? 'var(--accent)' : 'var(--text-muted)', fontWeight: i === currentStep ? 700 : 400, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{s}</span>
                  </div>
                  {i < orderSteps.length - 1 && (
                    <div style={{ flex: 1, height: 2, margin: '0 6px', marginBottom: 22, background: i < currentStep ? 'var(--accent)' : 'var(--border)', transition: 'background 0.3s' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="glass-card" style={{ padding: '20px 24px', marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Items Ordered</h3>
          {order.items.map((item, idx) => (
            <div key={item.product?._id || idx} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <img src={item.product?.images?.[0] || 'https://via.placeholder.com/64'} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{item.product?.name || 'Deleted Product'}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity} × ${item.product?.price?.toFixed(2) || '0.00'}</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 14, fontSize: 18, fontWeight: 800 }}>
            Total: <span style={{ color: 'var(--accent)', marginLeft: 10 }}>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Address */}
        {order.address && (
          <div className="glass-card" style={{ padding: '20px 24px', marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Delivery Address</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {order.address.street}<br />
              {order.address.city}, {order.address.state} - {order.address.pinCode}<br />
              📞 {order.address.phone}
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          {(order.status === 'pending' || order.status === 'processing') && (
            <button
              onClick={() => cancelOrderHook(order._id)}
              style={{ padding: '12px 20px', borderRadius: 10, fontSize: 13, background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.4)', color: '#ff6584', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,101,132,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,101,132,0.1)'}
            >Cancel Order</button>
          )}
          <Link to="/products"><button className="btn-secondary" style={{ padding: '12px 20px', borderRadius: 10, fontSize: 13 }}>Shop More</button></Link>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
