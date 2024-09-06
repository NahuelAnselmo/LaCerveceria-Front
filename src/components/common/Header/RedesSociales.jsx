import { Link } from "react-router-dom";

const RedesSociales = () => {
  return (
    <div className="row text-center d-flex justify-content-between">
      <div className="col-6">
        
      <Link className="navbar-brand" to="/404">
          <img
          src="../../../../10464230.png"
          className="ico-redes"
          alt="Tiktok"
        />
        <h5>TikTok</h5>
        </Link>
      </div>
     
        <div className="col-6">
          <Link className="navbar-brand" to="/404">
          
          <img
            src="../../../../Instagram_logo_2016.svg.png"
            className="ico-redes"
            alt="Instagram"
            />
          <h5>Instagram</h5>
            </Link>
        </div>
      </div>
    
  );
};
export default RedesSociales;
