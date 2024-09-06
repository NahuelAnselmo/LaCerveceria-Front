import { Link } from "react-router-dom"

const ButtonsLink = () => {
  return (
    <div className="d-flex justify-content-center my-3 row">
            <Link to="/AboutUs" className="bg-dark rounded-button my-5">
              <span>Acerca de nosotros</span>
            </Link>
            <Link to="/Contact" className="bg-dark  rounded-button">
              <span>Contactanos</span>
            </Link>
           
          
          </div>
          
  )
}
export default ButtonsLink