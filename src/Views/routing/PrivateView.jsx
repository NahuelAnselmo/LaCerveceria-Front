import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSession } from "../../constans/Stores/useSesion";

const PrivateView = () => {
  const { user, isLoggedIn } = useSession();
  const location = useLocation();


  if (location.pathname.startsWith('/admin')) {
    if (!isLoggedIn || !user?.isAdmin) {
      return <Navigate to="/" replace />;
    }
  } else {

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateView;
