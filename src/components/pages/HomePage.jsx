import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaHeart, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showEditCart, setShowEditCart] = useState(false);

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

      {/* Edit Cart Section */}
      {cart.length > 0 && (
        <div style={{
          maxWidth: '900px',
          margin: '40px auto 0',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          padding: '24px',
          fontFamily: 'Segoe UI, sans-serif',
          position: 'relative',
          zIndex: 10
        }}>
          <button
            onClick={() => setShowEditCart((v) => !v)}
            style={{
              background: 'linear-gradient(to right, #d47fa6, #b85c8b)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              padding: '12px 28px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: showEditCart ? 24 : 0,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}
          >
            Edit Cart {showEditCart ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showEditCart && (
            <div>
              {cart.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  borderBottom: '1px solid #eee',
                  padding: '16px 0'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
                    <div style={{ color: '#c94f7c', fontWeight: 500 }}>{item.price}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      style={{ width: 28, height: 28, border: '1px solid #ddd', background: 'white', borderRadius: 5, cursor: 'pointer' }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      style={{ width: 40, textAlign: 'center', border: '1px solid #ddd', borderRadius: 5, padding: 4 }}
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button
                      style={{ width: 28, height: 28, border: '1px solid #ddd', background: 'white', borderRadius: 5, cursor: 'pointer' }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button
                    style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: 18, marginLeft: 10 }}
                    onClick={() => removeFromCart(item.id)}
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={() => navigate('/cart')}
                style={{
                  marginTop: 24,
                  background: 'linear-gradient(to right, #d47fa6, #b85c8b)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '12px 28px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              >
                View Cart
              </button>
            </div>
          )}
        </div>
      )}
      {/* End Edit Cart Section */}

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

      <section id="about" style={{ padding: '80px 20px', background: '#fefefe' }}>
        <h2 className="section-title">About Us</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: '#555', fontSize: '18px', lineHeight: '1.7' }}>
          <p>
            Heart & Hues is your destination for finding the perfect gift for every occasion. We believe in celebrating life's special moments with thoughtful, curated presents that bring joy to both the giver and the receiver. Our handpicked selection is designed to help you express love, gratitude, and happiness in the most meaningful way.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;