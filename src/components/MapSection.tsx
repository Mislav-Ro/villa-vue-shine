import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Car, Plane, Utensils } from "lucide-react";

const MapSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Perfect Location
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Situated in the heart of Costa del Sol, our villa offers easy access to beaches, 
            restaurants, and cultural attractions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="shadow-villa overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gradient-ocean rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.2861346647443!2d-4.8856659247315065!3d36.51544997251969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72d7fdb909e359%3A0x2a446965d0f7fc6a!2sMarbella%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Villa Serenity Location"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nearby Attractions */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-villa-ocean">Nearby Attractions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Playa de la Fontanilla</p>
                    <p className="text-sm text-muted-foreground">2 min walk</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Marbella Old Town</p>
                    <p className="text-sm text-muted-foreground">5 min drive</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <Car className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Puerto Banús</p>
                    <p className="text-sm text-muted-foreground">10 min drive</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Málaga Airport</p>
                    <p className="text-sm text-muted-foreground">45 min drive</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-villa-ocean">Villa Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium mb-2">Villa Serenity</p>
                <p className="text-muted-foreground text-sm">
                  Calle del Mar, 123<br />
                  29602 Marbella<br />
                  Málaga, Spain
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;