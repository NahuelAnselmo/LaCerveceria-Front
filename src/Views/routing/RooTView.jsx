import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

const RootView = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    
    if (location.pathname === "/menu") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location.pathname]);

  return (
    <>
      <main className="flex-grow-1">
        <Header />
        <Outlet />
        {showFooter && <Footer />}
      </main>
    </>
  );
};

export default RootView;