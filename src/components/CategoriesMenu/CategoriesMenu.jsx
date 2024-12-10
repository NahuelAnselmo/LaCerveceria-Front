import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./CategoriesMenu.css"; 


import cerveza1 from "../../assets/Images/cerveza1.jpg";
import cerveza2 from "../../assets/Images/cerveza2.jpg";
import cerveza3 from "../../assets/Images/cerveza3.jpg";
import cerveza4 from "../../assets/Images/cerveza4.jpg";
import trago1 from "../../assets/Images/trago1.jpeg";
import trago2 from "../../assets/Images/trago2.jpeg";
import comida1 from "../../assets/Images/comida1.jpg";
import comida2 from "../../assets/Images/comida2.jpeg";
import comida3 from "../../assets/Images/comida3.jpeg";
import comida4 from "../../assets/Images/comida4.jpeg";
import milanesa1 from "../../assets/Images/milanesa1.jpeg";
import milanesa2 from "../../assets/Images/milanesa2.jpeg";

const Categories = () => {
  const settings = {
    dots: false, 
    infinite: true, 
    speed: 750, 
    slidesToShow: 5, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 1500, 
    pauseOnHover: true, 
    cssEase: "ease-in-out", 
    arrows: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="categories-slider">
      <Slider {...settings}>
        {[cerveza1, cerveza2, cerveza3, cerveza4, trago1, trago2].map((image, index) => (
          <div key={`cerveza-${index}`} className="category-item">
            <img src={image} alt={`Cerveza ${index + 1}`} className="category-image" />
          </div>
        ))}
      </Slider>

      <Slider {...settings}>
        {[comida1, comida2, comida3, comida4, milanesa1, milanesa2].map((image, index) => (
          <div key={`comida-${index}`} className="category-item">
            <img src={image} alt={`Comida ${index + 1}`} className="category-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
