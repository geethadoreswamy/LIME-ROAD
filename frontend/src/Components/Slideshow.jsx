import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const Slideshow = ({ images }) => {
  console.log('Received images:', images); // Debugging
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);


  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    
    if (nextIndex === 0) {
      setCycleCount(prev => prev + 1);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 1000);

    // Clear interval after 3 full cycles
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, images.length * 3 * 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);


  return (
    <div className="slideshow-container">
      <div 
        className="slideshow-wrapper"
        style={{ '--current-index': currentIndex }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#f0f0f0' // Fallback color
            }}
            onError={(e) => {
              console.error('Failed to load image:', image);
              e.target.style.backgroundImage = 'none';
            }}
          />

        ))}
      </div>
      


      <div className="slideshow-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}

          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
