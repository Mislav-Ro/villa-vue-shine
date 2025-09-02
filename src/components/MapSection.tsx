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
            Situated in beautiful Croatia, our villa offers easy access to pristine beaches, 
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2649.225208017255!2d15.96955897569116!3d43.49868666241141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133517cbecd84377%3A0xc187617897e15b21!2sVilla%20Esquel!5e1!3m2!1sen!2shr!4v1756727389108!5m2!1sen!2shr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Villa Esquel Location"
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
                    <p className="font-medium">Stivasnica Beach</p>
                    <p className="text-sm text-muted-foreground">2 min walk</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Split Old Town</p>
                    <p className="text-sm text-muted-foreground">25 min drive</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <Car className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Makarska</p>
                    <p className="text-sm text-muted-foreground">15 min drive</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-villa-sand rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-villa-ocean" />
                  </div>
                  <div>
                    <p className="font-medium">Split Airport</p>
                    <p className="text-sm text-muted-foreground">35 min drive</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-villa-ocean">Villa Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium mb-2">Villa Esquel</p>
                <p className="text-muted-foreground text-sm">
                  Uvala Stivasnica 100e<br />
                  Croatia
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