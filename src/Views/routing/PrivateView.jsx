import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSession } from "../../constans/Stores/useSesion";

const PrivateView = () => {
  const { user, isLoggedIn } = useSession();
  const location = useLocation();

  // Rutas que comienzan con '/admin' solo deben ser accesibles por administradores
  if (location.pathname.startsWith('/admin')) {
    if (!isLoggedIn || !user?.isAdmin) {
      return <Navigate to="/" replace />;
    }
  } else {
    // Otras rutas privadas para usuarios regulares autenticados
    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateView;
