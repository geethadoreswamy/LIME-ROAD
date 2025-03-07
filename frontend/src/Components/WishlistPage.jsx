import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';



const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link 
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <Link 
              to={{
                pathname: `/product/${product.id}`,
                state: { product }
              }}
              className="block"
            >
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <img 
                  src={product.image[0]} 
                  alt={product.name} 
                  className="w-full h-auto max-h-96 object-contain mb-4"
                />

                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">₹{product.price}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors active:bg-green-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:border-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>

              </div>
            </Link>

          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
