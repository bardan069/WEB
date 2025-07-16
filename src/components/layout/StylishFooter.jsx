import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const StylishFooter = () => (
  <footer id="footer" style={{
    background: 'linear-gradient(90deg, #c94f7c 0%, #b85c8b 100%)',
    color: 'white',
    padding: '40px 0 24px 0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 48,
    boxShadow: '0 -2px 24px #fbeaec',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
      <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>Heart & Hues</div>
      <div style={{ display: 'flex', gap: 24, margin: '18px 0' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 22 }}><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 22 }}><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 22 }}><FaTwitter /></a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 22 }}><FaPinterest /></a>
      </div>
      <div style={{ fontSize: 16, opacity: 0.85 }}>
        &copy; {new Date().getFullYear()} Heart & Hues. All rights reserved.
      </div>
    </div>
  </footer>
);

export default StylishFooter; 