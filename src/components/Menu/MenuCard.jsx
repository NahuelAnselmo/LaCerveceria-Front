import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../Menu/menu.css"

const MenuCard = ({ menu, addToCart }) => {
  const [quantity, setQuantity] = useState(0); 
  const [stock, setStock] = useState(menu.stock); 

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(menu, quantity);
      setStock(stock - quantity); 
      setQuantity(0); 
    }
  };

  return (
    <div className="mb-3 card-styles  text-light ">
      <div className="row gap-2">
        
       
      <img
        src={menu.imageUrl}
        alt={menu.name}
        className="col-3 image-class"
      />
      <div className=" col-5">
        <h5 className="title-enfasis ">{menu.name}</h5>
        <p>{menu.description}</p>
        <h5 className="  title-enfasis">$ {menu.price}</h5>
        {stock > 0 ? (
            <p>Stock: {stock}</p>
          ) : (
            <p className="text-danger">Sin stock</p>
          )}
       </div>
     </div>
     {stock > 0 && (
        <div className="py-1 d-flex justify-content-between">
          <div className="quantity-div">
            <button
              className="button-quantity"
              onClick={decreaseQuantity}
              disabled={quantity === 0}
              style={{ color: "#f8c24e" }} 
            >
               <FaMinus />
            </button>

            <span className="text-warning fs-5 mx-3">{quantity}</span>

            <button
              className="button-quantity"
              onClick={increaseQuantity}
              disabled={quantity >= stock}
              style={{ color: "#f8c24e" }} 
            >
              <FaPlus />
            </button>

          </div>
          {quantity > 0 && (
            <div className="text-end">
              <button className="button-card" onClick={handleAddToCart}>
                Añadir al 🛒
              </button>
            </div>
          )}
        </div>
      )}
      </div>
   
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
};
export default MenuCard;