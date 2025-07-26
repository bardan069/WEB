import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/gifts/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>;
  if (!product) return <div style={{ padding: 40 }}>Product not found.</div>;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fbeaec 0%, #f7e1f3 60%, #e0bcd5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 0 40px 0',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 32,
        boxShadow: '0 8px 32px #fbeaec',
        padding: 48,
        maxWidth: 900,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 48,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 24px',
        position: 'relative',
      }}>
        <img
          src={product.images && product.images[0] ? `http://localhost:3000${product.images[0]}` : ''}
          alt={product.name || 'Gift image'}
          style={{
            width: 320,
            height: 320,
            objectFit: 'cover',
            borderRadius: 24,
            boxShadow: '0 4px 24px #fbeaec',
            background: '#fbeaec',
            border: '4px solid #fff',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ color: '#c94f7c', fontWeight: 900, fontSize: 38, marginBottom: 12, letterSpacing: 1 }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
            <span style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', borderRadius: 12, padding: '8px 28px', fontWeight: 800, fontSize: 22, boxShadow: '0 2px 8px #fbeaec' }}>{product.price} NRS</span>
            <span style={{ color: '#888', fontSize: 18, fontWeight: 600 }}>Rating: <span style={{ color: '#ffd700', fontWeight: 800 }}>{product.rating}</span></span>
          </div>
          <p style={{ color: '#555', fontSize: 20, marginBottom: 32, lineHeight: 1.6 }}>{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            style={{
              background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
              color: 'white',
              border: 'none',
              borderRadius: 14,
              padding: '18px 48px',
              fontWeight: 800,
              fontSize: 22,
              boxShadow: '0 2px 16px #fbeaec',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginTop: 12,
              outline: 'none',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 