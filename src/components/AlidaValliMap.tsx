import { Card, CardContent } from "@/components/ui/card";
import { Car, MapPin, Plane, Waves } from "lucide-react";

const attractions = [
  { name: "Stivasnica Beach", time: "5 min walk", icon: <Waves className="w-5 h-5" /> },
  { name: "Split Old Town", time: "60 min drive", icon: <Car className="w-5 h-5" /> },
  { name: "Primošten", time: "45 min drive", icon: <Car className="w-5 h-5" /> },
  { name: "Split Airport", time: "20 min drive", icon: <Plane className="w-5 h-5" /> },
];

const AlidaValliMap = () => {
  return (
    <section className="py-20 bg-gradient-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Perfect Location
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ideally situated to explore the best of Croatia while enjoying peaceful tranquility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden shadow-villa">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.7525378185387!2d16.349236175694244!3d43.55501345877649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355d00052c42b5%3A0x1e5c4989059ae2e1!2sAlida%20Valli%20Apartment!5e1!3m2!1shr!2shr!4v1757544059195!5m2!1shr!2shr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Alida Valli Apartment Location"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nearby Attractions */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-foreground mb-6">Nearby Attractions</h3>
            <div className="space-y-4">
              {attractions.map((attraction, index) => (
                <Card key={index} className="hover:shadow-card transition-shadow border-villa-sand">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-villa-ocean">
                        {attraction.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{attraction.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{attraction.time}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Address */}
            <Card className="mt-8 border-villa-ocean/20 bg-villa-cream/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-villa-ocean mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Apartment Address</h4>
                    <p className="text-muted-foreground">
                      Iločka ul. 14, 21217, Kaštel Stari, Croatia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlidaValliMap;