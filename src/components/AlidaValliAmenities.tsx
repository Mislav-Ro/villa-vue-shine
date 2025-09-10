import { Card, CardContent } from "@/components/ui/card";
import { Users, Bed, Wifi, Car, Utensils, Wind, Waves, Shield } from "lucide-react";

const amenities = [
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Outdoor Pool",
    description: "Dive into crystal clear waters with stunning sea views"
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "High-Speed WiFi",
    description: "Stay connected with complimentary fiber internet"
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Gourmet Kitchen",
    description: "Fully equipped kitchen with premium appliances"
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "Private Parking",
    description: "Secure parking space for your convenience"
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Air Conditioning",
    description: "Climate controlled comfort throughout your stay"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "24/7 Security",
    description: "Round-the-clock security for your peace of mind"
  }
];

const specs = [
  { label: "Guests", value: "5", icon: <Users className="w-5 h-5" /> },
  { label: "Bedrooms", value: "2", icon: <Bed className="w-5 h-5" /> },
];

const AlidaValliAmenities = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Apartment Specifications & Amenities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every detail has been carefully considered to provide you with the ultimate 
            comfort experience in Croatia.
          </p>
        </div>

        {/* Apartment Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {specs.map((spec, index) => (
            <Card key={index} className="text-center border-villa-sand bg-villa-cream/50">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4 text-villa-ocean">
                  {spec.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{spec.value}</div>
                <div className="text-muted-foreground font-medium">{spec.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <Card key={index} className="group hover:shadow-villa transition-all duration-300 border-villa-sand bg-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-villa-ocean/10 rounded-lg flex items-center justify-center text-villa-ocean group-hover:bg-villa-ocean group-hover:text-white transition-colors">
                    {amenity.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {amenity.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlidaValliAmenities;