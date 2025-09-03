import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Villa Info */}
          <div>
            <h3 className="text-2xl font-bold text-villa-gold mb-4">Villa Esquel</h3>
            <p className="text-background/80 mb-6">
              Your luxurious Mediterranean escape with breathtaking ocean views and world-class amenities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-villa-ocean rounded-full flex items-center justify-center hover:bg-villa-ocean-light transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-villa-ocean rounded-full flex items-center justify-center hover:bg-villa-ocean-light transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-villa-ocean rounded-full flex items-center justify-center hover:bg-villa-ocean-light transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-villa-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#gallery" className="text-background/80 hover:text-villa-gold transition-colors">Gallery</a></li>
              <li><a href="#availability" className="text-background/80 hover:text-villa-gold transition-colors">Availability</a></li>
              <li><a href="#amenities" className="text-background/80 hover:text-villa-gold transition-colors">Amenities</a></li>
              <li><a href="#location" className="text-background/80 hover:text-villa-gold transition-colors">Location</a></li>
              <li><a href="#contact" className="text-background/80 hover:text-villa-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-villa-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-villa-ocean" />
                <span className="text-background/80">+385 91 4177 971</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-villa-ocean" />
                <span className="text-background/80">mislavrogulj@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-villa-ocean mt-0.5" />
                <span className="text-background/80">
                  Uvala Stivasnica, 100e<br />
                  Croatia
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-villa-gold">Stay Updated</h4>
            <p className="text-background/80 mb-4 text-sm">
              Subscribe to receive special offers and updates about Villa Esquel.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-background/10 border border-background/20 rounded-md text-background placeholder-background/60 focus:outline-none focus:border-villa-ocean"
              />
              <button className="w-full bg-villa-ocean hover:bg-villa-ocean-light text-white py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Villa Esquel. All rights reserved. | 
            <a href="#" className="hover:text-villa-gold transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-villa-gold transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;