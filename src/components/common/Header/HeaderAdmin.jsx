
import { Link } from "react-router-dom";
import { useSession } from "../../../constans/Stores/useSesion";
import Swal from 'sweetalert2/';
import { useNavigate } from 'react-router-dom'
const HeaderAdmin = () => {
  const {logout} = useSession()
  const navigate = useNavigate(); 
  const handleLogout = async () =>{
    
    const action = await Swal.fire({
      icon: "question",
      title: "atencion",
      text: "estas seguro de que desea cerrar sesion?",
      confirmButtonText: "Si, cerrar",
      showCancelButton: true,
      cancelButtonText: "No, aun no ",
      color: "#121212"
    })
    if(action.isConfirmed){
      logout()
      navigate('/');

    }
  }
  return (
    <div>
      <Link className="navbar-brand py-4" to="/admin" >
        <h5 className="py-2">Administración de productos</h5>
      </Link>
      <Link className="navbar-brand py-4" to="/404">
        <h5>Gráficos de ventas</h5>
      </Link>
      <Link className="navbar-brand py-4" to="/404">
        <h5>Administración de clientes</h5>
      </Link>
      <Link className="navbar-brand py-4" to="/404">
        <h5>Administración administrativa</h5>
      </Link>
      <div className="text-end p-4">
        <button className="button-cerrar"  onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default HeaderAdmin;
