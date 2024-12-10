import { useNavigate } from "react-router-dom";

const Error404View = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="d-flex flex-column align-items-center justify-content-center vh-100 text-center"

    >
      <div className="container">
        <img 
          src="/404.jpg" 
          className="img-fluid" 
          alt="Error 404" 
        />
        <p className="fs-5 text-muted">
          Lo sentimos, la página que buscas no existe.
        </p>
        <button 
          onClick={() => navigate("/")} 
          className="btn btn-secondary mt-3"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Error404View;
