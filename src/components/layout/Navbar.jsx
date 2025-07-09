import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { NAVIGATION_LINKS } from '../../constants/data';
import { COLORS } from '../../constants/colors';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionLink = (hash) => {
    const sectionId = hash.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '15px 0',
    zIndex: 1000,
    boxShadow: `0 2px 20px ${COLORS.shadowLight}`
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const brandStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: COLORS.primary,
    textDecoration: 'none'
  };

  const navLinksStyles = {
    display: 'flex',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navLinkStyles = {
    textDecoration: 'none',
    color: COLORS.textPrimary,
    fontWeight: 500,
    transition: 'color 0.3s ease'
  };

  const navButtonsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  };

  const cartIconStyles = {
    position: 'relative',
    color: COLORS.primary,
    fontSize: '20px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  };

  const cartCountStyles = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: COLORS.primary,
    color: COLORS.white,
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const userMenuStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const userAvatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: COLORS.primary,
    color: COLORS.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const dropdownMenuStyles = {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: COLORS.white,
    borderRadius: '12px',
    boxShadow: `0 4px 20px ${COLORS.shadow}`,
    padding: '12px 0',
    minWidth: '180px',
    zIndex: 1001,
    marginTop: '8px'
  };

  const dropdownItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: COLORS.textPrimary,
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    fontSize: '14px'
  };

  const mobileMenuStyles = {
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    background: COLORS.white,
    boxShadow: `0 4px 20px ${COLORS.shadow}`,
    padding: '20px',
    zIndex: 999,
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.3s ease'
  };

  const mobileNavLinksStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const mobileNavLinkStyles = {
    textDecoration: 'none',
    color: COLORS.textPrimary,
    fontSize: '18px',
    fontWeight: 500,
    padding: '12px 0',
    borderBottom: `1px solid ${COLORS.borderLight}`
  };

  const menuButtonStyles = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: COLORS.primary,
    cursor: 'pointer',
    display: 'none'
  };

  // Add responsive styles for mobile
  const responsiveStyles = `
    @media (max-width: 768px) {
      .desktop-nav {
        display: none !important;
      }
      
      .menu-button {
        display: block !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <nav style={navbarStyles}>
        <div style={containerStyles}>
          <Link to="/" style={brandStyles}>HEART & HUES</Link>
          
          <ul style={navLinksStyles} className="desktop-nav">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.name}>
                {link.path.startsWith('#') ? (
                  <button
                    style={{ ...navLinkStyles, background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => handleSectionLink(link.path)}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link to={link.path} style={navLinkStyles}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>

          <div style={navButtonsStyles}>
            <Link to="/cart" style={cartIconStyles}>
              <FaShoppingCart />
              {getCartCount() > 0 && (
                <span style={cartCountStyles}>{getCartCount()}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div style={userMenuStyles}>
                <div style={userAvatarStyles}>
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div style={dropdownMenuStyles}>
                  <Link to="/profile" style={dropdownItemStyles}>
                    <FaUser /> Profile
                  </Link>
                  <Link to="/cart" style={dropdownItemStyles}>
                    <FaShoppingCart /> Cart
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    style={{ ...dropdownItemStyles, width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="outline" size="small" as={Link} to="/login">
                  Login
                </Button>
                <Button variant="primary" size="small" as={Link} to="/signup">
                  Sign Up
                </Button>
              </div>
            )}

            <button style={menuButtonStyles} className="menu-button" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={mobileMenuStyles}>
        <ul style={mobileNavLinksStyles}>
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.name}>
              {link.path.startsWith('#') ? (
                <button
                  style={{ ...mobileNavLinkStyles, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  onClick={() => handleSectionLink(link.path)}
                >
                  {link.name}
                </button>
              ) : (
                <Link 
                  to={link.path} 
                  style={mobileNavLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
          
          {!isAuthenticated && (
            <>
              <li>
                <Link 
                  to="/login" 
                  style={mobileNavLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  style={mobileNavLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar; 