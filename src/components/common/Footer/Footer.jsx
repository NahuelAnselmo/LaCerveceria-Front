import './Footer.css'; 
import logo from "../../../assets/ImgIntegrantes/logo.png";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Logo La Cervecería" />
        </div>
        <div className="footer-info">
          <div className="contact-info">
            <h4>Contactos</h4>
            <p>Email: Lacerveceriatucu@gmail.com</p>
          </div>
        </div>
        <div className="footer-social">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
