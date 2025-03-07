import React, { useState } from 'react';
import { FaWhatsapp, FaHeart } from 'react-icons/fa';
import './card.css';

const Card = ({ title, followers, shares, onClick, products, image }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleWhatsappClick = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(description)} - ${encodeURIComponent(imageUrl)}`;
    window.open(url, '_blank');
  };

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    console.log('Liked the card');
  };

  const handleCardClick = (e) => {
    console.log('Card clicked');
    if (!e.target.closest('.card-actions')) {
      console.log('Calling onClick handler');
      onClick?.();
    } else {
      console.log('Click was on action buttons');
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {image && (
        <div className="card-image-container">
          <img
            src={image.startsWith('/') ? image : `/${image}`}
            alt={title}
            className="card-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="card-fallback">
            Image not available
          </div>
        </div>
      )}
      <h3 className="card-title">{title}</h3>


      <div className="card-info">
        Followers: {followers} | Shares: {shares}
      </div>

      <div className="card-actions">
        <div className="action-button">
          <FaWhatsapp 
            className="whatsapp-icon"
            onClick={handleWhatsappClick}
          />
          <div className="action-label">Share</div>
        </div>
        <div className="action-button">
          <FaHeart 
            className={`heart-icon ${isLiked ? 'liked' : ''}`}
            onClick={handleHeartClick}
          />
          <div className="action-label">Like</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
