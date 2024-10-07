import Slider from 'react-slick';
import './CategoriesMenu.css';

const CategoriesMenu = ({ categories = [] }) => { 
  const categoryImages = {
    burgers: '/assets/burgers.jpg',
    entrantes: '/assets/entrantes.jpg',
    tragos: '/assets/tragos.jpg',
    bebidas: '/assets/bebidas.jpg',
    cervezas: '/assets/cervezas.jpg',
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="categories-menu">
      <h2>Nuestras Categorías</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.name} className="category-item">
            <img
              src={categoryImages[category.name.toLowerCase()] || '/assets/default.jpg'} // Use a default image if category is not found
              alt={category.name}
              className="category-image"
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesMenu;
