import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import "../FooterNavbar/footerNavBar.css"


const FooterNavbar = ({ totalAmount, onCartClick,tableNumber  }) => {
    return (
      <div className="navbar-footer">
      <div className={`content-footer px-2 d-flex ${tableNumber ? 'justify-content-between' : 'justify-content-start'} align-items-center`}>
        <span className="item-footer">
          Total: <strong>${totalAmount.toFixed(2)}</strong>
        </span>
        
        {tableNumber && (
          <span className="item-footer">
            Mesa: <strong>{tableNumber}</strong>
          </span>
        )}
        
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
      tableNumber: PropTypes.string.isRequired
    };