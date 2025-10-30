import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16 print:mt-8">
      <div className="container mx-auto px-4 py-12 print:py-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Ureki Beach</h3>
            <p className="text-sm opacity-90">
              Your summer home by the magnetic black sand beaches of Ureki, Georgia.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <a href="tel:+995XXXXXXXXX" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone size={16} />
                <span>+995 XXX XXX XXX</span>
              </a>
              <a href="mailto:info@urekibeach.ge" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail size={16} />
                <span>info@urekibeach.ge</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <a
              href="https://instagram.com/urekibeach"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity print:hidden"
            >
              <Instagram size={20} />
              <span>@urekibeach</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Ureki Beach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
