import Login from "./Login";
import Registro from "./Registro";
import { Modal } from "bootstrap";
import "./LRstyle.css";

const ModalLR = () => {
  const closeModal = () => {
    const modalElement = document.getElementById("modalLR");
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.hide();  
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('show');
        backdrop.remove();
        
      }
    }
  };
  return (
    <div
      className="modal fade"
      id="modalLR"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content text-center py-5">
          
            <h6 className="mb-0 pb-3">
              <span>Ingresar</span>
              <span>Registrarse</span>
            </h6>
            <input
              className="checkbox"
              type="checkbox"
              id="reg-log"
              name="reg-log"
            />
            
            <label htmlFor="reg-log"></label>
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                    <Login closeModal={closeModal}/>
                    </div>
                </div>
                <div className="card-back">
                  <div className="center-wrap">
                  <Registro closeModal={closeModal} /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default ModalLR;
