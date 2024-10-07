
import './AboutUs.css'; 


import NahuelAnselmo from '../../assets/ImgIntegrantes/NahuelAnselmo.jpeg'
import MarioArroyo from '../../assets/ImgIntegrantes/MarioArroyo.jpg'



const AboutUs = () => {
  const members = [
    {
      name: 'Tobias Zarlenga',
      description: 'Tengo 19 años, soy un entusiasta del deporte y la tecnología',
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
  ];

  return (
    <section className="aboutUs-section">
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
