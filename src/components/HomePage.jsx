import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        }

        .nav-btn {
          padding: 8px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-btn.login {
          color: #c94f7c;
          border: 2px solid #c94f7c;
          background: transparent;
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

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          color: #c94f7c;
          cursor: pointer;
        }

        .hero-section {
          height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 2;
          max-width: 800px;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 30px;
          opacity: 0.95;
        }

        .hero-cta {
          background: white;
          color: #c94f7c;
          padding: 15px 40px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          display: inline-block;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.3);
        }

        .hero-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .indicator.active {
          background: white;
        }

        .section {
          padding: 80px 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .section-subtitle {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .category-card {
          background: white;
          padding: 40px 20px;
          border-radius: 20px;
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
          font-size: 3rem;
          margin-bottom: 20px;
          display: block;
        }

        .category-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
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
          background-size: cover;
          background-position: center;
        }

        .product-info {
          padding: 25px;
        }

        .product-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 10px;
        }

        .product-price {
          font-size: 1.3rem;
          font-weight: bold;
          color: #c94f7c;
        }

        .cta-section {
          background: linear-gradient(135deg, #fbeaec, #fff0f5);
          text-align: center;
          padding: 100px 0;
        }

        .cta-title {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .cta-subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 40px;
        }

        .cta-button {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          padding: 18px 50px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          display: inline-block;
          box-shadow: 0 8px 25px rgba(212, 127, 166, 0.3);
        }

        .cta-button:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(212, 127, 166, 0.4);
        }

        .footer {
          background: #2c2c2c;
          color: white;
          padding: 60px 0 30px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section h3 {
          color: #c94f7c;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 10px;
        }

        .footer-section ul li a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: #d47fa6;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #444;
          color: #999;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="nav-brand">HEART & HUES</a>
          
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#featured">Featured</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="nav-buttons">
            <a href="#" className="nav-btn login">Login</a>
            <a href="#" className="nav-btn signup">Sign Up</a>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
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
              <a href="#categories" className="hero-cta">Explore Gifts</a>
            </div>
          </div>
        ))}
        
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <div 
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="section" id="categories">
        <div className="container">
          <h2 className="section-title">Shop by Occasion</h2>
          <p className="section-subtitle">
            Find the perfect gift for every special moment in life
          </p>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="category-card"
                style={{ borderTop: `4px solid ${category.color}` }}
              >
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" id="featured" style={{ background: '#fafafa' }}>
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Handpicked favorites that never fail to delight
          </p>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div 
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span style={{ marginLeft: '5px', color: '#666' }}>
                      ({product.rating})
                    </span>
                  </div>
                  <div className="product-price">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Make Someone's Day?</h2>
          <p className="cta-subtitle">
            Join thousands of happy customers who trust Heart & Hues for their gifting needs
          </p>
          <a href="#" className="cta-button">Start Shopping</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>HEART & HUES</h3>
              <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                Your trusted partner in finding the perfect gifts for every occasion. 
                We believe every moment deserves to be celebrated with love.
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Gift Guide</a></li>
                <li><a href="#">Custom Orders</a></li>
                <li><a href="#">Track Order</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Categories</h3>
              <ul>
                <li><a href="#">Birthday Gifts</a></li>
                <li><a href="#">Anniversary</a></li>
                <li><a href="#">Wedding Gifts</a></li>
                <li><a href="#">Baby Shower</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Heart & Hues. All rights reserved. Made with 💝 for gift lovers.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;