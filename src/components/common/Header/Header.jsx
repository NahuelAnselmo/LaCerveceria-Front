import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/ImgIntegrantes/logo.png';
import './Header.css';
import HeaderUser from '../Header/HeaderUser';
import { useSession } from '../../../constans/Stores/useSesion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, login } = useSession(); // Trae el estado de la sesión

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Detectar cambios en el localStorage del token para recargar la sesión
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        login(token); // Actualiza el estado de sesión si hay un nuevo token
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [login]);

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

          {!isLoggedIn && (
            <Link to="/login" className="btn btn-primary">Ingresar</Link>
          )}

          {isLoggedIn && user && (
            <HeaderUser user={user} />
          )}
        </nav>

        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Menú para móviles */}
        <nav className={`nav-links mobile ${isMenuOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={toggleMenu}>&times;</button>
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/AboutUs" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/Contact" onClick={toggleMenu}>Contacto</Link>
          <Link to="/menu" className="btn btn-primary" onClick={toggleMenu}>Menu</Link>

          {!isLoggedIn && (
            <Link to="/login" className="btn btn-primary" onClick={toggleMenu}>Ingresar</Link>
          )}

          {isLoggedIn && user && (
            <HeaderUser user={user} />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
