import React, { useEffect, useState } from "react";
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductPage.css';
import Footer from './Footer';
import { useLocation, useNavigate } from "react-router-dom";
import Slideshow from './Slideshow';
import { FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import Rating from './Rating';

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistItems.some(item => item.id === product?.id));
  }, [wishlistItems, product]);

  const handleWhatsAppClick = () => {
    const message = `Check out this product: ${product.name} - ₹${product.price}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const productImages = (product.productImages || []).map(img => 
    img.startsWith('/') ? img : `/${img}`
  );

  const slideshowImages = productImages.length === 1 ? 
    Array(3).fill(productImages[0]) : 
    productImages;

  return (
    <div style={{ 
      padding: "40px", 
      maxWidth: "1200px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "30px"
    }}>
      <div style={{ 
        marginBottom: "80px",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #eee"
      }}>
        <h1 style={{ 
          fontSize: "28px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "20px",
          textTransform: "capitalize"
        }}>
          {product.name}
        </h1>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "50px",
          alignItems: "center"
        }}>
          <div style={{ position: "relative" }}>
            {slideshowImages.length > 0 ? (
              <Slideshow images={slideshowImages} />
            ) : (
              <div style={{
                width: '100%',
                height: '500px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                borderRadius: '12px'
              }}>
                No images available
              </div>
            )}
          </div>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f8f8f8'
          }}>
            <p style={{ 
              fontSize: "16px", 
              lineHeight: "1.5",
              color: "#555"
            }}>
              {product.description}
            </p>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ 
                  fontSize: "20px", 
                  fontWeight: "600", 
                  color: "#333",
                  marginBottom: '8px'
                }}>
                  ₹{product.price}
                </p>
                <div style={{ 
                  display: 'flex',
                  gap: '10px',
                  marginTop: '8px'
                }}>
                  {['S', 'M', 'L'].map(size => (
                    <button
                      key={size}
                      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: selectedSize === size ? '#333' : '#fff',
                        color: selectedSize === size ? '#fff' : '#333',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <Rating value={4.5} />
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              alignItems: 'center',
              marginTop: '20px'
            }}>
              <button 
                className="add-to-cart-btn"
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select the size");
                    return;
                  }
                  try {
                    console.log("Adding product to cart...");
                    if (!addToCart) {
                      throw new Error("addToCart function is undefined");
                    }
                    if (!product) {
                      throw new Error("Product is undefined");
                    }
                    if (!selectedSize) {
                      throw new Error("Size is not selected");
                    }
                    console.log("Product Details:", {
                      id: product.id,
                      name: product.name,
                      price: product.price
                    });
                    console.log("Selected Size:", selectedSize);
                    addToCart({
                      ...product,
                      image: product.image || product.productImages?.[0]
                    }, selectedSize);
                    console.log("Product successfully added to cart");
                    alert("Product successfully added to cart!");
                  } catch (error) {
                    console.error("Error adding product to cart:", error);
                    alert("Failed to add product to cart. Please try again.");
                  }
                }}
              >
                <span className="cart-icon">🛒</span>
                ADD TO CART
              </button>
              <button 
                className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
                onClick={() => {
                  if (isInWishlist) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist({
                      ...product,
                      image: product.image || product.productImages?.[0]
                    });
                  }
                }}
              >
                <span className="wishlist-icon">
                  {isInWishlist ? '❤️' : '🤍'}
                </span>
              </button>
              <div style={{ 
                display: 'flex', 
                gap: '10px',
                marginLeft: '0',
              }}>
                <FaWhatsapp 
                  className="whatsapp-icon" 
                  style={{ 
                    fontSize: '35px', 
                    color: '#25D366', 
                    cursor: 'pointer'
                  }} 
                  onClick={handleWhatsAppClick}
                />
                <FaShareAlt 
                  className="share-icon" 
                  style={{ 
                    fontSize: '24px', 
                    color: '#333', 
                    cursor: 'pointer'
                  }} 
                  onClick={handleShareClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>
        All Products in {product.category}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {location.state?.allProducts.filter(p => p.id !== product.id).map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => {
              navigate(`/product/${relatedProduct.id}`, { 
                state: { 
                  product: {
                    ...relatedProduct,
                    productImages: Array.isArray(relatedProduct.image) ? relatedProduct.image : [relatedProduct.image],
                    title: relatedProduct.name || relatedProduct.title,
                    category: relatedProduct.category
                  },
                  allProducts: location.state?.allProducts || []
                } 
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {relatedProduct.image && relatedProduct.image.length > 0 ? (
              <img
                src={relatedProduct.image[0].startsWith('/') ? relatedProduct.image[0] : `/${relatedProduct.image[0]}`}
                alt={relatedProduct.name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "8px 8px 0 0",
                  backgroundColor: "#f8f8f8"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  marginTop:"300px",
                }}
              >
                Image not available
              </div>
            )}
            <div style={{ padding: "10px" }}>
              <p style={{ fontSize: "16px", marginBottom: "5px" }}>{relatedProduct.name}</p>
              <p style={{ fontSize: "14px", color: "#666" }}>₹{relatedProduct.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBTop: "10px",
          padding: "10px 20px",
          fontSize: "13px",
          color: "#fff",
          backgroundColor: "#333",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          height:"50px",
          width:'200px',
        }}
      >
        Back to Previous Page
      </button>
      <Footer />
    </div>
  );
};

export default ProductPage;
