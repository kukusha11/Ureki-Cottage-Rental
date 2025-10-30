import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import cottage1 from "@/assets/cottage-1.jpg";
import cottageInterior from "@/assets/cottage-interior.jpg";
import beachScene from "@/assets/beach-scene.jpg";
import heroImage from "@/assets/hero-beach.jpg";
import { Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  const galleryImages = [
    { src: heroImage, alt: "Ureki Beach coastline", category: "Beach" },
    { src: cottage1, alt: "Cottage exterior", category: "Cottages" },
    { src: cottageInterior, alt: "Cottage interior bedroom", category: "Interiors" },
    { src: beachScene, alt: "Black sand beach", category: "Beach" },
    { src: cottage1, alt: "Another cottage view", category: "Cottages" },
    { src: cottageInterior, alt: "Living area", category: "Interiors" },
    { src: beachScene, alt: "Beach umbrellas", category: "Beach" },
    { src: heroImage, alt: "Sunset at Ureki", category: "Beach" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take a visual tour of our cottages and the beautiful Ureki beach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow aspect-[4/3]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-semibold">{image.alt}</p>
                      <p className="text-sm opacity-90">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center bg-sand/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">See More on Instagram</h2>
              <p className="text-muted-foreground mb-6">
                Follow us for daily updates, guest photos, and beach life moments
              </p>
              <a
                href="https://instagram.com/urekibeach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-lg"
              >
                @urekibeach
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
