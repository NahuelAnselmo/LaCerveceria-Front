
import './AboutUs.css'; 

import Tobias from '../../assets/ImgIntegrantes/Tobias.jpg'
import NahuelAnselmo from '../../assets/ImgIntegrantes/NahuelAnselmo.jpeg'
import MarioArroyo from '../../assets/ImgIntegrantes/MarioArroyo.jpg'
import Jose from '../../assets/ImgIntegrantes/Jose.jpg'


const AboutUs = () => {
  const members = [
    {
      name: 'Tobias Zarlenga',
      description: 'Tengo 19 años, soy un entusiasta del deporte y la tecnología',
      image: Tobias,
    },
    {
      name: 'Nahuel Anselmo',
      description: 'Tengo 29 años, me gusta mucho la programación, viajar y jugar al voley',
      image: NahuelAnselmo,
    },
    {
      name: 'Mario Arroyo',
      description: 'Tengo 28 años, me gusta mucho la programación y mi pasatiempo son los jueguitos',
      image: MarioArroyo,
    },
    {
      name: 'Jose',
      description: 'Tengo 29 años, con una tecnicatura en QA testing y actualmente trabajando en un drugstore',
      image: Jose,
    },
  ];

  return (
    <section className="aboutUs-section">
      <img src="https://www.cucinare.tv/wp-content/uploads/2023/05/Punto-Mona-Barra-1024x683.jpg" alt="Banner" className='aboutUs-banner '/>
      <p className='text-light text-center mt-4 container'><b>Exilir and Bite</b> El lugar perfecto para disfrutar de una noche inolvidable,
      somos un bar nocturno dedicado a ofrecer las mejores bebidas y comidas en un ambiente vibrante y acogedor.
      En Exilir and Bite, nos especializamos en preparar una amplia variedad de tragos exquisitos y platos deliciosos que satisfacen todos los gustos.
      Ya sea que estés buscando un cóctel innovador, una cerveza artesanal o una comida deliciosa, nuestro menú está diseñado para que cada visita sea una experiencia memorable.
      Nuestro objetivo es simple: queremos que todos nuestros clientes se diviertan y disfruten de una noche llena de buena compañía, música y un ambiente relajado.
      Ven y únete a nosotros para brindar, reír y crear recuerdos que durarán toda la vida.
      ¡Te esperamos para compartir una noche fantástica y celebrar juntos!</p>
      <h2 className="title">¿Quiénes somos?</h2>
      <div className="aboutUs">
        {members.map((member, index) => (
          <div className="memberCard my-2" key={index}>
            <img src={member.image} alt={member.name} className="memberImage" />
            <div className="aboutUs-info">
              <h3 className="memberName">{member.name}</h3>
              <p className="memberDescription">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
