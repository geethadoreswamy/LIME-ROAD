import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch('http://localhost:5027/api/cart', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Assuming you have a method to set cart items in context
        // setCartItems(data);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleBuyNow = () => {
    const userCredentials = localStorage.getItem("userCredentials");
    if (userCredentials) {
      const { role } = JSON.parse(userCredentials);
      if (role === "customer") {
        navigate('/payment'); // Redirect to payment page if logged in as customer
      } else {
        navigate('/login'); // Redirect to login page for other roles
      }
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  const handleAddToCart = async (item) => {
    const { id, size, quantity } = item;
    const userId = JSON.parse(localStorage.getItem("userCredentials")).id; // Assuming user ID is stored in local storage
    const response = await fetch('http://localhost:5027/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, size, quantity, userId }),
    });
    if (response.ok) {
      alert('Item added to cart successfully!');
    } else {
      alert('Failed to add item to cart.');
    }
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-lg max-w-4xl w-full mb-20 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">There are no items in your cart.</p>
            <Link
              to="/"
              className="mt极6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="grid grid-cols-[100px_1fr_150px] gap-4 items-center border-b pb-4">
                  <Link to={`/product/${item.id}`} className="w-20 h-20">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                  
                  <Link to={`/product/${item.id}`} className="flex flex-col justify-center">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Size: {item.size}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </Link>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value))}
                      className="border rounded px-2 py-1 w-20 text-center"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t">
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="flex justify-between">
                  <span>Total Price</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping Charges</span>
                  <span>free</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Charges</span>
                  <span>₹29 <span className="text-green-600">free</span></span>
                </div>
                <div className="flex justify-between border-t pt-4 font-semibold">
                  <span>Amount Payable</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
                >
                  Buy Now
                </button>
                
                <Link
                  to="/"
                  className="w-full text-center block text-green-600 hover:text-green-800 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
