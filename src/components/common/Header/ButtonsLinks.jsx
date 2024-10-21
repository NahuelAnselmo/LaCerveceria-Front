// src/components/common/Header/ButtonsLink.jsx
import { Link } from 'react-router-dom';
import './buttonsLink.css'; 

const ButtonsLink = () => {
  return (
    <div className="buttons-link">
      <Link to="/login" className="btn btn-primary">
        Iniciar Sesión
      </Link>
      <Link to="/register" className="btn btn-secondary">
        Registrarse
      </Link>
    </div>
  );
};

export default ButtonsLink;
