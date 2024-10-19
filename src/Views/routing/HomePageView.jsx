
import HeroSection from '../../components/HeroSection/HeroSection';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactForm from '../../components/Contact/ContactForm';
import CategoriesMenu from '../../components/CategoriesMenu/CategoriesMenu';


const HomePage = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <CategoriesMenu />
      <ContactForm />
      <AboutUs />
    </div>
  );
};

export default HomePage;
