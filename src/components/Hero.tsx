import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useCurrentProperty, getPropertyImages } from "@/utils/propertyUtils";

const Hero = () => {
  const [heroImage, setHeroImage] = useState<string>('');
  const currentProperty = useCurrentProperty();

  const getPropertyTitle = () => {
    switch (currentProperty) {
      case 'villa-olivenbaum':
        return { main: 'Villa', highlight: 'Olivenbaum' };
      case 'alida-valli':
        return { main: 'Alida Valli', highlight: 'Apartment' };
      default:
        return { main: 'Villa', highlight: 'Esquel' };
    }
  };

  const getPropertyDescription = () => {
    switch (currentProperty) {
      case 'villa-olivenbaum':
        return 'Experience luxury in our beautiful Croatian villa with stunning views, private pool, and exceptional amenities.';
      case 'alida-valli':
        return 'Enjoy comfort and style in our modern Croatian apartment with beautiful views and premium amenities.';
      default:
        return 'Escape to paradise in our stunning Croatian villa with breathtaking sea views, outdoor pool, and world-class amenities.';
    }
  };

  const getPropertyLocation = () => {
    switch (currentProperty) {
      case 'villa-olivenbaum':
        return 'Crvena zemlja 43, Kaštel Štafilić, Croatia';
      case 'alida-valli':
        return 'Iločka ul. 14, 21217, Kaštel Stari, Croatia';
      default:
        return 'Uvala Stivasnica, Croatia';
    }
  };

  useEffect(() => {
    const loadHeroImage = async () => {
      try {
        const images = await getPropertyImages(currentProperty);
        if (images['villa-hero']) {
          setHeroImage(images['villa-hero']);
        }
      } catch (error) {
        console.error('Error loading hero image:', error);
      }
    };

    loadHeroImage();
  }, [currentProperty]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-villa-gold text-villa-gold" />
          ))}
          <span className="ml-2 text-sm font-medium">Luxury Experience</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {getPropertyTitle().main}
          <span className="block text-villa-gold">{getPropertyTitle().highlight}</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          {getPropertyDescription()}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{getPropertyLocation()}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-villa-ocean hover:bg-villa-ocean-light text-white shadow-villa text-lg px-8 py-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Check Availability
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-foreground hover:bg-white/10 hover:text-muted-foreground backdrop-blur-sm text-lg px-8 py-3"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Gallery
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;