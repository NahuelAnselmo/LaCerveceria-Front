import "../Contact/map.css";

const Map = () => {
  return (
    <div className="map-container text-center my-4">
      <h1 className="map-h1">Encontranos en:</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780.058773162136!2d-65.2075618824431!3d-26.83621336163858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1724197263790!5m2!1ses!2sar"
        className="map-iframe"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
       <div className="contact-info mt-4">
        <p>Dirección: Gral. José María Paz 576, T4000 San Miguel de Tucumán, Tucumán</p>
        <p>Teléfono: +54 381 5783030</p>
        <p>WhatsApp: +54 381 5783030</p>
      </div>
    </div>
  );
};
export default Map;