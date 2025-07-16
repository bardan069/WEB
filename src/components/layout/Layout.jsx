import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, maxWidth: 1200, margin: '100px auto 0', padding: '32px 16px', background: 'white', borderRadius: 18, boxShadow: '0 6px 32px rgba(201,79,124,0.10)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 