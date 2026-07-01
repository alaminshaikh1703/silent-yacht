import { Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${baseUrl}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    return null;
  }
}

export default async function CabinCategories({ cabinsData }: { cabinsData?: any[] }) {
  const staticCabins = [
    {
      id: "luxury",
      name: "Luxury Cabin",
      description: "Experience ultimate comfort with premium amenities, a private attached bath, and panoramic river views.",
      facilities: ["Attached Bath", "Air Conditioned", "Queen Size Bed", "Large Window", "Room Service"],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "couple",
      name: "Couple Cabin",
      description: "Cozy and intimate space designed perfectly for couples looking for a romantic getaway in the wild.",
      facilities: ["Air Conditioned", "Double Bed", "Shared Bath", "Viewing Window", "Storage Space"],
      image: "https://images.unsplash.com/photo-1522771731470-ea457f134293?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "family",
      name: "Family Cabin",
      description: "Spacious cabins offering multiple beds to comfortably accommodate small families or friend groups.",
      facilities: ["Air Conditioned", "Bunk Beds", "Shared Bath", "Family Space", "Ample Storage"],
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    }
  ];

  const displayCabins = cabinsData && cabinsData.length > 0 ? cabinsData.map(c => ({
    id: c.id,
    name: c.name,
    description: c.description || staticCabins[0].description,
    facilities: c.facilities ? (typeof c.facilities === 'string' ? JSON.parse(c.facilities) : c.facilities) : staticCabins[0].facilities,
    image: c.featured_image?.medium?.startsWith('http') 
        ? c.featured_image.medium 
        : c.featured_image?.medium 
            ? `http://127.0.0.1:8000${c.featured_image.medium}` 
            : staticCabins[0].image,
  })) : staticCabins;

  const settings = await getSettings();
  const rawNumber = settings?.whatsapp_number || "+8801711448773";
  const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Our Premium Cabins</h2>
          <p className="text-muted-foreground text-lg">
            Choose from 16 fully air-conditioned cabins designed to provide maximum comfort during your river cruise.
          </p>
        </div>

        <div className="space-y-16">
          {displayCabins.map((cabin, index) => (
            <div 
              key={cabin.id} 
              className={`flex flex-col gap-8 md:gap-12 lg:items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                <Image 
                  src={cabin.image} 
                  alt={cabin.name} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-primary">{cabin.name}</h3>
                <div className="text-muted-foreground text-lg leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: cabin.description }}></div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-border">
                  {cabin.facilities.map((facility: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-gradient-to-r from-[#ff5400] to-[#ffaa00] hover:from-[#e54b00] hover:to-[#e69900] text-white gap-2 rounded-full font-bold border-0 shadow-md shadow-[#ff5400]/20 transition-all px-8">
                      <Phone className="w-4 h-4" />
                      Inquire About Availability
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
