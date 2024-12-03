import React, { useState, useEffect } from 'react';
import logo from '../../../assets/Fondos/logo.png';
import './header.css';
import HeaderUser from '../Header/HeaderUser';
import HeaderAdmin from '../Header/HeaderAdmin';
import { useSession } from '../../../constans/Stores/useSesion';
import { useLocation, useNavigate } from 'react-router-dom'; // Importar useLocation y useNavigate

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, login } = useSession();
  const location = useLocation(); // Obtener la ubicación actual
  const navigate = useNavigate(); // Navegación programática

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
        login(token);
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

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path, sectionId) => {
    if (location.pathname === '/') {
      // Si estás en la HomePage, hacer scroll a la sección
      handleScrollToSection(sectionId);
    } else {
      // Si no estás en la HomePage, redirigir a la HomePage
      navigate(path);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a
          href="#inicio"
          className="navbar-brand"
          onClick={() => handleNavigation('/', 'inicio')}
        >
          <img src={logo} alt="La Cervecería" className="logo" />
        </a>

        <nav className={`nav-links desktop ${isMenuOpen ? 'open' : ''}`}>
          <a
            href="#inicio"
            onClick={() => handleNavigation('/', 'inicio')}
          >
            Inicio
          </a>
          <a
            href="#AboutUs"
            onClick={() => handleNavigation('/', 'AboutUs')}
          >
            Nosotros
          </a>
          <a
            href="#Contact"
            onClick={() => handleNavigation('/', 'Contact')}
          >
            Contacto
          </a>
          <a href="/menu" className="btn btn-primary">Menu</a>

          {!isLoggedIn && (
            <a href="/login" className="btn btn-primary">Ingresar</a>
          )}

          {isLoggedIn && user && user.isAdmin && (
            <HeaderAdmin />
          )}

          {isLoggedIn && user && !user.isAdmin && (
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
          <a
            href="#inicio"
            onClick={() => {
              handleNavigation('/', 'inicio');
              toggleMenu();
            }}
          >
            Inicio
          </a>
          <a
            href="#AboutUs"
            onClick={() => {
              handleNavigation('/', 'AboutUs');
              toggleMenu();
            }}
          >
            Nosotros
          </a>
          <a
            href="#Contact"
            onClick={() => {
              handleNavigation('/', 'Contact');
              toggleMenu();
            }}
          >
            Contacto
          </a>
          <a
            href="/Menu"
            className="btn btn-primary"
            onClick={toggleMenu}
          >
            Menu
          </a>

          {!isLoggedIn && (
            <a
              href="/login"
              className="btn btn-primary"
              onClick={toggleMenu}
            >
              Ingresar
            </a>
          )}

          {isLoggedIn && user && user.isAdmin && (
            <HeaderAdmin />
          )}

          {isLoggedIn && user && !user.isAdmin && (
            <HeaderUser user={user} />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
