import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useOrder from '../../hooks/useOrder'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'


const AdminOrders = () => {
  const { orders, fetchAllOrdersHook, updateOrderStatusHook, orderLoading } = useOrder()

  useEffect(() => {
    fetchAllOrdersHook()
  }, [])

  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>All Orders</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>{orders.length} total orders</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Order ID', 'Date', 'Items', 'Amount', 'Status', 'Update Status'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{order._id.toUpperCase().slice(-8)}</td>
                  <td style={{ padding: '14px', fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '14px', fontSize: 12, color: 'var(--text-secondary)' }}>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                  <td style={{ padding: '14px', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>₹{order.totalAmount.toFixed(2)}</td>
                  <td style={{ padding: '14px' }}><OrderStatusBadge status={order.status} /></td>
                  <td style={{ padding: '14px' }}>
                    {order.status === 'delivered' ? (
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)' }}>Not Changeable</span>
                    ) : (
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatusHook(order._id, e.target.value)}
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 8, padding: '6px 10px', fontSize: 12, cursor: 'pointer', outline: 'none' }}
                      >
                        {statuses.map((s) => <option key={s} value={s} style={{ background: 'var(--bg-card)' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
