import { Link } from "react-router-dom";
import { useSession } from "../../../constans/Stores/useSesion";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
  const { logout } = useSession();
  const navigate = useNavigate();

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

  return (
    <div className="admin-menu">
      <Link to="/admin">Administrar productos</Link>
      <Link to="/ventas">Gráficos de ventas</Link>
      <button className="btn-cerrar" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default HeaderAdmin;
