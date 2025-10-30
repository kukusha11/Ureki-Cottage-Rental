import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import { Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  const { t } = useLanguage();
  
  const galleryImages = [
    { src: gallery1, alt: "Beachside terrace with ocean view", category: "Facilities" },
    { src: gallery2, alt: "Ureki Beach welcome sign", category: "Property" },
    { src: gallery3, alt: "Property grounds with cottages", category: "Cottages" },
    { src: gallery4, alt: "Beach view from property", category: "Beach" },
    { src: gallery5, alt: "Hammocks and relaxation area", category: "Facilities" },
    { src: gallery6, alt: "Garden decorations", category: "Property" },
    { src: gallery7, alt: "Property entrance and parking", category: "Property" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("gallery.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("gallery.subtitle")}
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
              <h2 className="text-2xl font-bold mb-4">{t("gallery.instagram.title")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("gallery.instagram.desc")}
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
