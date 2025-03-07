
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./card";
import womenData from "../../public/imagesData.json";
import './card.css';

const CardList = () => {
  const navigate = useNavigate();
  const cardsData = [
    {
      title: "Kurtas",
      category: "KURTAS",
      followers: "15K",
      shares: "5"
    },
    {
      title: "Tops",
      category: "TOPS",
      followers: "15K",
      shares: "11"
    },
    {
      title: "Dresses",
      category: "DRESSES",
      followers: "15K",
      shares: "9"
    },
    {
      title: "Sarees",
      category: "SAREES",
      followers: "15K",
      shares: "3"
    },
    {
      title: "Ethnic Wear",
      category: "ETHNIC-SETS",
      followers: "15K",
      shares: "7"
    },
    {
      category: "BOTTOMS",
      followers: "15K",
      shares: "12"
    }
  ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load product data from JSON
    setProducts(womenData.products.WOMEN);
  }, []);

  const handleCardClick = (card) => {
    try {
      // Find matching products for the card category
      const categoryProducts = products[card.category] || [];
      
      if (categoryProducts.length > 0) {
        const [product, ...relatedProducts] = categoryProducts;
        navigate(`/product/${product.id}`, {
          state: {
            product: {
              ...product,
              productImages: Array.isArray(product.image) ? product.image : [product.image],
              title: product.name || product.title,
              category: card.category
            },
            allProducts: categoryProducts
          }
        });
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "7%",
        padding: "10px",
        maxWidth: "1500px",
        marginLeft: "60px",
        marginRight: "120px",
        marginTop: "0px",
        marginBottom: "0px",
      }}
    >
      {cardsData.map((card, index) => {
        return (
          <div key={index} style={{ cursor: "pointer" }}>
            <Card 
              {...card} 
              onClick={() => handleCardClick(card)}
              products={products[card.category] || []}
              image={products[card.category]?.[0]?.image?.[0] || ''}
            />
          </div>
        );
      })}
    </div>
  );
};
export default CardList;
