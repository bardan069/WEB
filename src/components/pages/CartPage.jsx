import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, loading } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)', paddingTop: 100, paddingBottom: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 2, background: 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(201,79,124,0.10)', padding: 36 }}>
          <h2 style={{ color: '#c94f7c', marginBottom: 28, fontWeight: 700, fontSize: 28 }}>Your Cart</h2>
          {cart.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', padding: 60, fontSize: 18 }}>Your cart is empty.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 24, background: '#fbeaec', borderRadius: 12, padding: 18, boxShadow: '0 2px 8px #fbeaec' }}>
                  <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, boxShadow: '0 1px 4px #e9b6d0' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#c94f7c', fontWeight: 600, fontSize: 18 }}>{item.name}</div>
                    <div style={{ color: '#b85c8b', fontWeight: 500, fontSize: 16, margin: '6px 0' }}>{item.price}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: '#f7e1f3', border: 'none', borderRadius: 6, padding: 6, cursor: 'pointer' }}><FaMinus color="#c94f7c" /></button>
                    <input type="number" value={item.quantity} min={1} onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)} style={{ width: 44, textAlign: 'center', border: '1px solid #e9b6d0', borderRadius: 6, padding: 4 }} />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: '#f7e1f3', border: 'none', borderRadius: 6, padding: 6, cursor: 'pointer' }}><FaPlus color="#c94f7c" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', marginLeft: 12, cursor: 'pointer' }} title="Remove">
                    <FaTrashAlt color="#e57373" size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(201,79,124,0.10)', padding: 32, position: 'sticky', top: 120 }}>
          <h3 style={{ color: '#b85c8b', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Order Summary</h3>
          <div style={{ color: '#555', fontSize: 17, marginBottom: 18 }}>Items: <span style={{ color: '#c94f7c', fontWeight: 600 }}>{cart.reduce((count, item) => count + item.quantity, 0)}</span></div>
          <div style={{ color: '#b85c8b', fontWeight: 600, fontSize: 20, marginBottom: 28 }}>Total: <span style={{ color: '#c94f7c', fontWeight: 700 }}>${getCartTotal().toFixed(2)}</span></div>
          <button onClick={handleCheckout} style={{ width: '100%', background: 'linear-gradient(90deg, #c94f7c 0%, #b85c8b 100%)', color: 'white', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #fbeaec', transition: 'background 0.2s' }} disabled={loading || cart.length === 0}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 