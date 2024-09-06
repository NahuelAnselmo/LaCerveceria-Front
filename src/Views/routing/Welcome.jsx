import { useState, useEffect } from 'react';
import Bienvenida from '../../components/Bienvenida/Bienvenida';
import PaginaPrincipal from '../../components/PaginaPrincipal/PaginaPrincipal';
import { useSession } from '../../constans/Stores/useSesion';

const Welcome = () => {
  const {isLoggedIn} = useSession()
    const [showMainPage, setShowMainPage] = useState(false);

    useEffect(() => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        headerElement.style.display = showMainPage ? 'block' : 'none';
      }
    }, [showMainPage]);
  
    const handleWelcomeComplete = () => {
      setShowMainPage(true);
    };
  
    return (
      <div>
      {isLoggedIn ? (
        <PaginaPrincipal />
      ) : (
        <div>
          {!showMainPage && <Bienvenida onComplete={handleWelcomeComplete} />}
          {showMainPage && <PaginaPrincipal />}
        </div>
      )}
    </div>
    );
  };
export default Welcome