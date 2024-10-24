import { useEffect } from 'react';
import { useSession } from '../../../constans/Stores/useSesion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './HeaderUser.css';

const HeaderUser = () => {
  const { user, logout } = useSession(); // Accede al estado de la sesión aquí
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cambio detectado en la sesión:", user);
  }, [user]);

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
      {user ? (
        <>
          <h2>Bienvenido, {user?.username}</h2>
          <div className="d-flex justify-content-between">
            <button className="btn btn-dark">Editar Usuario</button>
            <button className="btn-cerrar" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </>
      ) : (
        <h2>Iniciando sesión...</h2>
      )}
    </div>
  );
};

export default HeaderUser;
