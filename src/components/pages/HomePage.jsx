import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import StylishFooter from '../layout/StylishFooter';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const specialOccasionProducts = [
  {
    id: 2,
    name: 'Designer Evening Dress',
    price: 'NRS 3500',
    image: 'dress.jpg',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Luxury Wrist Watch',
    price: 'NRS 8000',
    image: 'watch.jpg',
    rating: 4.7
  },
  {
    id: 1,
    name: 'Elegant Diamond Ring',
    price: 'NRS 120000',
    image: 'ring.jpg',
    rating: 4.9
  },
  {
    id: 4,
    name: 'Premium Perfume Set',
    price: 'NRS 2500',
    image: 'perfume.jpg',
    rating: 4.8
  },
  {
    id: 5,
    name: 'Classic Leather Handbag',
    price: 'NRS 4000',
    image: 'handbag.jpg',
    rating: 4.9
  },
  {
    id: 6,
    name: 'Romantic Rose Bouquet',
    price: 'NRS 1200',
    image: 'rose.jpg',
    rating: 4.7
  },
  {
    id: 7,
    name: 'Personalized Jewelry Box',
    price: 'NRS 1800',
    image: 'jewelerybox.jpg',
    rating: 4.8
  }
];

const testimonials = [
  { id: 1, name: 'Emily R.', text: 'Absolutely loved the curated gifts! Fast delivery and beautiful packaging.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'James K.', text: 'The perfect place to find something special for every occasion.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Sophia L.', text: 'Great quality and unique selection. My go-to gift shop!', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

export const getFavoritesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch {
    return [];
  }
};

export const setFavoritesToStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Helper to get comments/ratings from localStorage
const getProductFeedback = () => {
  try {
    return JSON.parse(localStorage.getItem('productFeedback')) || {};
  } catch {
    return {};
  }
};
const setProductFeedback = (feedback) => {
  localStorage.setItem('productFeedback', JSON.stringify(feedback));
};

const WavyDivider = () => (
  <svg viewBox="0 0 1440 90" style={{ display: 'block', width: '100%', height: 60, margin: 0 }}><path fill="#fbeaec" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
);

const HomePage = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(getFavoritesFromStorage());
  const { cart, addToCart } = useCart();
  const [feedback, setFeedback] = useState(getProductFeedback());
  const [commentInputs, setCommentInputs] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFavoritesToStorage(favorites);
  }, [favorites]);

  useEffect(() => {
    if (location.state && location.state.paymentSuccess) {
      toast.success('Payment successful! Thank you for your purchase.');
    }
  }, [location.state]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/gifts')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch gifts');
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (product) => favorites.some((item) => item.id === product.id);
  const isInCart = (product) => cart.some((item) => item.id === product.id);

  // Make favorites available globally for navbar
  window.__FAVORITES_COUNT__ = favorites.length;

  // Handle comment/rating input change
  const handleCommentInput = (productId, field, value) => {
    setCommentInputs(inputs => ({
      ...inputs,
      [productId]: {
        ...inputs[productId],
        [field]: value
      }
    }));
  };

  // Handle comment/rating submit
  const handleCommentSubmit = (productId, e) => {
    e.preventDefault();
    const { comment = '', rating = 5 } = commentInputs[productId] || {};
    if (!comment.trim()) {
      toast.error('Please enter a comment.');
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please provide a rating between 1 and 5.');
      return;
    }
    setFeedback(prev => {
      const prevList = prev[productId] || [];
      return {
        ...prev,
        [productId]: [...prevList, { comment, rating: Number(rating), date: new Date().toISOString() }]
      };
    });
    setCommentInputs(inputs => ({ ...inputs, [productId]: { comment: '', rating: 5 } }));
    toast.success('Thank you for your feedback!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #fbeaec 0%, #f7e1f3 50%, #e0bcd5 100%)',
      animation: 'bgMove 18s ease-in-out infinite alternate',
    }}>
      <style>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
      <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: 0, top: 0, background: '#fff', color: '#c94f7c', padding: 8, zIndex: 10000, transform: 'translateY(-200%)', transition: 'transform 0.2s' }} onFocus={e => e.target.style.transform = 'translateY(0)'} onBlur={e => e.target.style.transform = 'translateY(-200%)'}>Skip to main content</a>
      {/* Animated Floating Shapes */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 600, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div className="floating-shape" style={{ position: 'absolute', top: 60, left: 80, width: 120, height: 120, background: 'radial-gradient(circle at 30% 30%, #c94f7c 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.13, animation: 'floatY 7s ease-in-out infinite' }} />
        <div className="floating-shape" style={{ position: 'absolute', top: 180, right: 120, width: 90, height: 90, background: 'radial-gradient(circle at 70% 70%, #b85c8b 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.10, animation: 'floatX 9s ease-in-out infinite' }} />
        <div className="floating-shape" style={{ position: 'absolute', top: 320, left: 300, width: 60, height: 60, background: 'radial-gradient(circle at 50% 50%, #d47fa6 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.09, animation: 'floatY 11s ease-in-out infinite' }} />
      </div>
      <main id="main-content" tabIndex={-1} aria-label="Main content" style={{ outline: 'none', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" style={{
          position: 'relative',
          minHeight: 420,
          width: '100%',
          background: 'url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat',
          borderRadius: 0,
          margin: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(201,79,124,0.10)',
          animation: 'fadeIn 1.2s',
          zIndex: 1,
          flex: 1,
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #fbeaecbb 0%, #fff0f5cc 100%)',
            backdropFilter: 'blur(10px)',
            zIndex: 1,
          }} />
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: '#c94f7c',
            padding: '64px 32px',
            maxWidth: 900,
            width: '100%',
            background: 'rgba(255,255,255,0.30)',
            borderRadius: 36,
            boxShadow: '0 8px 32px rgba(201,79,124,0.10)',
            backdropFilter: 'blur(12px)',
            animation: 'slideDown 1.2s',
            margin: '0 auto',
          }}>
            <h1 id="hero-heading" style={{ fontSize: 64, fontWeight: 900, marginBottom: 18, letterSpacing: 1, textShadow: '0 2px 12px #fff0f5', animation: 'popIn 1.2s', fontFamily: 'Pacifico, Segoe UI, cursive', lineHeight: 1.1 }}>Modern Gifts for Every Heart</h1>
            <p style={{ fontSize: 28, color: '#b85c8b', marginBottom: 36, fontWeight: 500, display: 'inline-block', position: 'relative', letterSpacing: 0.5 }}>
              Discover unique, curated presents for every occasion and every loved one.
              <span style={{ display: 'block', height: 6, background: 'linear-gradient(90deg, #c94f7c 0%, #fff0f5 100%)', borderRadius: 3, width: 120, margin: '8px auto 0', opacity: 0.5 }} />
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 28 }}>
              <input
                type="text"
                placeholder="Search gifts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '18px 24px',
                  borderRadius: '30px 0 0 30px',
                  border: 'none',
                  fontSize: 22,
                  outline: 'none',
                  width: 320,
                  background: '#fff',
                  color: '#c94f7c',
                  boxShadow: '0 2px 8px #fbeaec',
                  transition: 'box-shadow 0.2s',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 30px 30px 0',
                  fontWeight: 700,
                  fontSize: 22,
                  padding: '18px 40px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #fbeaec',
                  transition: 'background 0.2s',
                  animation: 'bounceBtn 2.5s infinite',
                }}
              >
                Search
              </button>
            </form>
            <a href="#products" style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', padding: '18px 48px', borderRadius: 30, fontWeight: 800, fontSize: 22, textDecoration: 'none', boxShadow: '0 2px 16px #fbeaec', transition: 'background 0.2s', animation: 'glowBtn 2.5s infinite', marginTop: 12, display: 'inline-block' }}>Shop Now</a>
          </div>
        </section>
        {/* About Section */}
        <section style={{
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 24,
          boxShadow: '0 8px 32px #fbeaec33',
          padding: '48px 32px',
          margin: '40px auto',
          maxWidth: 900,
          textAlign: 'center',
          fontFamily: 'Segoe UI, Arial, sans-serif',
          color: '#b85c8b',
        }}>
          <h2 style={{ fontWeight: 800, fontSize: 32, marginBottom: 16, color: '#c94f7c' }}>About Heart & Hues Gift Shop</h2>
          <p style={{ fontSize: 18, color: '#6d2c4a', marginBottom: 18 }}>
            Heart & Hues is your one-stop online destination for finding the perfect gift for every occasion. Our curated collection features unique, high-quality gifts designed to bring joy and delight to your loved ones. Whether you're celebrating a birthday, anniversary, festival, or just want to make someone smile, we have something special for everyone.
          </p>
          <p style={{ fontSize: 17, color: '#7c3a5c', marginBottom: 10 }}>
            We believe that gifting is an art, and every present should tell a story. That's why we offer personalized options, beautiful packaging, and fast, reliable delivery across Nepal. Our team is passionate about making your gifting experience seamless, memorable, and full of heart.
          </p>
          <p style={{ fontSize: 16, color: '#8d4c6e' }}>
            Thank you for choosing Heart & Hues. Let us help you create moments that matter!
          </p>
        </section>
        <WavyDivider />
        {/* Product Section */}
        <section id="products" aria-labelledby="products-heading" style={{
          width: '100%',
          margin: 0,
          padding: '32px 0 80px 0',
          borderRadius: 0,
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 24px #fbeaec',
          animation: 'fadeIn 1.2s',
          position: 'relative',
          zIndex: 2,
          minHeight: '50vh',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <h2 id="products-heading" style={{ color: '#b85c8b', fontSize: 36, fontWeight: 900, marginBottom: 36, textAlign: 'center', letterSpacing: 1, textShadow: '0 2px 8px #fff0f5' }}>Featured Gifts</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 44,
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%',
            padding: '0 24px',
            flex: 1,
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', width: '100%' }}>Loading gifts...</div>
            ) : error ? (
              <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ color: '#b85c8b', textAlign: 'center', width: '100%' }}>No gifts found.</div>
            ) : filteredProducts.map((product, i) => {
              const productFeedback = feedback[product._id] || [];
              const avgRating = productFeedback.length ? (productFeedback.reduce((sum, f) => sum + f.rating, 0) / productFeedback.length).toFixed(2) : product.rating;
              return (
                <div key={product._id} style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 22,
                  boxShadow: '0 4px 24px #fbeaec',
                  padding: 32,
                  minWidth: 220,
                  maxWidth: 340,
                  flex: '1 1 220px',
                  textAlign: 'center',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: `popIn 1.2s ${i * 0.12}s both`,
                  marginBottom: 12,
                  border: '2px solid #fbeaec',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  minHeight: 440,
                  outline: 'none',
                  boxSizing: 'border-box',
                  willChange: 'transform, box-shadow',
                }}
                tabIndex={0}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 32px #fbeaec';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 4px 24px #fbeaec';
                }}
                >
                  {/* Add to Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product)}
                    style={{
                      position: 'absolute',
                      top: 18,
                      right: 18,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: isFavorite(product) ? '#c94f7c' : '#ccc',
                      fontSize: 24,
                      zIndex: 3,
                      outline: 'none',
                    }}
                    title={isFavorite(product) ? 'Remove from Favorites' : 'Add to Favorites'}
                    aria-label={isFavorite(product) ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
                  >
                    <FaHeart />
                  </button>
                  {/* Badge for best seller/new */}
                  {i === 0 && <span style={{ position: 'absolute', top: 18, left: 18, background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '2px 12px', letterSpacing: 1, boxShadow: '0 1px 4px #fbeaec' }}>Best Seller</span>}
                  {i === 1 && <span style={{ position: 'absolute', top: 18, left: 18, background: 'linear-gradient(90deg, #b85c8b, #c94f7c)', color: 'white', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '2px 12px', letterSpacing: 1, boxShadow: '0 1px 4px #fbeaec' }}>New</span>}
                  <img src={product.images && product.images[0] ? `http://localhost:3000${product.images[0]}` : ''} alt={product.name || 'Gift image'} style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: 18, marginBottom: 18, boxShadow: '0 2px 12px #fbeaec', transition: 'transform 0.3s', background: '#fbeaec', outline: 'none' }} />
                  <div style={{ color: '#c94f7c', fontWeight: 800, fontSize: 26, marginBottom: 8, marginTop: 10 }}>{product.name}</div>
                  <div style={{ color: '#b85c8b', fontWeight: 700, fontSize: 22, marginBottom: 10 }}>{product.price} NRS</div>
                  <div style={{ color: '#888', fontSize: 16, marginBottom: 14, minHeight: 36, maxHeight: 36, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.description}
                  </div>
                  <div style={{ color: '#888', fontSize: 16, marginBottom: 14 }}>
                    Rating: <span style={{ color: '#c94f7c', fontWeight: 700, fontSize: 20 }}>{avgRating}</span> <FaStar style={{ color: '#ffd700', marginBottom: -2 }} />
                    <span style={{ color: '#b85c8b', fontWeight: 700, marginLeft: 6 }}>({productFeedback.length || 'No'} review{productFeedback.length === 1 ? '' : 's'})</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      background: 'linear-gradient(90deg, #c94f7c, #b85c8b)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '14px 32px',
                      fontWeight: 700,
                      fontSize: 18,
                      boxShadow: '0 2px 8px #fbeaec',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 'auto',
                      outline: 'none',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                    title={isInCart(product) ? 'Already in Cart' : 'Add to Cart'}
                    disabled={isInCart(product)}
                    aria-label={isInCart(product) ? `Already in cart: ${product.name}` : `Add ${product.name} to cart`}
                  >
                    <FaShoppingCart style={{ fontSize: 22 }} />
                    {isInCart(product) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        {/* Call to Action Section */}
        <section aria-label="Gift Shop Call to Action" style={{ maxWidth: 900, margin: '48px auto 0', padding: '40px 32px', background: 'linear-gradient(90deg, #fff0f5 60%, #fbeaec 100%)', borderRadius: 32, boxShadow: '0 2px 24px #fbeaec', textAlign: 'center', fontWeight: 700, color: '#b85c8b', fontSize: 28, letterSpacing: 0.5 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#c94f7c', marginBottom: 18 }}>Ready to make someone smile?</div>
          <div style={{ fontSize: 20, marginBottom: 24 }}>Browse our curated collection and find the perfect gift for every occasion.</div>
          <a href="#products" style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', padding: '16px 44px', borderRadius: 30, fontWeight: 800, fontSize: 22, textDecoration: 'none', boxShadow: '0 2px 16px #fbeaec', transition: 'background 0.2s', animation: 'glowBtn 2.5s infinite', display: 'inline-block' }}>Shop Gifts</a>
        </section>
        <WavyDivider />
        {/* About Heart & Hues Gift Shop Section */}
        <section style={{ background: 'linear-gradient(90deg, #fbeaec 0%, #fff0f5 100%)', padding: '56px 0 40px', borderRadius: 18, maxWidth: 1100, margin: '0 auto 48px', boxShadow: '0 2px 16px #fbeaec', animation: 'fadeIn 1.2s', position: 'relative', zIndex: 2 }}>
          <h3 style={{ color: '#b85c8b', fontSize: 26, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>About Heart & Hues Gift Shop</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px #fbeaec',
              padding: '32px 28px',
              maxWidth: 800,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'popIn 1.2s',
            }}>
              <div style={{ fontWeight: 700, color: '#c94f7c', fontSize: 20, marginBottom: 16 }}>Your Perfect Gift Destination</div>
              <div style={{ color: '#555', fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                Heart & Hues is your premier online gift shop, specializing in curated collections that bring joy to every occasion. We believe that every gift should tell a story and create lasting memories. Our carefully selected products range from elegant jewelry and personalized items to thoughtful home decor and luxury accessories.
              </div>
              <div style={{ color: '#555', fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                We offer fast, reliable delivery across Nepal with beautiful packaging that makes every gift feel special. Whether you're celebrating a birthday, anniversary, festival, or just want to show someone you care, we have the perfect gift waiting for you.
              </div>
              <div style={{ color: '#c94f7c', fontSize: 16, fontWeight: 600 }}>
                Let us help you create moments that matter! ❤️
              </div>
            </div>
          </div>
        </section>
        <StylishFooter />
        {/* Animations and Carousel */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-40px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
          }
          @keyframes floatX {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(40px); }
          }
          @keyframes bounceBtn {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes glowBtn {
            0%, 100% { box-shadow: 0 2px 12px #fbeaec; }
            50% { box-shadow: 0 4px 24px #c94f7c; }
          }
        `}</style>
      </main>
    </div>
  );
};

// Carousel for testimonials
const TestimonialCarousel = ({ testimonials }) => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setIndex((index + 1) % testimonials.length), 3500);
    return () => clearTimeout(timer);
  }, [index, testimonials.length]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
      {testimonials.map((t, i) => (
        <div key={t.id} style={{
          opacity: i === index ? 1 : 0,
          transform: i === index ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.7s, transform 0.7s',
          position: i === index ? 'relative' : 'absolute',
          zIndex: i === index ? 2 : 1,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px #fbeaec',
          padding: '32px 28px',
          maxWidth: 320,
          minWidth: 220,
          textAlign: 'center',
          display: i === index ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'popIn 1.2s',
        }}>
          <img src={t.avatar} alt={t.name} style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16, objectFit: 'cover', border: '3px solid #fbeaec' }} />
          <div style={{ fontWeight: 700, color: '#c94f7c', fontSize: 18, marginBottom: 10 }}>{t.name}</div>
          <div style={{ color: '#555', fontSize: 16, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</div>
        </div>
      ))}
    </div>
  );
};

export default HomePage; 