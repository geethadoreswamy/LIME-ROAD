import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching products...");
      try {
        const response = await fetch('http://localhost:5027/products.json');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <div className="products">
        {Object.keys(products).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <div className="product-category">
              {products[category].map((product) => (
                <Link to={`/product-detail/${product.id}`} key={product.id} className="product-item">
                  <img src={`http://localhost:5027${product.image}`} alt={product.product_name} />
                  <h3>{product.product_name}</h3>
                  <p>{product.description}</p>
                  <p>New Price: ₹ {product.new_price} <span className="old-price">Old Price: ₹ {product.old_price}</span></p>
                  <p>Rating: {product.rating}</p>
                  <p>Sizes: {product.sizes}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
