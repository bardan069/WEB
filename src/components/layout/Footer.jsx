import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#fbeaec',
      color: '#b85c8b',
      textAlign: 'center',
      padding: '28px 0 18px 0',
      fontSize: 16,
      borderTop: '1.5px solid #f3e6ee',
      marginTop: 40,
    }}>
      <div style={{ marginBottom: 8 }}>
        <a href="/" style={{ color: '#c94f7c', margin: '0 14px', textDecoration: 'none', fontWeight: 500 }}>Home</a>
        <a href="/products" style={{ color: '#c94f7c', margin: '0 14px', textDecoration: 'none', fontWeight: 500 }}>Products</a>
        <a href="/about" style={{ color: '#c94f7c', margin: '0 14px', textDecoration: 'none', fontWeight: 500 }}>About</a>
        <a href="/contact" style={{ color: '#c94f7c', margin: '0 14px', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
      </div>
      <div style={{ fontSize: 15, color: '#b85c8b' }}>
        &copy; {new Date().getFullYear()} Heart & Hues. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 