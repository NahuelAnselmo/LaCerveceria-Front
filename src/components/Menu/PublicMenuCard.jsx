import PropTypes from "prop-types";
import "../Menu/menu.css";

const PublicMenuCard = ({ menu }) => {
  return (
    <div className="mb-3 card-styles text-light">
      <div className="row gap-2">
        <img
          src={menu.imageUrl}
          alt={menu.name}
          className="col-6 image-class"
        />
        <div className="col-5">
          <h5 className="title-enfasis">{menu.name}</h5>
          <p className="text-light">{menu.description}</p>
          <h5 className="title-enfasis">$ {menu.price}</h5>
          <p className="text-light">Stock: {menu.stock}</p>
        </div>
      </div>
    </div>
  );
};

PublicMenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default PublicMenuCard;
