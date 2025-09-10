import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Villa Esquel", href: "/villa-esquel" },
    { name: "Villa Olivenbaum", href: "/villa-olivenbaum" },
    { name: "Alida Valli Apartment", href: "/alida-valli" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-villa-ocean transition-colors font-medium ${
                  location.pathname === item.href ? "text-villa-ocean" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+385 91 4177 971</span>
              </div>
              <a 
                href="mailto:mislavrogulj@gmail.com" 
                className="flex items-center gap-2 hover:text-villa-ocean transition-colors"
              >
                <Mail className="w-4 h-4" />
                mislavrogulj@gmail.com
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-foreground hover:text-villa-ocean hover:bg-villa-cream rounded-md transition-colors ${
                    location.pathname === item.href ? "text-villa-ocean bg-villa-cream" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>+385 91 4177 971</span>
                  </div>
                  <a 
                    href="mailto:mislavrogulj@gmail.com" 
                    className="flex items-center gap-2 hover:text-villa-ocean transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    mislavrogulj@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;