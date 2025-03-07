import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import "./NavBar2.css";
import kurta from "../images/kurta.jpg";
import tops from "../images/top.jpg";
import dress from "../images/dreses.jpg";
import saree from "../images/saree.jpg";
import suits from "../images/suits.jpg";
import ethnic from "../images/ethnic.jpg";
import bottom from "../images/bottom.jpg";
import MyFeed from "../images/MyFEED.avif";
import shirts from "../images/shirts.jpg";
import Tshirt from "../images/T-shirt.jpg";
import jeans from "../images/jeans.jpg";
import trouser from "../images/trouser.jpg";
import jackets from "../images/jackets.jpg";
import baby from "../images/baby.jpg";
import babydress from "../images/babyDress.jpg";
import babyTops from "../images/bayTops.jpg";
import shorts from "../images/shorts.jpg";

const categories = {
  WOMEN: [
    { name: "MY FEED", icon: MyFeed, isHighlighted: true },
    { name: "KURTAS", icon: kurta, path: "/women/kurtas" },
    { name: "TOPS", icon: tops, path: "/women/tops" },
    { name: "DRESSES", icon: dress, path: "/women/dresses" },
    { name: "SAREES", icon: saree, path: "/women/sarees" },
    { name: "SUITS", icon: suits, path: "/women/suits" },
    { name: "ETHNIC SETS", icon: ethnic, path: "/women/ethnic-sets" },
    { name: "BOTTOMS", icon: bottom, path: "/women/bottoms" },
  ],
  MEN: [
    { name: "MY FEED", icon: MyFeed, isHighlighted: true },
    { name: "SHIRTS", icon: shirts, path: "/men/shirts" },
    { name: "T-SHIRTS", icon: Tshirt, path: "/men/tshirts" },
    { name: "JEANS", icon: jeans, path: "/men/jeans" },
    { name: "TROUSERS", icon: trouser, path: "/men/trousers" },
    { name: "JACKETS", icon: jackets, path: "/men/jackets" },
  ],
  KIDS: [
    { name: "MY FEED", icon: MyFeed, isHighlighted: true },
    { name: "BABY WEAR", icon: baby, path: "/kids/baby-wear" },
    { name: "DRESSES", icon: babydress, path: "/kids/dresses" },
    { name: "TOPS", icon: babyTops, path: "/kids/tops" },
    { name: "SHORTS", icon: shorts, path: "/kids/shorts" },
  ],
};

const NavBar2 = () => {
  const [activeTab, setActiveTab] = useState("WOMEN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategoryClick = async (path, categoryName) => {
    if (path) {
      try {
        const response = await fetch("/imagesData.json");
        const data = await response.json();
        const categoryKey = categoryName.toUpperCase();
        const categoryData = data.products.WOMEN[categoryKey] || [];
      } catch (error) {
        console.error("Error fetching category data:", error);
        navigate(path);
      }
    }
  };

  return (
    <div className="navbar">
      <div className="menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </div>
      <div className={`tabs ${isMobileMenuOpen ? 'open' : ''}`}>
        <span
          className={`tab ${activeTab === "WOMEN" ? "active" : ""}`}
          onClick={() => setActiveTab("WOMEN")}
        >
          WOMEN
        </span>
        <span
          className={`tab ${activeTab === "MEN" ? "active" : ""}`}
          onClick={() => setActiveTab("MEN")}
        >
          MEN
        </span>
        <span
          className={`tab ${activeTab === "KIDS" ? "active" : ""}`}
          onClick={() => setActiveTab("KIDS")}
        >
          KIDS <span className="new-label">NEW</span>
        </span>
      </div>
      <div className={`categories-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="categories">
          {categories[activeTab].map((category, index) => (
            <div
              key={index}
              className={`category ${
                category.name === "MY FEED" ? "myfeed" : ""
              }`}
              onClick={() => handleCategoryClick(category.path, category.name)}
            >
              <Link
                to={`${category.path}`}
                className="category-image-container"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className={`category-image ${
                    category.name === "MY FEED" ? "myfeed-image" : ""
                  }`}
                />
              </Link>
              <span
                className={`category-name ${
                  category.name === "MY FEED" ? "myfeed-name" : ""
              }`}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar2;
