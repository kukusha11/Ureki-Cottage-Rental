import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Home, Wifi, Wind, Utensils, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cottageBedroom1 from "@/assets/cottage-bedroom-1.jpg";
import cottageKitchen from "@/assets/cottage-kitchen.jpg";
import cottageBathroom from "@/assets/cottage-bathroom.jpg";
import cottageBedroom2 from "@/assets/cottage-bedroom-2.jpg";
import cottageBedroom3 from "@/assets/cottage-bedroom-3.jpg";
import cottagesExterior from "@/assets/cottages-exterior.jpg";

const Cottages = () => {
  const amenities = [
    { icon: Bed, label: "Comfortable Beds", description: "Quality bedding for restful sleep" },
    { icon: Utensils, label: "Full Kitchen", description: "Equipped with all essentials" },
    { icon: Droplets, label: "Private Bathroom", description: "Clean and modern facilities" },
    { icon: Wind, label: "Air Conditioning", description: "Stay cool during summer" },
    { icon: Wifi, label: "Wi-Fi Access", description: "Stay connected" },
    { icon: Home, label: "Living Space", description: "Cozy common areas" },
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Cottages</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We offer 7 identical, comfortable cottages perfect for your summer stay
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
                    <span>Summer Cottage</span>
                    <Home className="text-primary" size={28} />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Each of our 7 cottages offers the same high-quality experience with identical amenities and comfort
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex gap-4 mb-6">
                    <Badge variant="secondary" className="flex items-center gap-1 text-base py-2 px-4">
                      <Users size={18} />
                      <span>Up to 4 guests</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-base py-2 px-4">
                      <Bed size={18} />
                      <span>2 Bedrooms</span>
                    </Badge>
                  </div>

                  <div className="mb-8">
                    <p className="text-muted-foreground mb-6">
                      Each cottage is designed for comfort and relaxation, providing everything you need for a perfect 
                      summer vacation. All cottages are well-maintained and offer the same amenities, ensuring every 
                      guest enjoys the same wonderful experience. Features include wood-paneled interiors, comfortable 
                      bedding, a fully equipped kitchen, and a modern bathroom with shower.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-4">Amenities & Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-sand/20">
                            <Icon className="text-primary mt-1 flex-shrink-0" size={24} />
                            <div>
                              <p className="font-semibold">{amenity.label}</p>
                              <p className="text-sm text-muted-foreground">{amenity.description}</p>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
              <p className="text-xl mb-6 opacity-90">
                All 7 cottages offer the same great experience. Contact us to check availability!
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cottages;
