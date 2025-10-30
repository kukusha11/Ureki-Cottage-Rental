import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home as HomeIcon, MapPin, Calendar, Image } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/home-hero.jpg";
import welcomeImage from "@/assets/home-welcome.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Ureki Beach" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/30" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Your Summer Home by the Black Sand
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Cozy cottages steps away from Ureki's magnetic beaches
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Book Your Stay
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-sand/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <HomeIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">7 Cozy Cottages</h3>
                <p className="text-muted-foreground">
                  Perfect for families, couples, and groups
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-xl mb-2">Summer Season</h3>
                <p className="text-muted-foreground">
                  Available June through August
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">Prime Location</h3>
                <p className="text-muted-foreground">
                  Steps away from the black sand beach
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Welcome to Ureki Beach</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Our family-run business offers 7 charming cottages in the heart of Ureki, 
                Georgia's famous magnetic black sand beach resort. Each cottage is designed 
                for comfort and relaxation, making your summer vacation unforgettable.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Whether you're seeking a peaceful retreat or a fun-filled family vacation, 
                our cottages provide the perfect home base for exploring the unique beauty 
                of Ureki's healing black sand beaches.
              </p>
              <Link to="/cottages">
                <Button size="lg">Explore Our Cottages</Button>
              </Link>
            </div>
            <div>
              <img 
                src={welcomeImage} 
                alt="Cottage exterior" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Ureki?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Check our availability and book your perfect summer getaway today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/availability">
              <Button size="lg" variant="secondary">
                Check Availability
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
