import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import "../FooterNavbar/footerNavBar.css"


const FooterNavbar = ({ totalAmount, onCartClick  }) => {
    return (
      <div className="navbar-footer">
      <div className="content-footer px-2 d-flex justify-content-start align-items-center">
        <span className="item-footer">
          Total: <strong>${totalAmount.toFixed(2)}</strong>
        </span>        
        <div className="footer-icon ms-auto" onClick={onCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
      </div>
    </div>
      );
    };
    
    export default FooterNavbar;
    
    FooterNavbar.propTypes = {
      totalAmount: PropTypes.number.isRequired,
      onCartClick: PropTypes.func.isRequired,  

    };