import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;
  
  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
    </div>
  );
};

export default Rating;
