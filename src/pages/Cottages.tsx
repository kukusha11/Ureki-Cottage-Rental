import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import cottage1 from "@/assets/cottage-1.jpg";
import cottageInterior from "@/assets/cottage-interior.jpg";

const cottagesData = [
  {
    id: 1,
    name: "Cottage 1 - Sunrise",
    capacity: 4,
    bedrooms: 2,
    description: "Cozy cottage perfect for families, featuring a spacious living area and private patio.",
    amenities: ["Kitchen", "Bathroom", "Air Conditioning", "Wi-Fi", "Patio"],
    image: cottage1,
  },
  {
    id: 2,
    name: "Cottage 2 - Sunshine",
    capacity: 6,
    bedrooms: 3,
    description: "Our largest cottage, ideal for bigger groups or extended families.",
    amenities: ["Kitchen", "2 Bathrooms", "Air Conditioning", "Wi-Fi", "Garden View"],
    image: cottageInterior,
  },
  {
    id: 3,
    name: "Cottage 3 - Seabreeze",
    capacity: 4,
    bedrooms: 2,
    description: "Charming cottage with ocean views and a relaxing atmosphere.",
    amenities: ["Kitchen", "Bathroom", "Air Conditioning", "Wi-Fi", "Balcony"],
    image: cottage1,
  },
  {
    id: 4,
    name: "Cottage 4 - Sandcastle",
    capacity: 2,
    bedrooms: 1,
    description: "Perfect for couples seeking a romantic beach getaway.",
    amenities: ["Kitchenette", "Bathroom", "Air Conditioning", "Wi-Fi"],
    image: cottageInterior,
  },
  {
    id: 5,
    name: "Cottage 5 - Wavecrest",
    capacity: 4,
    bedrooms: 2,
    description: "Modern cottage with all the comforts of home near the beach.",
    amenities: ["Kitchen", "Bathroom", "Air Conditioning", "Wi-Fi", "Patio"],
    image: cottage1,
  },
  {
    id: 6,
    name: "Cottage 6 - Starfish",
    capacity: 4,
    bedrooms: 2,
    description: "Family-friendly cottage with a cozy interior and outdoor space.",
    amenities: ["Kitchen", "Bathroom", "Air Conditioning", "Wi-Fi", "Garden"],
    image: cottageInterior,
  },
  {
    id: 7,
    name: "Cottage 7 - Beachcomber",
    capacity: 5,
    bedrooms: 2,
    description: "Spacious cottage great for families or small groups.",
    amenities: ["Kitchen", "Bathroom", "Air Conditioning", "Wi-Fi", "Terrace"],
    image: cottage1,
  },
];

const Cottages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <section className="py-16 bg-sand/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Cottages</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our 7 charming cottages, each designed to provide comfort 
                and relaxation during your summer stay
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cottagesData.map((cottage) => (
                <Card key={cottage.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={cottage.image} 
                    alt={cottage.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{cottage.name}</span>
                      <Home className="text-primary" size={20} />
                    </CardTitle>
                    <CardDescription>{cottage.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Up to {cottage.capacity}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Bed size={14} />
                        <span>{cottage.bedrooms} Bedroom{cottage.bedrooms > 1 ? 's' : ''}</span>
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold mb-2 text-sm">Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {cottage.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cottages;
