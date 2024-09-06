import PropTypes from 'prop-types';
import ButtonsLink from "./buttonsLink"
import "./header.css"
import Swal from 'sweetalert2/src/sweetalert2.js';
import { useSession } from '../../../constans/Stores/useSesion';
import { useNavigate } from 'react-router-dom';

const HeaderUser = ({user}) => {
  const {logout} = useSession()
  const navigate = useNavigate(); 
  const handleLogout = async () =>{
    
    const action = await Swal.fire({
      icon: "question",
      title: "atencion",
      text: "Estas seguro de que desea cerrar sesion?",
      confirmButtonText: "Si, cerrar",
      showCancelButton: true,
      cancelButtonText: "No, aun no ",
      color: "#121212"
    })
    if(action.isConfirmed){
      logout()
      navigate('/')
      
    }
  }
  return (
    <div>
        <section className="py-4">
        <h2>Bienvenido {user.name}</h2>
        <ButtonsLink/>
        <div className="d-flex justify-content-between py-5 px-3">
            <button className="btn btn-dark">Editar usuario</button>
            <button className="button-cerrar" onClick={handleLogout}>cerrar sesion</button>
        </div>
        </section>
    </div>
  )
}
export default HeaderUser
HeaderUser.propTypes = {
  user: PropTypes.object.isRequired, 
 
};