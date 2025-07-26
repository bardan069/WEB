import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', background: 'none', margin: 0, padding: 0 }}>
    <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: 0, top: 0, background: '#fff', color: '#c94f7c', padding: 8, zIndex: 10000, transform: 'translateY(-200%)', transition: 'transform 0.2s' }} onFocus={e => e.target.style.transform = 'translateY(0)'} onBlur={e => e.target.style.transform = 'translateY(-200%)'}>Skip to main content</a>
    <header role="banner" aria-label="Site header">
      <Navbar />
    </header>
    <main id="main-content" role="main" tabIndex={-1} aria-label="Main content" style={{ flex: 1, outline: 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {children}
      </div>
    </main>
    <footer role="contentinfo" aria-label="Site footer">
      <Footer />
    </footer>
  </div>
);

export default Layout; 