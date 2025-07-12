import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaArrowLeft, FaCreditCard, FaShoppingBag } from 'react-icons/fa';
import toast from 'react-hot-toast';


const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, checkout, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const result = await checkout(shippingInfo);
    if (result && result.success) {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  if (cart.length === 0) {
    return (
      <>
        <style>{`
          .empty-cart {
            padding: 120px 20px 40px;
            text-align: center;
            font-family: 'Segoe UI', sans-serif;
          }

          .empty-cart h2 {
            color: #2c2c2c;
            margin-bottom: 20px;
          }

          .empty-cart p {
            color: #666;
            margin-bottom: 30px;
          }

          .shop-btn {
            background: linear-gradient(to right, #d47fa6, #b85c8b);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
          }

          .shop-btn:hover {
            background: linear-gradient(to right, #c86a99, #a64a78);
          }
        `}</style>

        <div className="empty-cart">
          <FaShoppingBag style={{ fontSize: '64px', color: '#c94f7c', marginBottom: '20px' }} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button className="shop-btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .cart-page {
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

        .cart-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        .cart-items {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto auto;
          gap: 20px;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .item-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
        }

        .item-details h3 {
          color: #2c2c2c;
          margin-bottom: 8px;
        }

        .item-price {
          color: #c94f7c;
          font-weight: 600;
          font-size: 18px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quantity-btn {
          width: 30px;
          height: 30px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 5px;
          cursor: pointer;
        }

        .quantity-input {
          width: 50px;
          text-align: center;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 5px;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ff6b6b;
          cursor: pointer;
          font-size: 16px;
        }

        .cart-summary {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          height: fit-content;
          position: sticky;
          top: 120px;
        }

        .summary-title {
          font-size: 20px;
          color: #2c2c2c;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          color: #666;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          padding-top: 20px;
          border-top: 2px solid #eee;
          font-size: 18px;
          font-weight: 600;
          color: #2c2c2c;
        }

        .checkout-btn {
          width: 100%;
          background: linear-gradient(to right, #d47fa6, #b85c8b);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .checkout-btn:hover {
          background: linear-gradient(to right, #c86a99, #a64a78);
        }

        .checkout-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .checkout-form {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          margin-top: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #2c2c2c;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        @media (max-width: 768px) {
          .cart-container {
            grid-template-columns: 1fr;
          }

          .cart-item {
            grid-template-columns: 80px 1fr;
            gap: 15px;
          }

          .item-price, .quantity-controls, .remove-btn {
            grid-column: 2;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="cart-page">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Continue Shopping
        </div>

        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <h2>Shopping Cart ({getCartCount()} items)</h2>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-price">{item.price}</div>
                </div>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({getCartCount()} items)</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
            </div>

            <button 
              className="checkout-btn"
              onClick={() => setShowCheckout(!showCheckout)}
              disabled={loading}
            >
              <FaCreditCard />
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>

        {showCheckout && (
          <div className="checkout-form">
            <h3>Shipping Information</h3>
            <form onSubmit={handleCheckout}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="checkout-btn"
                disabled={loading}
              >
                {loading ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage; 