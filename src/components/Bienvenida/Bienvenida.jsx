import { useEffect } from "react";
import { PropTypes } from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import "./bienvenida.css"; 

const Bienvenida = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="bienvenida d-flex justify-content-center align-items-center position-relative vh-100 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
<div className="container-fluid p-0">
  <div className="bg-image" style={{ backgroundImage: `url('https://img.freepik.com/foto-gratis/cocteles-frescos-lima-fruta-mesa-ia-generativa_188544-12368.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723161600&semt=ais_hybrid')` }}>
    <div className="overlay"></div>
  </div>
  </div>

        <h1>Bienvenido <br/> a <br/> Elixir & Bites</h1>
        <img
          src="https://www.lanacion.com.ar/resizer/v2/ademas-de-ofrecer-otros-estilos-y-mayor-variedad-4E6ANDTHRFD3HNUNN6D7G3BT7M.jpg?auth=a3e3f2b4aef3c55600607e90392d47750b18d989d35263fd4a0b3c9f11a70422&width=420&height=630&quality=70&smart=true"
          className="centered-bottom-image"
          alt="bienvenida"
        ></img>
      </motion.div>
    </AnimatePresence>
  );
};



Bienvenida.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Bienvenida;
