import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "../../constans/Stores/useSesion";

const PrivateView = () => {
  const { user, isLoggedIn } = useSession();

  if (!isLoggedIn || (user && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateView;