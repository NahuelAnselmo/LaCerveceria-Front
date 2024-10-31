import { useNavigate} from "react-router-dom";

const Error404View = () => {
  
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center pt-5">
        <div className="container">
        </div>
        <img src="public\404.jpg" className="w-10" alt="enano ebrio" />
        <div className="py-4">

        <button onClick={() => navigate("/")} className="btn btn-secondary mt-3">
        Volver al inicio
      </button>
        </div>
      </div>
      
    </>
  );
};
export default Error404View;
