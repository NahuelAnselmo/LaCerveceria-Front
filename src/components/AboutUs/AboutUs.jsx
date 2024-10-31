import './AboutUs.css'; 

import NahuelAnselmo from '../../assets/ImgIntegrantes/NahuelAnselmo.jpeg';
import MarioArroyo from '../../assets/ImgIntegrantes/MarioArroyo.jpg';
import SantiagoAltamiranda from '../../assets/ImgIntegrantes/SantiagoAltamiranda.jpg';

const AboutUs = () => {
  const members = [
    {
      name: 'Santiago Altamiranda',
      description: 'Tengo 28 años, me gusta la programación y el fútbol.',
      image: SantiagoAltamiranda,
    },
    {
      name: 'Nahuel Anselmo',
      description: 'Tengo 29 años, me gusta mucho la programación, viajar y jugar al voley.',
      image: NahuelAnselmo,
    },
    {
      name: 'Mario Arroyo',
      description: 'Tengo 28 años, me gusta mucho la programación y mi pasatiempo son los jueguitos.',
      image: MarioArroyo,
    },
  ];

  return (
    <section className="aboutUs-section">
      <h2 className="title">¿Quiénes somos?</h2>
      <p className="aboutUs-text">
  En La Cervecería, la pasión por la cerveza artesanal y la programación nos unió. Desde nuestros inicios, nos propusimos crear un espacio donde se mezclen el buen sabor de nuestras cervezas con la creatividad y tecnología. Con cada sorbo, buscamos brindar la mejor experiencia, no solo a nuestros clientes, sino también en el desarrollo de soluciones digitales que acompañen nuestro crecimiento.
</p>
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
