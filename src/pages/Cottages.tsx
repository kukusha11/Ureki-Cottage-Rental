import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Home, Wifi, Wind, Utensils, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import cottageBedroom1 from "@/assets/cottage-bedroom-1.jpg";
import cottageKitchen from "@/assets/cottage-kitchen.jpg";
import cottageBathroom from "@/assets/cottage-bathroom.jpg";
import cottageBedroom2 from "@/assets/cottage-bedroom-2.jpg";
import cottageBedroom3 from "@/assets/cottage-bedroom-3.jpg";
import cottagesExterior from "@/assets/cottages-exterior.jpg";

const Cottages = () => {
  const { t } = useLanguage();
  
  const amenities = [
    { icon: Bed, labelKey: "cottages.amenity.beds", descKey: "cottages.amenity.beds.desc" },
    { icon: Utensils, labelKey: "cottages.amenity.kitchen", descKey: "cottages.amenity.kitchen.desc" },
    { icon: Droplets, labelKey: "cottages.amenity.bathroom", descKey: "cottages.amenity.bathroom.desc" },
    { icon: Wind, labelKey: "cottages.amenity.ac", descKey: "cottages.amenity.ac.desc" },
    { icon: Wifi, labelKey: "cottages.amenity.wifi", descKey: "cottages.amenity.wifi.desc" },
    { icon: Home, labelKey: "cottages.amenity.living", descKey: "cottages.amenity.living.desc" },
  ];

  const cottagePhotos = [
    { src: cottagesExterior, alt: "Cottage exteriors in a row" },
    { src: cottageBedroom1, alt: "Bedroom with two beds" },
    { src: cottageBedroom2, alt: "Spacious bedroom area" },
    { src: cottageBedroom3, alt: "Comfortable sleeping area" },
    { src: cottageKitchen, alt: "Fully equipped kitchen" },
    { src: cottageBathroom, alt: "Modern bathroom with shower" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <section className="py-16 bg-sand/20">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("cottages.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("cottages.subtitle")}
            </p>
          </div>

            {/* Photo Gallery */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cottagePhotos.map((photo, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-lg shadow-md ${
                      index === 0 ? "md:col-span-2 lg:col-span-3" : ""
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={`w-full object-cover ${
                        index === 0 ? "h-[400px]" : "h-[300px]"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center justify-between text-2xl">
                    <span>{t("cottages.card.title")}</span>
                    <Home className="text-primary" size={28} />
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t("cottages.card.desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex gap-4 mb-6">
                    <Badge variant="secondary" className="flex items-center gap-1 text-base py-2 px-4">
                      <Users size={18} />
                      <span>{t("cottages.guests")}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-base py-2 px-4">
                      <Bed size={18} />
                      <span>{t("cottages.bedrooms")}</span>
                    </Badge>
                  </div>

                  <div className="mb-8">
                    <p className="text-muted-foreground mb-6">
                      {t("cottages.description")}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-4">{t("cottages.amenities.title")}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-sand/20">
                            <Icon className="text-primary mt-1 flex-shrink-0" size={24} />
                            <div>
                              <p className="font-semibold">{t(amenity.labelKey)}</p>
                              <p className="text-sm text-muted-foreground">{t(amenity.descKey)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center bg-primary text-primary-foreground rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4">{t("cottages.cta.title")}</h2>
              <p className="text-xl mb-6 opacity-90">
                {t("cottages.cta.subtitle")}
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cottages;
