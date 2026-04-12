import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { adminStats } from '../../data/dummy'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'
import useAuth from '../../hooks/useAuth'
import useProduct from '../../hooks/useProduct'

const AdminDashboard = () => {
  const orders = useSelector((s) => s.order.orders)
  const revenue = orders.reduce((s, o) => s + o.totalAmount, 0)

  const {allUsers} = useAuth()
  const {totalProducts} = useProduct()

  const stats = [
    { label: 'Total Revenue', value: `$${revenue.toFixed(2)}`, icon: '💰', color: '#10b981', delta: '+12.4%' },
    { label: 'Total Orders', value: orders.length, icon: '📦', color: 'var(--accent)', delta: '+8.1%' },
    { label: 'Total Users', value: allUsers, icon: '👥', color: '#3b82f6', delta: '+5.3%' },
    { label: 'Products', value: totalProducts, icon: '🏷️', color: '#f59e0b', delta: 'Active' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Admin <span className="gradient-text">Dashboard</span></h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, marginBottom: 36 }}>
          {stats.map((s) => (
            <div key={s.label} className="glass-card" style={{ padding: '22px 24px', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>{s.delta}</span>
              </div>
              <p style={{ fontSize: 28, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Manage Products', to: '/admin/products', icon: '🏷️', desc: 'Add, edit, and delete products' },
            { label: 'Manage Orders', to: '/admin/orders', icon: '📦', desc: 'View and update order statuses' },
          ].map((link) => (
            <Link key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '20px 24px', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{link.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{link.label}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h2>
            <Link to="/admin/orders" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['ID', 'Date', 'Amount', 'Items', 'Status'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{order._id.toUpperCase().slice(-6)}</td>
                    <td style={{ padding: '12px', fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px', fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>${order.totalAmount.toFixed(2)}</td>
                    <td style={{ padding: '12px', fontSize: 12, color: 'var(--text-secondary)' }}>{order.items.length}</td>
                    <td style={{ padding: '12px' }}><OrderStatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
