import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/ImgIntegrantes/logo.png'; // Asegúrate de que la ruta sea correcta
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="La Cervecería" className="logo" />
        </Link>

        <nav className={`nav-links desktop ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/">Inicio</Link>
          <Link to="/AboutUs">Nosotros</Link>
          <Link to="/Contact">Contacto</Link>
          <Link to="/menu" className="btn btn-primary">Menu</Link>
          <Link to="/login" className="btn btn-primary">Ingresar</Link>
        </nav>

        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Menú para móviles */}
        <nav className={`nav-links mobile ${isMenuOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={toggleMenu}>&times;</button> {/* Botón de cerrar */}
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/AboutUs" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/Contact" onClick={toggleMenu}>Contacto</Link>
          <Link to="/menu" className="btn btn-primary" onClick={toggleMenu}>Menu</Link>
          <Link to="/login" className="btn btn-primary" onClick={toggleMenu}>Ingresar</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
