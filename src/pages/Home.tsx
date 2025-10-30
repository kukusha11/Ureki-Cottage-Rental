import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home as HomeIcon, MapPin, Calendar, Image } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/home-hero.jpg";
import welcomeImage from "@/assets/home-welcome.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src={welcomeImage} 
          alt="Ureki Beach" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/30" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            {t("home.hero.subtitle")}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {t("home.hero.cta")}
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
                <h3 className="font-bold text-xl mb-2">{t("home.info.cottages.title")}</h3>
                <p className="text-muted-foreground">
                  {t("home.info.cottages.desc")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-xl mb-2">{t("home.info.season.title")}</h3>
                <p className="text-muted-foreground">
                  {t("home.info.season.desc")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">{t("home.info.location.title")}</h3>
                <p className="text-muted-foreground">
                  {t("home.info.location.desc")}
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
              <h2 className="text-4xl font-bold mb-6">{t("home.about.title")}</h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t("home.about.p1")}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t("home.about.p2")}
              </p>
              <Link to="/cottages">
                <Button size="lg">{t("home.about.cta")}</Button>
              </Link>
            </div>
            <div>
              <img 
                src={heroImage} 
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
            {t("home.cta.title")}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t("home.cta.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                {t("home.cta.book")}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 hover:bg-primary-foreground/10">
                {t("home.cta.contact")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-sand/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("home.reviews.title")}</h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-5xl font-bold text-primary">9.9</div>
              <div className="flex flex-col items-start">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-primary" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{t("home.reviews.rating")}</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{t("home.reviews.testimonial1.text")}"</p>
                <div className="font-semibold">{t("home.reviews.testimonial1.author")}</div>
                <div className="text-sm text-muted-foreground">{t("home.reviews.testimonial1.location")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{t("home.reviews.testimonial2.text")}"</p>
                <div className="font-semibold">{t("home.reviews.testimonial2.author")}</div>
                <div className="text-sm text-muted-foreground">{t("home.reviews.testimonial2.location")}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{t("home.reviews.testimonial3.text")}"</p>
                <div className="font-semibold">{t("home.reviews.testimonial3.author")}</div>
                <div className="text-sm text-muted-foreground">{t("home.reviews.testimonial3.location")}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
