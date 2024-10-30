
import HeroSection from '../../components/HeroSection/HeroSection';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactForm from '../../components/Contact/ContactForm';
import CategoriesMenu from '../../components/CategoriesMenu/CategoriesMenu';


const HomePage = () => {
  return (
    <div className="homepage">
      <div id='inicio'>
      <HeroSection />
      </div>
      <CategoriesMenu />
      <div id='Contact'>
      <ContactForm />
      </div>
      <div id='AboutUs'>
      <AboutUs />
      </div>
    </div>
  );
};

export default HomePage;
