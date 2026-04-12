import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAddress from '../hooks/useAddress'
import useWishlist from '../hooks/useWishlist'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {addAddressHook, deleteAddressHook} = useAddress()
  const { user } = useSelector((s) => s.auth)
  const { addresses } = useSelector((s) => s.address)
  const orders = useSelector((s) => s.order.orders)
  const {wishlistProducts} = useWishlist()
    const wishlistCount = wishlistProducts.length
  const [activeTab, setActiveTab] = useState('profile')
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [addingAddr, setAddingAddr] = useState(false)
  const [newAddr, setNewAddr] = useState({ street: '', city: '', state: '', pinCode: '', phone: '' })
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const handleAddAddress = () => {
    if (!newAddr.street || !newAddr.city) return
    dispatch(addAddressHook({ ...newAddr, _id: 'a' + Date.now(), user: 'u1', pinCode: Number(newAddr.pinCode), phone: Number(newAddr.phone) }))
    setAddingAddr(false)
    setNewAddr({ street: '', city: '', state: '', pinCode: '', phone: '' })
  }

  const tabs = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'addresses', label: 'Addresses', icon: '📍' },
    { key: 'stats', label: 'Stats', icon: '📊' },
  ]

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header card */}
        <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
          <img src={user?.profileImage} alt="Profile" style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid var(--accent)', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{user?.name}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{user?.email}</p>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: user?.role === 'admin' ? 'rgba(245,158,11,0.15)' : 'rgba(108,99,255,0.15)', color: user?.role === 'admin' ? '#f59e0b' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {user?.role}
            </span>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: 8, fontSize: 12, background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', color: '#ff6584', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'var(--bg-card)', padding: 6, borderRadius: 12, border: '1px solid var(--border)' }}>
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
              background: activeTab === tab.key ? 'var(--accent)' : 'transparent',
              color: activeTab === tab.key ? 'white' : 'var(--text-secondary)',
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="glass-card animate-fadeIn" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Personal Information</h3>
            {[
              { label: 'Full Name', key: 'name', type: 'text' },
              { label: 'Email Address', key: 'email', type: 'email' },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="input-field" />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="input-field" />
            </div>
            {saved && <p style={{ fontSize: 13, color: '#10b981', marginBottom: 10 }}>✓ Profile saved!</p>}
            <button onClick={handleSave} className="btn-primary" style={{ padding: '12px 28px', borderRadius: 10, fontSize: 14 }}>Save Changes</button>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="animate-fadeIn">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {addresses.map((addr) => (
                <div key={addr._id} className="glass-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{addr.street}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{addr.city}, {addr.state} — {addr.pinCode}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>📞 {addr.phone}</p>
                  </div>
                  <button onClick={() => dispatch(deleteAddressHook(addr._id))} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, color: '#ff6584', background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)', cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {addingAddr ? (
              <div className="glass-card" style={{ padding: 20, marginBottom: 12 }}>
                {[
                  { key: 'street', placeholder: 'Street Address' },
                  { key: 'city', placeholder: 'City' },
                  { key: 'state', placeholder: 'State' },
                  { key: 'pinCode', placeholder: 'PIN Code' },
                  { key: 'phone', placeholder: 'Phone Number' },
                ].map((f) => (
                  <input key={f.key} placeholder={f.placeholder} value={newAddr[f.key]} onChange={(e) => setNewAddr({ ...newAddr, [f.key]: e.target.value })} className="input-field" style={{ marginBottom: 10, fontSize: 13 }} />
                ))}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handleAddAddress} className="btn-primary" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13 }}>Save</button>
                  <button onClick={() => setAddingAddr(false)} className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingAddr(true)} className="btn-secondary" style={{ padding: '11px 20px', borderRadius: 10, fontSize: 13 }}>+ Add New Address</button>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Total Orders', value: orders.length, icon: '📦', color: 'var(--accent)' },
              { label: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length, icon: '✅', color: '#10b981' },
              { label: 'Pending', value: orders.filter((o) => o.status === 'pending').length, icon: '⏳', color: '#f59e0b' },
              { label: 'Cancelled', value: orders.filter((o) => o.status === 'cancelled').length, icon: '❌', color: '#ff6584' },
              { label: 'Total Spent', value: `$${orders.reduce((s, o) => s + o.totalAmount, 0).toFixed(0)}`, icon: '💰', color: 'var(--accent3)' },
              { label: 'Wishlisted', value: wishlistCount, icon: '💛', color: '#ff6584' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card" style={{ padding: '24px 20px', textAlign: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{stat.icon}</div>
                <p style={{ fontSize: 28, fontWeight: 900, color: stat.color, marginBottom: 4 }}>{stat.value}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
