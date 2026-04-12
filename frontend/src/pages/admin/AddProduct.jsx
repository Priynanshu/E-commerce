import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProduct from '../../hooks/useProduct'

const AddProduct = () => {
    const navigate = useNavigate()
    const { createProductHook, productLoading, error } = useProduct()
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [''], // Array of strings (URLs)
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images]
        newImages[index] = value
        setFormData(prev => ({ ...prev, images: newImages }))
    }

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }))
    }

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, images: newImages }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createProductHook({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
            })
            navigate('/admin/products')
        } catch (err) {
            console.error("Failed to create product:", err)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 80 }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                    <button onClick={() => navigate('/admin/products')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <h1 style={{ fontSize: 28, fontWeight: 800 }}>Add New <span className="gradient-text">Product</span></h1>
                </div>

                <form className="glass-card" style={{ padding: 32 }} onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>Product Name</label>
                            <input type="text" name="name" className="input-field" placeholder="e.g. Premium Wireless Headphones" value={formData.name} onChange={handleChange} required />
                        </div>
                        
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>Description</label>
                            <textarea name="description" className="input-field" placeholder="Describe the product details..." rows="4" value={formData.description} onChange={handleChange} required style={{ height: 'auto', padding: '12px 14px' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>Price ($)</label>
                            <input type="number" name="price" className="input-field" placeholder="0.00" value={formData.price} onChange={handleChange} required />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>Initial Stock</label>
                            <input type="number" name="stock" className="input-field" placeholder="0" value={formData.stock} onChange={handleChange} required />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>Category</label>
                            <select name="category" className="input-field" value={formData.category} onChange={handleChange} required style={{ cursor: 'pointer' }}>
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Home & Garden">Home & Garden</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Product Images (URLs)</label>
                                <button type="button" onClick={addImageField} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Add Row</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {formData.images.map((url, index) => (
                                    <div key={index} style={{ display: 'flex', gap: 10 }}>
                                        <input type="text" className="input-field" placeholder="https://example.com/image.jpg" value={url} onChange={(e) => handleImageChange(index, e.target.value)} required />
                                        {formData.images.length > 1 && (
                                            <button type="button" onClick={() => removeImageField(index)} style={{ background: 'rgba(255,101,132,0.1)', border: 'none', color: '#ff6584', borderRadius: 8, width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {error && <p style={{ color: '#ff6584', fontSize: 13, marginBottom: 20 }}>{error}</p>}

                    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                        <button type="submit" className="btn-primary" disabled={productLoading} style={{ flex: 1, padding: '14px', borderRadius: 12, fontSize: 15 }}>
                            {productLoading ? 'Creating...' : 'Launch Product'}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary" style={{ flex: 1, padding: '14px', borderRadius: 12, fontSize: 15 }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
