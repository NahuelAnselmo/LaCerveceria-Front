import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import "./SocialIcons.css";

const SocialIcons = () => {
    return (
      <div className="social-icons">
        <a href="/404" className="social-icon" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="/404" className="social-icon" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="/404" className="social-icon" aria-label="WhatsApp">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    );
  };
  
  export default SocialIcons;
  