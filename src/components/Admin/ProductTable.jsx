import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import Slider from "react-slick";
import "./Admin.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const groupedProducts = (products || []).reduce((acc, product) => {
    if (!product || !product.category) {
      return acc;
    }
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const handleEdit = (product) => {
    onEdit(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(productId); 
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div className="admin-list container">
      {Object.keys(groupedProducts).map((category) => (
        <div className="category-section categoryTitle py-4 text-white" key={category}>
          <h3>{category}</h3>
          <Slider {...settings}>
            {groupedProducts[category].map((product) => (
              <div key={product.id} className="px-2"> 
                <div className="card h-60">
                  <img
                    alt={product.name}
                    className="card-img-top"
                    src={product.imageUrl}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-sm">{product.name}</h5>
                    <p className="card-text text-sm">{product.description}</p>
                    <p className="card-text text-sm">Precio: ${product.price}</p>
                    <p className="card-text text-sm">Stock: {product.stock ? product.stock : "Sin stock"}</p>
                    <p className="card-text text-sm">
                      Disponible: {product.available ? "Sí" : "No"}
                    </p>
                    <div className="mt-auto d-flex justify-content-around">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      ingredients: PropTypes.string,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductTable;