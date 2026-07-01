import Image from "next/image";
import { MapPin } from "lucide-react";
import FinalCTA from "@/components/home/FinalCTA";

async function getDestinations() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/destinations`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  const defaultDestinations = [
    {
      name: "Karamjal Wildlife Rescue Center",
      slug: "karamjal",
      description: "One of the most accessible parts of the Sundarbans, featuring a crocodile breeding center, deer, and a wooden trail through the dense mangroves.",
      media: { large: "https://images.unsplash.com/photo-1614088517812-70b15a6b0933?auto=format&fit=crop&q=80&w=800", alt_text: "Karamjal" }
    },
    {
      name: "Kotka Beach & Wildlife Sanctuary",
      slug: "kotka",
      description: "A pristine location where the forest meets the Bay of Bengal. Famous for tiger sightings, herds of deer, and breathtaking sunsets.",
      media: { large: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", alt_text: "Kotka" }
    },
    {
      name: "Hiron Point",
      slug: "hiron-point",
      description: "Also known as Nilkamal, this UNESCO World Heritage Site offers stunning boardwalks and an observation tower for panoramic views of the forest.",
      media: { large: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800", alt_text: "Hiron Point" }
    }
  ];

  const displayDestinations = destinations.length > 0 ? destinations : defaultDestinations;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Destinations</h1>
          <p className="text-xl text-white/80">
            Explore the majestic beauty of the Sundarbans. We take you deep into the heart of the world's largest mangrove forest.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDestinations.map((dest: any, idx: number) => {
              const imgSrc = dest.media?.large?.startsWith('http') 
                ? dest.media.large 
                : `http://127.0.0.1:8000${dest.media?.large || '/placeholder.webp'}`;

              return (
              <div key={dest.slug || idx} className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={imgSrc} 
                    alt={dest.media?.alt_text || dest.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={process.env.NODE_ENV === 'development'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center text-white gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed mb-4 flex-1">
                    {dest.description}
                  </p>
                  <button className="text-accent font-semibold self-start hover:text-accent/80 transition-colors">
                    Explore Tours to {dest.name} &rarr;
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
