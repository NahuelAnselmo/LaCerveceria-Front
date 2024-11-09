import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer"; // Asegúrate de que Footer esté importado

const RootView = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Ocultar el footer en la página de edición de usuario
    if (location.pathname === "/user/edit") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      {showFooter && <Footer />} {/* Mostrar el footer solo si `showFooter` es verdadero */}
    </>
  );
};

export default RootView;
