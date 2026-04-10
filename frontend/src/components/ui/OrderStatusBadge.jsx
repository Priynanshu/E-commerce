import React from 'react'

const statusConfig = {
  pending:    { label: 'Pending',    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   dot: '#f59e0b' },
  processing: { label: 'Processing', color: '#6c63ff', bg: 'rgba(108,99,255,0.1)',   dot: '#6c63ff' },
  shipped:    { label: 'Shipped',    color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',   dot: '#3b82f6' },
  delivered:  { label: 'Delivered',  color: '#10b981', bg: 'rgba(16,185,129,0.1)',   dot: '#10b981' },
  cancelled:  { label: 'Cancelled',  color: '#ff6584', bg: 'rgba(255,101,132,0.1)', dot: '#ff6584' },
}

const OrderStatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: cfg.bg, color: cfg.color,
      padding: '5px 12px', borderRadius: 99,
      fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'capitalize',
      border: `1px solid ${cfg.color}30`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

export default OrderStatusBadge
