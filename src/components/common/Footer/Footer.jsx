import './Footer.css';
import logo from "../../../assets/ImgIntegrantes/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo La Cervecería" />
        <div className="contact-info">
          <p>Contactos: +56 9 82730796</p>
          <p>Email: paola@barlacerveceria.cl</p>
        </div>
        <div className="social-links">
          <a href="#"><img src="/assets/facebook.png" alt="Facebook" /></a>
          <a href="#"><img src="/assets/instagram.png" alt="Instagram" /></a>
          <a href="#"><img src="/assets/whatsapp.png" alt="WhatsApp" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
