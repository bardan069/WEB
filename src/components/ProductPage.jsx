import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock product data - in real app, this would come from API
  const mockProduct = {
    id: parseInt(id),
    name: "Personalized Photo Frame",
    price: "$29.99",
    originalPrice: "$39.99",
    rating: 4.8,
    reviews: 127,
    description: "A beautiful personalized photo frame that makes the perfect gift for any occasion. Features elegant design with customizable text and high-quality materials.",
    features: [
      "Personalized text engraving",
      "High-quality wood frame",
      "Glass protection",
      "Multiple size options",
      "Fast shipping available"
    ],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop",
      "https://i.pinimg.com/736x/72/12/64/72126429b92657d394b54d73974a859d.jpg"
    ],
    category: "Home & Garden",
    inStock: true,
    stockCount: 15
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    navigate('/cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} style={{ color: '#ffd700' }} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ color: '#ffd700', opacity: 0.5 }} />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#c94f7c'
      }}>
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#c94f7c'
      }}>
        Product not found
      </div>
    );
  }

  return (
    <>
      <style>{`
        .product-page {
          padding: 120px 20px 40px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c94f7c;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 30px;
          cursor: pointer;
        }

        .product-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .product-images {
          position: sticky;
          top: 120px;
        }

        .main-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 20px;
        }

        .thumbnail-images {
          display: flex;
          gap: 15px;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.3s ease;
        }

        .thumbnail.active {
          border-color: #c94f7c;
        }

        .product-info h1 {
          font-size: 32px;
          color: #2c2c2c;
          margin-bottom: 10px;
        }

        .price-container {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .current-price {
          font-size: 28px;
          font-weight: bold;
          color: #c94f7c;
        }

        .original-price {
          font-size: 18px;
          color: #999;
          text-decoration: line-through;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .reviews {
          color: #666;
          font-size: 14px;
        }

        .description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .features {
          margin-bottom: 30px;
        }

        .features h3 {
          color: #2c2c2c;
          margin-bottom: 15px;
        }

        .features ul {
          list-style: none;
          padding: 0;
        }

        .features li {
          padding: 8px 0;
          color: #555;
          position: relative;
          padding-left: 20px;
        }

        .features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #c94f7c;
          font-weight: bold;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quantity-btn:hover {
          border-color: #c94f7c;
        }

        .quantity-input {
          width: 60px;
          height: 40px;
          text-align: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .btn {
          padding: 15px 30px;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          flex: 2;
        }

        .btn-primary:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .btn-secondary {
          background: white;
          color: #c94f7c;
          border: 2px solid #c94f7c;
          flex: 1;
        }

        .btn-secondary:hover {
          background: #fce4ec;
        }

        .stock-info {
          color: #666;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .product-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .product-images {
            position: static;
          }

          .main-image {
            height: 300px;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="product-page">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back to Products
        </div>

        <div className="product-container">
          <div className="product-images">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="main-image"
            />
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            
            <div className="price-container">
              <span className="current-price">{product.price}</span>
              <span className="original-price">{product.originalPrice}</span>
            </div>

            <div className="rating-container">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>

            <p className="description">{product.description}</p>

            <div className="features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="quantity-selector">
              <span>Quantity:</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stockCount}
              />
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
              >
                +
              </button>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleBuyNow}>
                <FaShoppingCart />
                Buy Now
              </button>
              <button className="btn btn-secondary" onClick={handleAddToCart}>
                <FaHeart />
                Add to Cart
              </button>
            </div>

            <div className="stock-info">
              {product.inStock 
                ? `${product.stockCount} items in stock`
                : 'Out of stock'
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage; 