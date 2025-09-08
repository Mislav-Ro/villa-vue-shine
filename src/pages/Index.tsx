import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import MapSection from "@/components/MapSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="gallery">
          <Gallery />
        </section>
        
        <section id="amenities">
          <Amenities />
        </section>
        
        <section id="availability">
          <AvailabilityCalendar />
        </section>
        
        <section id="contact">
          <ContactForm />
        </section>
        
        <section id="location">
          <MapSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
