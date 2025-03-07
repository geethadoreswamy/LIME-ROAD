import React, { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext.jsx";
import { FaWhatsapp, FaHeart } from "react-icons/fa";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FilterSidebar from './FilterSidebar';
import "./WomenCategory.css";

const KidsCategory = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    if (location.state?.categoryData) {
      setProducts(location.state.categoryData);
      setFilteredProducts(location.state.categoryData);
      setLoading(false);
    } else {
      fetch("/kidsData.json")
        .then((res) => res.json())
        .then((data) => {
          if (categoryName) {
            const categoryKey = categoryName.toUpperCase();
            const categoryProducts = data.products.KIDS[categoryKey] || [];
            setProducts(categoryProducts);
            setFilteredProducts(categoryProducts);
          } else {
            const allProducts = Object.values(data.products.KIDS).flat();
            setProducts(allProducts);
            setFilteredProducts(allProducts);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    }
  }, [categoryName, location.state]);

  const handleFilterChange = ({ priceRange, colors }) => {
    const filtered = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className="products-page">
        <h1>{categoryName ? categoryName.toUpperCase() : "ALL KIDS' PRODUCTS"}</h1>

        {filteredProducts.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="product-image"
                  onClick={() =>
                    navigate(`/product/${product.id}`, { 
                      state: { 
                        product: {
                          ...product,
                          title: product.name,
                          productImages: product.image,
                          category: categoryName
                        },
                        allProducts: filteredProducts
                      } 
                    })
                  }
                  style={{ cursor: "pointer" }}
                />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ₹{product.price}</p>
                <p className="product-sizes">Sizes: <span className="sizes-letters">{product.sizes}</span></p>
                <p className="product-type">Type: {product.type}</p>
                <p className="product-wishlist">{product.wishlist}</p>
                <div className="product-icons">
                  <a 
                    href={`https://wa.me/?text=Check%20out%20this%20product:%20${product.name}%20-%20${window.location.href}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="whatsapp-icon"
                  >
                    <FaWhatsapp />
                  </a>
                  <button 
                    className={`heart-icon ${wishlistItems.some(item => item.id === product.id) ? 'active' : ''}`} 
                    onClick={() => {
                      if (wishlistItems.some(item => item.id === product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KidsCategory;
