import { Link } from "react-router-dom";
import { useSession } from "../../constans/Stores/useSesion";

import ModalLR from "../common/LogReg/ModalLR";
import "./principal.css";

const PaginaPrincipal = () => {
  const {isLoggedIn} = useSession()
  return (
    <>
     
      <main>
        <div className="imagen-inicio">
          <img src="https://www.montpellier-tourisme.fr/app/uploads/montpelliertourisme/2022/11/thumbs/bar-g75e07b9f9_1920-1920x960-crop-1668432243.jpg"></img>
        </div>
        <div className=" w-80  d-flex justify-content-center p-4">
          <table className="tabla w-90 ">
            <thead>
              <tr>
                <th className="table-row"></th>
                <th className="table-row text-center enfasis">Horarios</th>
                <th className="table-row"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row row1">
                <td>Lunes a Miércoles</td>
                <td className="pl-4 pr-4 pt-2">-----------</td>
                <td>19:00 a 00:30</td>
              </tr>

              <tr className="table-row row2">
                <td>Jueves y Viernes</td>
                <td className="pl-4 pr-4 pt-2">-----------</td>
                <td>19:00 a 01:30</td>
              </tr>

              <tr className="table-row row3">
                <td>Sábado</td>
                <td className="pl-4 pr-4 pt-2">-----------</td>
                <td>19:00 a 05:30</td>
              </tr>

              <tr className="table-row row4">
                <td>Domingo</td>
                <td className="pl-4 pr-4 pt-2">-----------</td>
                <td className="text-center">Cerrado</td>
              </tr>
            </tbody>
          </table>  
        </div>
        
    
        <div className=" text-center p-4">
        {isLoggedIn ? (
          
      <Link to="/menu" className="btn bg-dark px-5 rounded-button my-5">
      <h2>Menu</h2>
    </Link>
    
               
  ) : (
   <>
     <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#modalLR"
      className="my-1 rounded-button"
      >Ingresar </button>
    <Link to="/menu" className="btn bg-dark px-5 rounded-button my-5">
    <h2>Menu</h2>
  </Link>
      </>
  
              )}
      
          
    <ModalLR/>
        </div>

        <div className=" d-flex justify-content-center">
          <iframe 
            className="mapa"          
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1060679493985!2d-65.20974192366222!3d-26.83657849002869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1724102216000!5m2!1ses-419!2sar"          
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <p className=" direccion text-white text-center mb-0"> Gral. Paz 576 </p>
        </div>
      </main>


    </>
  );
};

export default PaginaPrincipal;
