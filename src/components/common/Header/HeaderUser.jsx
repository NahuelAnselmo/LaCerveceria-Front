import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useSession } from '../../../constans/Stores/useSesion';
import { useNavigate } from 'react-router-dom';
import ButtonsLink from "./ButtonsLinks";

const HeaderUser = ({ user }) => {
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
    <div className="user-menu">
      <h2>Bienvenido, {user.name}</h2>
      <div className="d-flex justify-content-between">
        <button className="btn btn-dark">Editar Usuario</button>
        <button className="btn-cerrar" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

HeaderUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default HeaderUser;
