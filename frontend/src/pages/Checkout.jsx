import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPaymentMethod } from '../features/payment/paymentSlice'
import useCart from '../hooks/useCart'
import useOrder from '../hooks/useOrder'
import useAddress from '../hooks/useAddress'

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { value: 'upi', label: 'UPI / Net Banking', icon: '📱' },
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {addAddressHook} = useAddress()

  const { cartItems, totalPrice, clearCartHook } = useCart()
  const { createOrderHook, orderLoading } = useOrder()
  const { addresses, selectedAddressId } = useSelector((s) => s.address)
  const { selectedMethod } = useSelector((s) => s.payment)
  const [step, setStep] = useState(1) // 1=Address, 2=Payment, 3=Review
  const [addingAddr, setAddingAddr] = useState(false)
  const [newAddr, setNewAddr] = useState({ street: '', city: '', state: '', pinCode: '', phone: '' })
  const [placed, setPlaced] = useState(false)

  const shipping = totalPrice >= 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax
  const selectedAddr = addresses.find((a) => a._id === selectedAddressId)

  const handleAddAddress = () => {
    if (!newAddr.street || !newAddr.city) return
    const addr = { ...newAddr, _id: 'a' + Date.now(), user: 'u1', pinCode: Number(newAddr.pinCode), phone: Number(newAddr.phone) }
    dispatch(addAddressHook(addr))
    dispatch(selectAddress(addr._id))
    setAddingAddr(false)
    setNewAddr({ street: '', city: '', state: '', pinCode: '', phone: '' })
  }

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        address: selectedAddressId,
        fromCart: true,
        paymentMethod: selectedMethod || 'cod'
      }
      
      const res = await createOrderHook(orderData)
      if (res.success) {
        clearCartHook()
        setPlaced(true)
        setTimeout(() => navigate('/orders'), 2500)
      }
    } catch (error) {
      console.error("Order placement failed:", error)
    }
  }

  if (placed) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: 72, animation: 'fadeInUp 0.5s ease' }}>🎉</div>
      <h2 style={{ fontSize: 28, fontWeight: 800 }}>Order Placed!</h2>
      <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>Redirecting to your orders...</p>
    </div>
  )

  if (cartItems.length === 0) { navigate('/cart'); return null }

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 32 }}>Checkout</h1>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36 }}>
          {['Address', 'Payment', 'Review'].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step > i + 1 ? '#10b981' : step === i + 1 ? 'var(--accent)' : 'var(--bg-card)',
                  border: step >= i + 1 ? 'none' : '1px solid var(--border)',
                  fontSize: 14, fontWeight: 700, color: step >= i + 1 ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.3s',
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 11, color: step === i + 1 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? '#10b981' : 'var(--border)', margin: '0 8px', marginBottom: 22, transition: 'background 0.3s' }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>
          {/* Main Content */}
          <div>
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="glass-card animate-fadeIn" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Select Delivery Address</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  {addresses.map((addr) => (
                    <div key={addr._id} onClick={() => dispatch(selectAddress(addr._id))} style={{
                      padding: 16, borderRadius: 12,
                      border: selectedAddressId === addr._id ? '2px solid var(--accent)' : '1px solid var(--border)',
                      background: selectedAddressId === addr._id ? 'rgba(108,99,255,0.08)' : 'var(--bg-secondary)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${selectedAddressId === addr._id ? 'var(--accent)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {selectedAddressId === addr._id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{addr.street}</p>
                          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{addr.city}, {addr.state} - {addr.pinCode}</p>
                          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>📞 {addr.phone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {addingAddr ? (
                  <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>New Address</h4>
                    {[
                      { key: 'street', placeholder: 'Street Address', full: true },
                      { key: 'city', placeholder: 'City' },
                      { key: 'state', placeholder: 'State' },
                      { key: 'pinCode', placeholder: 'PIN Code' },
                      { key: 'phone', placeholder: 'Phone Number' },
                    ].map((f) => (
                      <input key={f.key} placeholder={f.placeholder} value={newAddr[f.key]} onChange={(e) => setNewAddr({ ...newAddr, [f.key]: e.target.value })} className="input-field" style={{ marginBottom: 10, fontSize: 13 }} />
                    ))}
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={handleAddAddress} className="btn-primary" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13 }}>Save Address</button>
                      <button onClick={() => setAddingAddr(false)} className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13 }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAddingAddr(true)} className="btn-secondary" style={{ padding: '10px 16px', borderRadius: 8, fontSize: 13, marginBottom: 20 }}>+ Add New Address</button>
                )}

                <button onClick={() => setStep(2)} className="btn-primary" style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14 }} disabled={!selectedAddressId}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="glass-card animate-fadeIn" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {paymentMethods.map((m) => (
                    <div key={m.value} onClick={() => dispatch(setPaymentMethod(m.value))} style={{
                      padding: 16, borderRadius: 12, cursor: 'pointer',
                      border: selectedMethod === m.value ? '2px solid var(--accent)' : '1px solid var(--border)',
                      background: selectedMethod === m.value ? 'rgba(108,99,255,0.08)' : 'var(--bg-secondary)',
                      display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s',
                    }}>
                      <span style={{ fontSize: 22 }}>{m.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: selectedMethod === m.value ? 600 : 400, color: selectedMethod === m.value ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(1)} className="btn-secondary" style={{ padding: '13px 20px', borderRadius: 10, fontSize: 14 }}>← Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary" style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14 }}>Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="glass-card animate-fadeIn" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Review Your Order</h3>
                <div style={{ marginBottom: 20 }}>
                  {cartItems.map((item, idx) => (
                    <div key={item.product?._id || idx} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                      <img src={item.product?.images?.[0] || 'https://via.placeholder.com/56'} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.product?.name || 'Unknown Product'}</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(2)} className="btn-secondary" style={{ padding: '13px 20px', borderRadius: 10, fontSize: 14 }}>← Back</button>
                  <button onClick={handlePlaceOrder} className="btn-primary" style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14 }}>🎉 Place Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="glass-card" style={{ padding: 20, alignSelf: 'start', position: 'sticky', top: 88 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Order Summary</h3>
            {cartItems.slice(0, 3).map((i) => (
              <div key={i.product._id} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <img src={i.product.images[0]} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>{i.product.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>×{i.quantity}</p>
                </div>
              </div>
            ))}
            {cartItems.length > 3 && <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>+{cartItems.length - 3} more</p>}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              {[['Subtotal', `$${totalPrice.toFixed(2)}`], ['Shipping', shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`], ['Tax', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, paddingTop: 8, borderTop: '1px solid var(--border)', marginTop: 4 }}>
                <span>Total</span><span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ div[style*="grid-template-columns: 1fr 320px"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

export default Checkout
