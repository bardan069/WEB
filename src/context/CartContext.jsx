import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Added ${quantity} more ${product.name} to cart`);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity }];
        toast.success(`Added ${product.name} to cart`);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item._id === productId);
      const newCart = prevCart.filter(item => item._id !== productId);
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      let price = 0;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      } else {
        price = Number(item.price) || 0;
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = async (shippingInfo) => {
    setLoading(true);
    try {
      const orderData = {
        items: cart,
        total: getCartTotal(),
        shipping: shippingInfo
      };
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      toast.success('Order placed successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    checkout,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 