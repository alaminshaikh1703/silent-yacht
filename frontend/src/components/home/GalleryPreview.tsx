import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPreview() {
  const images = [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522771731470-ea457f134293?auto=format&fit=crop&q=80&w=800",
    "https://silent69yacht.com/wp-content/uploads/2026/04/102.4-scaled.webp",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Glimpses of The Sundarbans</h2>
            <p className="text-muted-foreground text-lg">
              Explore our curated gallery showcasing the stunning wildlife, luxurious cabins, and unforgettable moments.
            </p>
          </div>
          <Button variant="outline" className="gap-2 rounded-full hidden md:flex">
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 || index === 3 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt="Gallery preview" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2 rounded-full w-full">
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
