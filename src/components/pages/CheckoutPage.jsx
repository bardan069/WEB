import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle } from 'react-icons/fa';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
      navigate('/', { state: { paymentSuccess: true } });
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)', paddingTop: 100, paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 2, background: 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(201,79,124,0.10)', padding: 40 }}>
          <h2 style={{ color: '#c94f7c', marginBottom: 28, fontWeight: 700, fontSize: 28 }}>Checkout</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ position: 'relative' }}>
              <FaUser style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" style={{ width: '100%', padding: '12px 12px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, marginBottom: 0 }} />
            </div>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address" style={{ width: '100%', padding: '12px 12px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, marginBottom: 0 }} />
            </div>
            <div style={{ position: 'relative' }}>
              <FaMapMarkerAlt style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
              <input name="address" value={form.address} onChange={handleChange} required placeholder="Delivery Address" style={{ width: '100%', padding: '12px 12px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, marginBottom: 0 }} />
            </div>
            <div style={{ position: 'relative' }}>
              <FaPhone style={{ position: 'absolute', left: 12, top: 13, color: '#c94f7c' }} />
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" style={{ width: '100%', padding: '12px 12px 12px 38px', borderRadius: 8, border: '1.5px solid #e9b6d0', fontSize: 16, marginBottom: 0 }} />
            </div>
            <button type="submit" style={{ marginTop: 10, width: '100%', background: 'linear-gradient(90deg, #c94f7c 0%, #b85c8b 100%)', color: 'white', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #fbeaec', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }} disabled={loading}>
              {loading ? 'Processing Payment...' : <><FaCheckCircle style={{ fontSize: 20 }} /> Confirm Payment</>}
            </button>
          </form>
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(201,79,124,0.10)', padding: 32, position: 'sticky', top: 120 }}>
          <h3 style={{ color: '#b85c8b', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 18 }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fbeaec', borderRadius: 10, padding: 10 }}>
                <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px #e9b6d0' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#c94f7c', fontWeight: 600, fontSize: 15 }}>{item.name}</div>
                  <div style={{ color: '#b85c8b', fontWeight: 500, fontSize: 14 }}>{item.price} x {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#b85c8b', fontWeight: 600, fontSize: 20, marginBottom: 8 }}>Total: <span style={{ color: '#c94f7c', fontWeight: 700 }}>${getCartTotal().toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 