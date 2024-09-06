import { Link } from "react-router-dom";


const Error404View = () => {
  return (
    <>
     
      <div className="text-center pt-5">
        <div className="container">

        <h5 className="text-white px-2">
          ¡Ups! Parece que nuestro enano ebrio se perdió por el camino... La
          página que buscas no está disponible. ¡Vuelve al festín en Elixir and
          Bites!
        </h5>
        </div>
        <img src="public\E&B-404.png" className="w-75" alt="enano ebrio" />
        <div className="py-4">

        <Link to="/" className="bg-dark  rounded-button">
              <span className="px-2">  Vuelve al inicio de tu aventura  </span>
            </Link>
        </div>
      </div>
      
    </>
  );
};
export default Error404View;
