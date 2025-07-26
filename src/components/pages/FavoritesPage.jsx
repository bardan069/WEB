import React, { useState, useEffect } from 'react';
import StylishFooter from '../layout/StylishFooter';
import { FaHeart, FaTrash } from 'react-icons/fa';

const getFavoritesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch {
    return [];
  }
};

const setFavoritesToStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
  window.__FAVORITES_COUNT__ = favorites.length;
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(getFavoritesFromStorage());

  useEffect(() => {
    setFavoritesToStorage(favorites);
  }, [favorites]);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <section style={{ maxWidth: 1200, margin: '120px auto 40px', padding: '0 16px 60px' }}>
        <h2 style={{ color: '#b85c8b', fontSize: 32, fontWeight: 800, marginBottom: 32, textAlign: 'center', letterSpacing: 1 }}>Your Favorites</h2>
        {favorites.length === 0 ? (
          <div style={{ color: '#888', fontSize: 20, textAlign: 'center', padding: 40 }}>No favorite gifts yet. Add some from the homepage!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 36 }}>
            {favorites.map(product => (
              <div key={product.id} style={{
                background: 'rgba(255,255,255,0.85)',
                borderRadius: 22,
                boxShadow: '0 4px 24px 0 #fbeaec',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1.5px solid #f3e6ee',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}>
                <img src={product.images && product.images[0] ? `http://localhost:3000${product.images[0]}` : (product.image || '')} alt={product.name} style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 16, marginBottom: 18, boxShadow: '0 2px 8px #fbeaec' }} />
                <div style={{ fontWeight: 800, fontSize: 22, color: '#c94f7c', marginBottom: 8 }}>{product.name}</div>
                <div style={{ color: '#b85c8b', fontWeight: 700, fontSize: 19, marginBottom: 8 }}>{product.price}</div>
                <button
                  onClick={() => removeFavorite(product.id)}
                  style={{
                    background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 30,
                    padding: '8px 22px',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 2px 8px #fbeaec',
                    marginTop: 12,
                  }}
                >
                  <FaTrash style={{ color: 'white', fontSize: 18 }} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <StylishFooter />
    </div>
  );
};

export default FavoritesPage; 