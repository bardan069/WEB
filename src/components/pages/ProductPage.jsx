import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const mockProducts = [
  { id: 1, name: 'Personalized Photo Frame', price: '$29.99', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.8, description: 'A beautiful personalized photo frame for any occasion.' },
  { id: 2, name: 'Luxury Jewelry Box', price: '$79.99', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop', rating: 4.9, description: 'Elegant jewelry box for precious keepsakes.' },
  { id: 3, name: 'Artisan Candle Set', price: '$45.99', image: 'https://i.pinimg.com/736x/72/12/64/72126429b92657d394b54d73974a859d.jpg', rating: 4.7, description: 'Handmade candles with delightful scents.' },
  { id: 4, name: 'Custom Coffee Mug', price: '$19.99', image: 'https://i.pinimg.com/736x/fa/29/20/fa292073229fdf4b2d48cb93b34a6438.jpg', rating: 4.6, description: 'Personalized mug for coffee lovers.' },
];

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) return <div style={{ padding: 40 }}>Product not found.</div>;

  return (
    <div style={{ maxWidth: 700, margin: '120px auto 40px', background: 'white', borderRadius: 15, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: 40, fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <img src={product.image} alt={product.name} style={{ width: 220, height: 220, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #fbeaec' }} />
        <div>
          <h2 style={{ color: '#c94f7c', marginBottom: 12 }}>{product.name}</h2>
          <div style={{ color: '#b85c8b', fontWeight: 500, fontSize: 20, marginBottom: 8 }}>{product.price}</div>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 18 }}>Rating: {product.rating}</div>
          <p style={{ color: '#555', marginBottom: 24 }}>{product.description}</p>
          <button onClick={() => addToCart(product)} style={{ background: '#c94f7c', color: 'white', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 16 }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 