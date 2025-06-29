import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart, getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const heroSlides = [
    {
      title: "Perfect Gifts for Every Heart",
      subtitle: "Discover meaningful presents that create lasting memories",
      image: "https://i.pinimg.com/736x/68/59/9f/68599fba35b6223b2a8290ac41b33ce9.jpg"
    },
    {
      title: "Celebrate Every Moment",
      subtitle: "From birthdays to anniversaries, find the perfect expression of love",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop"
    },
    {
      title: "Curated with Love",
      subtitle: "Hand-selected gifts that speak from the heart",
      image: "https://i.pinimg.com/736x/06/4c/0c/064c0c9dc9a7229f097e799f83dcc2a2.jpg"
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Birthday Gifts",
      icon: "🎂",
      color: "#ff6b9d",
      description: "Celebrate another year with joyful surprises"
    },
    {
      id: 2,
      name: "Anniversary",
      icon: "💝",
      color: "#d47fa6",
      description: "Gifts that honor timeless love"
    },
    {
      id: 3,
      name: "Valentine's Day",
      icon: "💕",
      color: "#ff8fab",
      description: "Express your heart with romantic gestures"
    },
    {
      id: 4,
      name: "Mother's Day",
      icon: "🌸",
      color: "#f4a6cd",
      description: "Appreciation for the women who raised us"
    },
    {
      id: 5,
      name: "Wedding Gifts",
      icon: "💒",
      color: "#c94f7c",
      description: "Elegant tokens for the perfect couple"
    },
    {
      id: 6,
      name: "Baby Shower",
      icon: "👶",
      color: "#fbb1bd",
      description: "Adorable gifts for growing families"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Personalized Photo Frame",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      rating: 4.8
    },
    {
      id: 2,
      name: "Luxury Jewelry Box",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
      rating: 4.9
    },
    {
      id: 3,
      name: "Artisan Candle Set",
      price: "$45.99",
      image: "https://i.pinimg.com/736x/72/12/64/72126429b92657d394b54d73974a859d.jpg",
      rating: 4.7
    },
    {
      id: 4,
      name: "Custom Coffee Mug",
      price: "$19.99",
      image: "https://i.pinimg.com/736x/fa/29/20/fa292073229fdf4b2d48cb93b34a6438.jpg",
      rating: 4.6
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#ffd700' }}>★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#ffd700' }}>☆</span>);
    }
    return stars;
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          background: #fff;
          overflow-x: hidden;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(223, 182, 203, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          font-size: 24px;
          font-weight: bold;
          color: #c94f7c;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #c94f7c;
        }

        .nav-buttons {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .nav-btn {
          padding: 8px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-btn.login {
          color: #c94f7c;
          border: 2px solid #c94f7c;
        }

        .nav-btn.login:hover {
          background: #c94f7c;
          color: white;
        }

        .nav-btn.signup {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          border: none;
        }

        .nav-btn.signup:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .cart-icon {
          position: relative;
          color: #c94f7c;
          font-size: 20px;
          cursor: pointer;
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff6b6b;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .user-menu {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          padding: 10px 0;
          min-width: 150px;
          display: none;
        }

        .user-menu:hover .dropdown-menu {
          display: block;
        }

        .dropdown-item {
          padding: 10px 20px;
          color: #333;
          text-decoration: none;
          display: block;
          transition: background 0.3s ease;
        }

        .dropdown-item:hover {
          background: #fce4ec;
          color: #c94f7c;
        }

        .hero-section {
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 2;
          max-width: 600px;
          padding: 0 20px;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
        }

        .hero-title {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
          font-size: 20px;
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .hero-btn {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 30px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .hero-btn:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
          transform: translateY(-2px);
        }

        .categories-section {
          padding: 80px 20px;
          background: #fefefe;
        }

        .section-title {
          text-align: center;
          font-size: 36px;
          color: #2c2c2c;
          margin-bottom: 50px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-card {
          background: white;
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 8px 30px rgba(223, 182, 203, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(223, 182, 203, 0.25);
        }

        .category-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .category-name {
          font-size: 24px;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 15px;
        }

        .category-description {
          color: #666;
          line-height: 1.6;
        }

        .products-section {
          padding: 80px 20px;
          background: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(223, 182, 203, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(223, 182, 203, 0.25);
        }

        .product-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .product-info {
          padding: 20px;
        }

        .product-name {
          font-size: 18px;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 10px;
        }

        .product-price {
          font-size: 20px;
          font-weight: bold;
          color: #c94f7c;
          margin-bottom: 15px;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .product-actions {
          display: flex;
          gap: 10px;
        }

        .product-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
        }

        .btn-primary:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .btn-secondary {
          background: white;
          color: #c94f7c;
          border: 2px solid #c94f7c;
        }

        .btn-secondary:hover {
          background: #fce4ec;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">HEART & HUES</Link>
          
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
          </ul>

          <div className="nav-buttons">
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              {getCartCount() > 0 && (
                <span className="cart-count">{getCartCount()}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-avatar">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <FaUser /> Profile
                  </Link>
                  <Link to="/cart" className="dropdown-item">
                    <FaShoppingCart /> Cart
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-btn login">Login</Link>
                <Link to="/signup" className="nav-btn signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="hero-section">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <Link to="#products" className="hero-btn">Shop Now</Link>
            </div>
          </div>
        ))}
      </section>

      <section id="categories" className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="products-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onClick={() => navigate(`/products/${product.id}`)}
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">{product.price}</div>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span>({product.rating})</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="product-btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <button 
                    className="product-btn btn-secondary"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <FaHeart />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;