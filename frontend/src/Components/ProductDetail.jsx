import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product with ID:", id);

      try {
        const response = await fetch(`http://localhost:5027/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        console.log("Fetched product data:", data);
        console.log("Product name:", data.product_name);
        console.log("Product price:", data.new_price);

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found. Please try again later.</div>;
  }

  if (!product.image) {
    console.error('Product image is undefined:', product);
    product.image = '/placeholder-image.jpg';
  }

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img
          src={`http://localhost:5027${product.image}`}
          alt={product.name || 'Product image'}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
            console.error('Failed to load product image:', product.image);
          }}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      <div className="product-info">
        <h1>{product.product_name}</h1>
        <div className="price-details">
          <p className="new-price">₹ {product.new_price}</p>
          
          {product.offer_percent && <p className="offer">({product.offer_percent}% OFF)</p>}
        </div>
        <div className="product-meta">
          {selectedSize && <p><strong>Selected Size:</strong> {selectedSize}</p>}

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Quantity Available:</strong> {product.quantity}</p>
          <p><strong>Sizes:</strong></p>
          <div className="sizes">
            {product.sizes.map((size) => (
              <button 
                key={size} 
                className={`size-button ${selectedSize === size ? 'selected' : ''}`} 
                onClick={() => setSelectedSize(size)}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                  backgroundColor: selectedSize === size ? '#007bff' : '#fff',
                  color: selectedSize === size ? '#fff' : '#000'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="buttons">

          <button 
            className="add-to-cart"
            onClick={() => {
              if (!selectedSize) {
                alert("Please select a size."); // Alert if no size is selected
                return;
              }
              console.log("Adding to cart:", product); // Log the product object
              console.log("Product details:", {
                size: selectedSize, // Log the selected size

                name: product.product_name,
                price: product.new_price,
                image: `http://localhost:5027${product.image}`, // Ensure the image URL is correctly set
              });
              addToCart({
                name: product.product_name,
                price: product.new_price,
                image: `http://localhost:5027${product.image}`, // Ensure the image URL is correctly set
                size: selectedSize // Include the selected size
              });
              alert("Product added to cart!"); // Confirmation alert

            }}
          >
            Add to Cart
          </button>
          <button 
            className="add-to-wishlist"
            onClick={() => {
              addToWishlist({
                name: product.product_name,
                price: product.new_price,
                image: [`http://localhost:5027${product.image}`], // Pass the image as an array
                size: selectedSize // Include the selected size
              });
              alert("Product added to Wishlist!");
            }}
          >
            ❤️ Add to Wishlist

          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
