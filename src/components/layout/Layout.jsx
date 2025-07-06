import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, showFooter = true }) => {
  const layoutStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const mainStyles = {
    flex: 1,
    paddingTop: '70px' // Account for fixed navbar
  };

  return (
    <div style={layoutStyles}>
      <Navbar />
      <main style={mainStyles}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout; 