import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaHeart, FaMagic, FaTags, FaSignInAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
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
      background: '#fff',
      boxShadow: '0 2px 20px rgba(201,79,124,0.08)',
      zIndex: 1000,
      padding: '0 0',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        padding: '0 24px',
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 26, color: '#c94f7c', textDecoration: 'none', letterSpacing: 1 }}>
          Heart & Hues
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link
            to="/"
            onClick={handleHomeClick}
            style={{
              color: isHomeActive ? '#b85c8b' : '#2c3e50',
              fontWeight: 500,
              fontSize: 17,
              textDecoration: 'none',
              padding: '6px 0',
              borderBottom: isHomeActive ? '2.5px solid #c94f7c' : '2.5px solid transparent',
              transition: 'color 0.2s, border 0.2s',
            }}
          >
            Home
          </Link>
          <Link
            to="/"
            onClick={handleProductsClick}
            style={{
              color: isProductsActive ? '#b85c8b' : '#2c3e50',
              fontWeight: 500,
              fontSize: 17,
              textDecoration: 'none',
              padding: '6px 0',
              borderBottom: isProductsActive ? '2.5px solid #c94f7c' : '2.5px solid transparent',
              transition: 'color 0.2s, border 0.2s',
            }}
          >
            Products
          </Link>
          <Link
            to="/favorites"
            style={{
              color: '#b85c8b',
              fontWeight: 500,
              fontSize: 17,
              textDecoration: 'none',
              padding: '6px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderBottom: '2.5px solid transparent',
              transition: 'color 0.2s, border 0.2s',
            }}
          >
            <FaHeart style={{ fontSize: 18 }} /> Favorites
            {favoritesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -7,
                right: -12,
                background: '#b85c8b',
                color: 'white',
                borderRadius: '50%',
                fontSize: 13,
                fontWeight: 600,
                padding: '2px 7px',
                minWidth: 20,
                textAlign: 'center',
              }}>{favoritesCount}</span>
            )}
          </Link>
          <Link
            to="/about"
            onClick={handleAboutClick}
            style={{
              color: location.pathname === '/about' ? '#b85c8b' : '#2c3e50',
              fontWeight: 500,
              fontSize: 17,
              textDecoration: 'none',
              padding: '6px 0',
              borderBottom: location.pathname === '/about' ? '2.5px solid #c94f7c' : '2.5px solid transparent',
              transition: 'color 0.2s, border 0.2s',
            }}
          >
            About
          </Link>
          <Link to="/cart" style={{ position: 'relative', color: '#c94f7c', fontSize: 22 }}>
            <FaShoppingCart />
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: -7,
                right: -12,
                background: '#b85c8b',
                color: 'white',
                borderRadius: '50%',
                fontSize: 13,
                fontWeight: 600,
                padding: '2px 7px',
                minWidth: 20,
                textAlign: 'center',
              }}>{getCartCount()}</span>
            )}
          </Link>
          <Link to="/login" style={{
            background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
            color: 'white',
            border: 'none',
            borderRadius: 22,
            padding: '7px 22px',
            fontWeight: 700,
            fontSize: 16,
            marginLeft: 8,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 8px #fbeaec',
            transition: 'background 0.2s',
          }}>
            <FaSignInAlt style={{ fontSize: 18 }} /> Login
          </Link>
          <Link to="/profile" style={{ color: '#b85c8b', fontSize: 24, marginLeft: 8 }}>
            <FaUserCircle />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 