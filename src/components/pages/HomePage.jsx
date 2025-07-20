import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import StylishFooter from '../layout/StylishFooter';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
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
  const [commentInputs, setCommentInputs] = useState({}); // { [productId]: { comment: '', rating: 5 } }

  useEffect(() => {
    setFavoritesToStorage(favorites);
  }, [favorites]);

  useEffect(() => {
    if (location.state && location.state.paymentSuccess) {
      toast.success('Payment successful! Thank you for your purchase.');
    }
  }, [location.state]);

  const filteredProducts = specialOccasionProducts.filter(p =>
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
    <div style={{ background: 'linear-gradient(120deg, #fbeaec 0%, #f7e1f3 100%)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Floating Shapes */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 600, zIndex: 0, pointerEvents: 'none' }}>
        <div className="floating-shape" style={{ position: 'absolute', top: 60, left: 80, width: 80, height: 80, background: 'radial-gradient(circle at 30% 30%, #c94f7c 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.18, animation: 'floatY 7s ease-in-out infinite' }} />
        <div className="floating-shape" style={{ position: 'absolute', top: 180, right: 120, width: 60, height: 60, background: 'radial-gradient(circle at 70% 70%, #b85c8b 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.13, animation: 'floatX 9s ease-in-out infinite' }} />
        <div className="floating-shape" style={{ position: 'absolute', top: 320, left: 300, width: 40, height: 40, background: 'radial-gradient(circle at 50% 50%, #d47fa6 60%, #fff0f5 100%)', borderRadius: '50%', opacity: 0.12, animation: 'floatY 11s ease-in-out infinite' }} />
      </div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: 420,
        background: 'url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat',
        borderRadius: 24,
        margin: '0 0 48px 0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(201,79,124,0.10)',
        animation: 'fadeIn 1.2s',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #fbeaecbb 0%, #fff0f5cc 100%)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#c94f7c',
          padding: '48px 20px',
          maxWidth: 800,
          width: '100%',
          background: 'rgba(255,255,255,0.25)',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(201,79,124,0.10)',
          backdropFilter: 'blur(8px)',
          animation: 'slideDown 1.2s',
        }}>
          <h1 style={{ fontSize: 54, fontWeight: 900, marginBottom: 18, letterSpacing: 1, textShadow: '0 2px 8px #fff0f5', animation: 'popIn 1.2s', fontFamily: 'Pacifico, Segoe UI, cursive' }}>Modern Gifts for Every Heart</h1>
          <p style={{ fontSize: 24, color: '#b85c8b', marginBottom: 32, fontWeight: 500, display: 'inline-block', position: 'relative' }}>
            Discover unique, curated presents for every occasion and every loved one.
            <span style={{ display: 'block', height: 6, background: 'linear-gradient(90deg, #c94f7c 0%, #fff0f5 100%)', borderRadius: 3, width: 120, margin: '8px auto 0', opacity: 0.5 }} />
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Search gifts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '14px 20px',
                borderRadius: '30px 0 0 30px',
                border: 'none',
                fontSize: 18,
                outline: 'none',
                width: 260,
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
                fontSize: 18,
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #fbeaec',
                transition: 'background 0.2s',
                animation: 'bounceBtn 2.5s infinite',
              }}
            >
              Search
            </button>
          </form>
          <a href="#products" style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', padding: '14px 38px', borderRadius: 30, fontWeight: 700, fontSize: 18, textDecoration: 'none', boxShadow: '0 2px 12px #fbeaec', transition: 'background 0.2s', animation: 'glowBtn 2.5s infinite' }}>Shop Now</a>
        </div>
      </section>
      <WavyDivider />
      {/* Product Section */}
      <section id="products" style={{ maxWidth: 1100, margin: '0 auto 56px', padding: '32px 0', borderRadius: 18, background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 16px #fbeaec', animation: 'fadeIn 1.2s', position: 'relative', zIndex: 2 }}>
        <h3 style={{ color: '#b85c8b', fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: 'center', letterSpacing: 1 }}>Featured Gifts</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center' }}>
          {filteredProducts.map((product, i) => {
            const productFeedback = feedback[product.id] || [];
            const avgRating = productFeedback.length ? (productFeedback.reduce((sum, f) => sum + f.rating, 0) / productFeedback.length).toFixed(2) : product.rating;
            return (
              <div key={product.id} style={{
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 2px 12px #fbeaec',
                padding: 28,
                minWidth: 220,
                maxWidth: 260,
                flex: '1 1 220px',
                textAlign: 'center',
                transition: 'transform 0.18s, box-shadow 0.18s',
                cursor: 'pointer',
                position: 'relative',
                animation: `popIn 1.2s ${i * 0.12}s both`,
                marginBottom: 12,
                border: '2px solid #fbeaec',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 8px 32px #fbeaec';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 2px 12px #fbeaec';
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
                    fontSize: 22,
                    zIndex: 3
                  }}
                  title={isFavorite(product) ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  <FaHeart />
                </button>
                {/* Badge for best seller/new */}
                {i === 0 && <span style={{ position: 'absolute', top: 18, left: 18, background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '2px 12px', letterSpacing: 1, boxShadow: '0 1px 4px #fbeaec' }}>Best Seller</span>}
                {i === 1 && <span style={{ position: 'absolute', top: 18, left: 18, background: 'linear-gradient(90deg, #b85c8b, #c94f7c)', color: 'white', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '2px 12px', letterSpacing: 1, boxShadow: '0 1px 4px #fbeaec' }}>New</span>}
                <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 18, boxShadow: '0 2px 8px #fbeaec', transition: 'transform 0.3s' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ color: '#c94f7c', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{product.name}</div>
                <div style={{ color: '#b85c8b', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{product.price}</div>
                <div style={{ color: '#888', fontSize: 15, marginBottom: 12 }}>Rating: {avgRating} <span style={{ color: '#c94f7c', fontWeight: 700 }}>★</span> ({productFeedback.length || 'No'} review{productFeedback.length === 1 ? '' : 's'})</div>
                {/* Comments/Rating Section */}
                <div style={{ marginTop: 18, textAlign: 'left' }}>
                  <form onSubmit={e => handleCommentSubmit(product.id, e)} style={{ marginBottom: 10, background: '#fbeaec22', borderRadius: 10, padding: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={(commentInputs[product.id]?.rating) ?? 5}
                        onChange={e => handleCommentInput(product.id, 'rating', e.target.value)}
                        style={{ width: 48, borderRadius: 6, border: '1px solid #e9b6d0', padding: '4px 8px', fontSize: 15, color: '#c94f7c' }}
                        required
                        title="Rate 1-5"
                      />
                      <span style={{ color: '#c94f7c', fontWeight: 700 }}>★</span>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInputs[product.id]?.comment || ''}
                        onChange={e => handleCommentInput(product.id, 'comment', e.target.value)}
                        style={{ flex: 1, borderRadius: 6, border: '1px solid #e9b6d0', padding: '4px 8px', fontSize: 15, color: '#b85c8b' }}
                        required
                      />
                      <button type="submit" style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Post</button>
                    </div>
                  </form>
                  <div style={{ maxHeight: 80, overflowY: 'auto', fontSize: 14 }}>
                    {productFeedback.length === 0 && <div style={{ color: '#aaa' }}>No comments yet.</div>}
                    {productFeedback.map((fb, idx) => (
                      <div key={idx} style={{ marginBottom: 6, background: '#fff8fa', borderRadius: 6, padding: '6px 8px', color: '#b85c8b' }}>
                        <span style={{ color: '#c94f7c', fontWeight: 700 }}>{fb.rating}★</span> {fb.comment}
                        <span style={{ color: '#aaa', fontSize: 12, marginLeft: 6 }}>{new Date(fb.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  style={{ background: 'linear-gradient(90deg, #c94f7c, #b85c8b)', color: 'white', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px #fbeaec', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                  title={isInCart(product) ? 'Already in Cart' : 'Add to Cart'}
                  disabled={isInCart(product)}
                >
                  <FaShoppingCart style={{ fontSize: 18 }} />
                  {isInCart(product) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <WavyDivider />
      {/* Testimonials/Trust Section */}
      <section style={{ background: 'linear-gradient(90deg, #fbeaec 0%, #fff0f5 100%)', padding: '56px 0 40px', borderRadius: 18, maxWidth: 1100, margin: '0 auto 48px', boxShadow: '0 2px 16px #fbeaec', animation: 'fadeIn 1.2s', position: 'relative', zIndex: 2 }}>
        <h3 style={{ color: '#b85c8b', fontSize: 26, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>What Our Customers Say</h3>
        <TestimonialCarousel testimonials={testimonials} />
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