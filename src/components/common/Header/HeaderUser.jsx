import { useState } from 'react';
import { useSession } from '../../../constans/Stores/useSesion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Icono de usuario

import './HeaderUser.css';

const HeaderUser = () => {
  const { user, logout } = useSession(); // Accede al estado de la sesión aquí
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const action = await Swal.fire({
      icon: "question",
      title: "Atención",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      confirmButtonText: "Sí, cerrar",
      showCancelButton: true,
      cancelButtonText: "No, aún no",
    });

    if (action.isConfirmed) {
      logout();
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-user-container">
      <FaUserCircle className="user-icon" onClick={toggleMenu} />
      {menuOpen && (
        <div className="user-menu">
          <h2>Bienvenido, {user?.username}</h2>
          <button className="btn btn-edit">Editar Usuario</button>
          <button className="btn btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;