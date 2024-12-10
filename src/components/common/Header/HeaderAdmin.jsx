import { Link } from "react-router-dom";
import { useSession } from "../../../constans/Stores/useSesion";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './HeaderAdmin.css';
import { FaUserCircle } from 'react-icons/fa'; 
import { useState } from 'react';

const HeaderAdmin = ({ toggleMenu }) => {
  const { user, logout } = useSession();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      localStorage.removeItem("tableNumber");
      logout();
      navigate('/');
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleMenu(); 
  };

  return (
    <div className="header-admin-container">
      <FaUserCircle className="user-icon" onClick={handleMenuToggle} />
      {isMenuOpen && (
        <div className="admin-menu">
          <h2>Bienvenido Admin, {user?.username}</h2>
          <Link to="/admin" className="btn btn-edit">Administrar productos</Link>
          <Link to="/ventas" className="btn btn-edit">Gráficos de ventas</Link>
          <button className="btn btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default HeaderAdmin;
