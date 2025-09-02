import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  Wifi, 
  Car, 
  Utensils, 
  Wind, 
  Tv, 
  Dumbbell, 
  Trees,
  Shield,
  Users,
  Bed,
  Bath
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Outdoor Pool",
    description: "Beautiful outdoor pool with sea views"
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Complimentary high-speed internet throughout"
  },
  {
    icon: Car,
    title: "Private Parking",
    description: "Secure parking for up to 3 vehicles"
  },
  {
    icon: Utensils,
    title: "Gourmet Kitchen",
    description: "Fully equipped with premium appliances"
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    description: "Climate control in all rooms"
  },
  {
    icon: Tv,
    title: "Entertainment",
    description: "Smart TVs and sound system"
  },
  {
    icon: Dumbbell,
    title: "Fitness Area",
    description: "Private gym with ocean views"
  },
  {
    icon: Trees,
    title: "Garden Terrace",
    description: "Landscaped gardens and outdoor dining"
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Gated community with security"
  }
];

const specs = [
  {
    icon: Users,
    title: "6 Guests",
    description: "Sleeps up to 6 guests comfortably"
  },
  {
    icon: Bed,
    title: "3 Bedrooms",
    description: "All with en-suite bathrooms"
  }
];

const Amenities = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Villa Amenities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every detail has been carefully considered to ensure your stay is nothing short of extraordinary.
          </p>
        </div>

        {/* Villa Specifications */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          {specs.map((spec, index) => (
            <Card key={index} className="shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <spec.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-villa-ocean mb-2">{spec.title}</h3>
                <p className="text-muted-foreground">{spec.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <Card key={index} className="shadow-card hover:shadow-villa transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-villa-sand rounded-lg flex items-center justify-center flex-shrink-0">
                    <amenity.icon className="w-6 h-6 text-villa-ocean" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{amenity.title}</h3>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto shadow-villa">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready for Your Perfect Getaway?
              </h3>
              <p className="text-muted-foreground mb-6">
                Experience luxury, comfort, and breathtaking views at Villa Esquel. 
                Your Croatian escape awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#availability" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-villa-ocean hover:bg-villa-ocean-light text-white rounded-md font-medium transition-colors shadow-villa"
                >
                  Check Availability
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-villa-ocean text-villa-ocean hover:bg-villa-ocean hover:text-white rounded-md font-medium transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Amenities;