import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import villaExterior from "@/assets/villa-esquel/villa-exterior.jpg";
import villaBedroom from "@/assets/villa-esquel/villa-bedroom.jpg";
import villaKitchen from "@/assets/villa-esquel/villa-kitchen.jpg";
import heroImage from "@/assets/villa-esquel/villa-hero.jpg";

const images = [
  { src: heroImage, alt: "Villa with infinity pool and ocean view" },
  { src: villaExterior, alt: "Modern villa exterior" },
  { src: villaBedroom, alt: "Luxurious bedroom with ocean view" },
  { src: villaKitchen, alt: "Modern kitchen with marble countertops" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-20 bg-gradient-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Villa Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the breathtaking spaces and stunning views that make our villa 
            the perfect Mediterranean escape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card 
                  className="overflow-hidden cursor-pointer group shadow-card hover:shadow-villa transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedImage(index)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                <div className="relative">
                  <img
                    src={selectedImage !== null ? images[selectedImage].src : image.src}
                    alt={selectedImage !== null ? images[selectedImage].alt : image.alt}
                    className="w-full h-auto rounded-lg"
                  />
                  
                  {/* Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImage !== null ? selectedImage + 1 : index + 1} / {images.length}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;