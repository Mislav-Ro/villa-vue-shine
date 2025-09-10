import Header from "@/components/Header";
import AlidaValliHero from "@/components/AlidaValliHero";
import Gallery from "@/components/Gallery";
import AlidaValliAmenities from "@/components/AlidaValliAmenities";
import AlidaValliMap from "@/components/AlidaValliMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const AlidaValli = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section id="home">
          <AlidaValliHero />
        </section>
        
        <section id="gallery">
          <Gallery />
        </section>
        
        <section id="amenities">
          <AlidaValliAmenities />
        </section>
        
        <section id="contact">
          <ContactForm />
        </section>
        
        <section id="location">
          <AlidaValliMap />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlidaValli;