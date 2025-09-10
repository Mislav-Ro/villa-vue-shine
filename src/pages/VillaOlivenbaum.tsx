import Header from "@/components/Header";
import VillaOlivenbaumHero from "@/components/VillaOlivenbaumHero";
import Gallery from "@/components/Gallery";
import VillaOlivenbaumAmenities from "@/components/VillaOlivenbaumAmenities";
import VillaOlivenbaumMap from "@/components/VillaOlivenbaumMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const VillaOlivenbaum = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section id="home">
          <VillaOlivenbaumHero />
        </section>
        
        <section id="gallery">
          <Gallery />
        </section>
        
        <section id="amenities">
          <VillaOlivenbaumAmenities />
        </section>
        
        <section id="contact">
          <ContactForm />
        </section>
        
        <section id="location">
          <VillaOlivenbaumMap />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VillaOlivenbaum;