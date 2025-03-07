

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css'; 
import image1 from '../Assets/carouselImages/img-1738312997291.avif'
import image2 from '../Assets/carouselImages/image2.1.avif'
import image3 from '../Assets/carouselImages/img3.avif'
import image4 from '../Assets/carouselImages/img4.avif'
import image5 from '../Assets/carouselImages/img5.avif'
import image6 from '../Assets/carouselImages/img6.avif'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };


  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-slide">
          <img src={image1} alt="Image 1" className="carousel-image" />
        </div>
        <div className="carousel-slide">
          <img src={image2} alt="Image 2" className="carousel-image" />
        </div>
        <div className="carousel-slide">
          <img src={image3} alt="Image 3" className="carousel-image" />
        </div>
        <div className="carousel-slide">
          <img src={image4} alt="Image 4" className="carousel-image" />
        </div>
        <div className="carousel-slide">
          <img src={image5} alt="Image 5" className="carousel-image" />
        </div>
        <div className="carousel-slide">
          <img src={image6} alt="Image 6" className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
