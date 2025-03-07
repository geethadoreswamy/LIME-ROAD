import React, { createContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => [...prevItems, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider 
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => React.useContext(WishlistContext);
