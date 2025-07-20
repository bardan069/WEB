import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaHeart, FaMagic, FaTags, FaSignInAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [productsActive, setProductsActive] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(window.__FAVORITES_COUNT__ || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFavoritesCount(window.__FAVORITES_COUNT__ || 0);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleProductsClick = (e) => {
    e.preventDefault();
    setProductsActive(true);
    if (location.pathname === '/') {
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        const section = document.getElementById('products');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
    setTimeout(() => setProductsActive(false), 1200);
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        const footer = document.getElementById('footer');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  };

  const isHomeActive = location.pathname === '/' && !productsActive;
  const isProductsActive = productsActive;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255,255,255,0.75)',
      boxShadow: '0 4px 32px #fbeaec44',
      zIndex: 1000,
      padding: '0 0',
      backdropFilter: 'blur(12px)',
      borderBottom: '2.5px solid #fbeaec',
      borderRadius: '0 0 22px 22px',
      transition: 'background 0.3s, box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 74,
        padding: '0 32px',
      }}>
        <Link to="/" style={{ fontWeight: 900, fontSize: 30, color: '#c94f7c', textDecoration: 'none', letterSpacing: 2, fontFamily: 'Pacifico, Segoe UI, cursive', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 34, color: '#b85c8b', textShadow: '0 2px 8px #fbeaec' }}>♥</span> Heart & Hues
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link
            to="/"
            onClick={handleHomeClick}
            style={{
              color: isHomeActive ? '#b85c8b' : '#2c3e50',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: isHomeActive ? '3px solid #c94f7c' : '3px solid transparent',
              transition: 'color 0.2s, border 0.2s',
              position: 'relative',
            }}
          >
            Home
          </Link>
          <Link
            to="/"
            onClick={handleProductsClick}
            style={{
              color: isProductsActive ? '#b85c8b' : '#2c3e50',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: isProductsActive ? '3px solid #c94f7c' : '3px solid transparent',
              transition: 'color 0.2s, border 0.2s',
              position: 'relative',
            }}
          >
            Products
          </Link>
          <Link
            to="/favorites"
            style={{
              color: '#b85c8b',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '3px solid transparent',
              position: 'relative',
              transition: 'color 0.2s, border 0.2s',
            }}
          >
            <FaHeart style={{ fontSize: 22, transition: 'color 0.2s, transform 0.2s' }} /> Favorites
            {favoritesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -10,
                right: -18,
                background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
                color: 'white',
                borderRadius: '50%',
                fontSize: 13,
                fontWeight: 700,
                padding: '3px 9px',
                minWidth: 22,
                textAlign: 'center',
                boxShadow: '0 2px 8px #fbeaec',
                border: '2px solid #fff',
              }}>{favoritesCount}</span>
            )}
          </Link>
          <Link
            to="/about"
            onClick={handleAboutClick}
            style={{
              color: location.pathname === '/about' ? '#b85c8b' : '#2c3e50',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: location.pathname === '/about' ? '3px solid #c94f7c' : '3px solid transparent',
              transition: 'color 0.2s, border 0.2s',
              position: 'relative',
            }}
          >
            About
          </Link>
          <Link to="/cart" style={{ position: 'relative', color: '#c94f7c', fontSize: 26, marginLeft: 8, display: 'flex', alignItems: 'center', transition: 'color 0.2s, transform 0.2s' }}>
            <FaShoppingCart style={{ transition: 'color 0.2s, transform 0.2s' }} />
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: -10,
                right: -18,
                background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
                color: 'white',
                borderRadius: '50%',
                fontSize: 13,
                fontWeight: 700,
                padding: '3px 9px',
                minWidth: 22,
                textAlign: 'center',
                boxShadow: '0 2px 8px #fbeaec',
                border: '2px solid #fff',
              }}>{getCartCount()}</span>
            )}
          </Link>
          {!isAuthenticated && (
            <Link to="/login" style={{
              background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
              color: 'white',
              border: 'none',
              borderRadius: 22,
              padding: '9px 26px',
              fontWeight: 800,
              fontSize: 17,
              marginLeft: 12,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 2px 12px #fbeaec',
              transition: 'background 0.2s, transform 0.2s',
            }}>
              <FaSignInAlt style={{ fontSize: 20 }} /> Login
            </Link>
          )}
          <Link to="/profile" style={{ color: '#b85c8b', fontSize: 28, marginLeft: 10, display: 'flex', alignItems: 'center', transition: 'color 0.2s, transform 0.2s' }}>
            <FaUserCircle />
          </Link>
        </div>
      </div>
      <style>{`
        nav a:hover, nav a:focus {
          color: #c94f7c !important;
          text-shadow: 0 2px 8px #fbeaec;
          transform: scale(1.06);
        }
        nav a[style*='background: linear-gradient'] {
          filter: brightness(1.08);
        }
        nav svg:hover {
          color: #b85c8b !important;
          transform: scale(1.15);
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 