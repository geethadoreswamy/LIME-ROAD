import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Mock OTP generation and verification



export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);



  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prevItems => [
        ...prevItems,
        {
          ...product,
          size: selectedSize,
          quantity: 1
        }
      ]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => 
        !(item.id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };




  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart,
        updateQuantity,

      }}

    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);


