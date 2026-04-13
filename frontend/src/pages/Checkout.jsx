import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setPaymentMethod } from '../features/payment/paymentSlice'
import { selectAddress } from '../features/address/addressSlice'
import useCart from '../hooks/useCart'
import useOrder from '../hooks/useOrder'
import useAddress from '../hooks/useAddress'
import usePayment from '../hooks/usePayment'

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { value: 'upi', label: 'UPI / Net Banking', icon: '📱' },
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {fetchAddressHook, addresses, selectedAddressId, addressLoading} = useAddress()
  const { cartItems, totalPrice, clearCartHook } = useCart()
  const { createOrderHook, orderLoading } = useOrder()
  const { 
    selectedMethod, 
    createPaymentHook, 
    processPaymentHook, 
    paymentLoading 
  } = usePayment()
  const { user } = useSelector((s) => s.auth)

  const [step, setStep] = useState(1) // 1=Address, 2=Payment, 3=Review
  const [placed, setPlaced] = useState(false)
  const [paymentStep, setPaymentStep] = useState('') // '', 'creating', 'processing'

  useEffect(() => {
    fetchAddressHook()
  }, [fetchAddressHook])

  const shipping = totalPrice >= 500 ? 0 : 50
  const tax = totalPrice * 0.12 // GST 12%
  const total = totalPrice + shipping + tax
  const selectedAddr = addresses.find((a) => a._id === selectedAddressId)

  const handlePlaceOrder = async () => {
    try {
      setPaymentStep('creating')
      const orderData = {
        address: selectedAddressId,
        fromCart: true,
        paymentMethod: selectedMethod || 'cod'
      }
      
      const orderRes = await createOrderHook(orderData)
      
      if (orderRes.success) {
        // Create Payment record
        const paymentRes = await createPaymentHook(orderRes.data._id, selectedMethod)
        
        if (paymentRes.success && selectedMethod !== 'cod') {
          setPaymentStep('processing')
          // Simulate Payment Processing for non-COD
          await processPaymentHook(paymentRes.data._id, true)
        }

        clearCartHook()
        setPlaced(true)
        setTimeout(() => navigate('/orders'), 3000)
      }
    } catch (error) {
      console.error("Checkout failed:", error)
      setPaymentStep('')
    }
  }

  if (placed) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: 72, animation: 'fadeInUp 0.5s ease' }}>🎉</div>
      <h2 style={{ fontSize: 28, fontWeight: 800 }}>Order Successful!</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selectedMethod === 'cod' ? 'Pay upon delivery.' : 'Payment received successfully.'}</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Redirecting to your orders...</p>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Select Delivery Address</h3>
                    <Link to="/profile" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>+ Manage in Profile</Link>
                </div>

                {addressLoading ? (
                    <p style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading addresses...</p>
                ) : addresses.length === 0 ? (
                    <div style={{ padding: '30px 20px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 12, marginBottom: 20 }}>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>No addresses found.</p>
                        <Link to="/profile"><button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13 }}>Add Address in Profile</button></Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
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
                            <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{addr.street}</p>
                            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{addr.city}, {addr.state} - {addr.pinCode}</p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )}

                <button 
                  onClick={() => setStep(2)} 
                  className="btn-primary" 
                  style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14, width: '100%', opacity: !selectedAddressId ? 0.6 : 1 }} 
                  disabled={!selectedAddressId}
                >
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24, padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12 }}>
                  <div>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Shipping to</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedAddr?.street}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selectedAddr?.city}, {selectedAddr?.pinCode}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Payment Method</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedMethod?.toUpperCase()}</p>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  {cartItems.map((item, idx) => (
                    <div key={item.product?._id || idx} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                      <img src={item.product?.images?.[0] || 'https://via.placeholder.com/56'} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.product?.name || 'Unknown Product'}</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(2)} className="btn-secondary" style={{ padding: '13px 20px', borderRadius: 10, fontSize: 14 }} disabled={orderLoading || paymentLoading}>← Back</button>
                  <button onClick={handlePlaceOrder} className="btn-primary" style={{ padding: '13px 28px', borderRadius: 10, fontSize: 14 }} disabled={orderLoading || paymentLoading}>
                    {paymentStep === 'creating' ? 'Creating Order...' : paymentStep === 'processing' ? 'Processing Payment...' : '🎉 Place Order'}
                  </button>
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
              {[['Subtotal', `₹${totalPrice.toFixed(2)}`], ['Shipping', shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`], ['Tax', `₹${tax.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, paddingTop: 8, borderTop: '1px solid var(--border)', marginTop: 4 }}>
                <span>Total</span><span style={{ color: 'var(--accent)' }}>₹{total.toFixed(2)}</span>
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
